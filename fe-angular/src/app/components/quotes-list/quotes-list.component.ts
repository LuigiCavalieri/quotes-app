import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import {
	asyncScheduler,
	BehaviorSubject,
	delay,
	filter,
	map,
	of,
	Subject,
	switchMap,
	takeUntil,
	tap,
	throttleTime,
} from "rxjs";
import { Quote } from "../../types/quotes";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadQuotes } from "../../store/actions/quotes.actions";
import {
	selectDisplayedQuotes,
	selectIsFetchError,
	selectIsLoadingQuotes,
	selectPagination,
} from "../../store/selectors/quotes.selectors";
import appConfig from "../../config/appConfig";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CopyStatus, EMPTY_STRING } from "../../constants";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatCardModule } from "@angular/material/card";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { QuotesListItemComponent } from "../quotes-list-item/quotes-list-item.component";
import { PaginationMenuComponent } from "../pagination-menu/pagination-menu.component";
import { MatInputModule } from "@angular/material/input";

@Component({
	standalone: true,
	selector: "app-quotes-list",
	templateUrl: "./quotes-list.component.html",
	styleUrl: "./quotes-list.component.scss",
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ErrorMessageComponent,
		QuotesListItemComponent,
		PaginationMenuComponent,
	],
})
export class QuotesListComponent implements OnInit, OnChanges, OnDestroy {
	quotes: Quote[] = [];
	showSearchField = false;
	copyQuoteId = EMPTY_STRING;

	@Input() resetSearchNeedleCounter = 0;

	readonly isLoading$ = this.store.select(selectIsLoadingQuotes);
	readonly isError$ = this.store.select(selectIsFetchError);
	readonly pagination$ = this.store.select(selectPagination);
	readonly destroySbj$ = new Subject();
	readonly isSearchingSbj$ = new BehaviorSubject(false);
	readonly copyStatusSbj$ = new BehaviorSubject(CopyStatus.waiting);
	readonly searchField = new FormControl(EMPTY_STRING, { nonNullable: true });

	constructor(
		private store: Store<AppState>,
		private clipboard: Clipboard
	) {}

	ngOnInit(): void {
		this.subscribeToStore();
		this.subscribeToSearchNeedleChanges();

		this.copyStatusSbj$
			.pipe(
				filter(value => value !== CopyStatus.waiting),
				switchMap(value => of(value).pipe(delay(appConfig.feedbackTimeout))),
				takeUntil(this.destroySbj$)
			)
			.subscribe(() => {
				this.copyStatusSbj$.next(CopyStatus.waiting);
			});
	}

	ngOnChanges(changes: SimpleChanges): void {
		const resetCounterChanges = changes["resetSearchNeedleCounter"] || {};

		if (resetCounterChanges.currentValue != resetCounterChanges.previousValue) {
			this.searchField.setValue(EMPTY_STRING, { emitEvent: false });
		}
	}

	ngOnDestroy(): void {
		this.destroySbj$.next(true);
		this.destroySbj$.complete();
	}

	private subscribeToStore() {
		this.store.dispatch(loadQuotes({ page: 1 }));
		this.store
			.select(selectDisplayedQuotes)
			.pipe(takeUntil(this.destroySbj$))
			.subscribe(quotes => {
				this.quotes = quotes;

				if (quotes.length) {
					this.showSearchField = true;
				}
			});
	}

	private subscribeToSearchNeedleChanges() {
		this.searchField.valueChanges
			.pipe(
				map(value => value.trim()),
				tap(value => {
					if (!value) {
						this.store.dispatch(loadQuotes({ page: 1 }));
					}
				}),
				filter(Boolean),
				throttleTime(2000, asyncScheduler, { leading: true, trailing: true }),
				takeUntil(this.destroySbj$)
			)
			.subscribe(searchNeedle => {
				if (!this.searchField.value.trim()) {
					return;
				}

				this.store.dispatch(
					loadQuotes({
						page: 1,
						refetch: true,
						filters: { searchNeedle },
					})
				);
			});

		this.searchField.valueChanges
			.pipe(
				map(value => Boolean(value.trim())),
				takeUntil(this.destroySbj$)
			)
			.subscribe(this.isSearchingSbj$);

		this.isSearchingSbj$
			.pipe(
				filter(Boolean),
				switchMap(value => of(value).pipe(delay(1000))),
				takeUntil(this.destroySbj$)
			)
			.subscribe(() => {
				this.isSearchingSbj$.next(false);
			});
	}

	handleClickPagination(page: number) {
		const searchNeedle = this.searchField.value.trim();
		const filters = searchNeedle ? { searchNeedle } : undefined;

		this.store.dispatch(loadQuotes({ page, filters }));
	}

	handleClickRefreshPage() {
		location.reload();
	}

	handleClickCopy(quote: Quote) {
		const author = quote.author || appConfig.authorDefaultName;
		const textToCopy = `${quote.content}\n( ${author} )`;

		this.copyQuoteId = quote.id;

		if (this.clipboard.copy(textToCopy)) {
			this.copyStatusSbj$.next(CopyStatus.copied);
		} else {
			this.copyStatusSbj$.next(CopyStatus.error);
		}
	}

	getPaginatedItemIndex(index: number, currentPage?: number) {
		currentPage = currentPage || 1;

		return index + 1 + (currentPage - 1) * appConfig.quotesPerPage;
	}
}
