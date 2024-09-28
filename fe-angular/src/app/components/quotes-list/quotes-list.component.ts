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
import { Quote, QuotesPagination } from "../../types/quotes";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadQuotes, reloadQuotes } from "../../store/actions/quotes.actions";
import {
	selectDisplayedQuotes,
	selectIsFetchError,
	selectIsLoadingQuotes,
	selectPagination,
} from "../../store/selectors/quotes.selectors";
import appConfig from "../../config/appConfig";
import { FormControl } from "@angular/forms";
import { EMPTY_STRING } from "../../constants";

@Component({
	selector: "app-quotes-list",
	templateUrl: "./quotes-list.component.html",
	styleUrl: "./quotes-list.component.scss",
})
export class QuotesListComponent implements OnInit, OnChanges, OnDestroy {
	quotes: Quote[] = [];
	showSearchField = false;
	pagination: QuotesPagination = {
		currentPage: 1,
		totalCount: 0,
	};

	@Input() resetSearchNeedleCounter = 0;

	readonly isLoading$ = this.store.select(selectIsLoadingQuotes);
	readonly isError$ = this.store.select(selectIsFetchError);
	readonly destroySbj$ = new Subject();
	readonly isSearchingSbj$ = new BehaviorSubject(false);
	readonly searchField = new FormControl(EMPTY_STRING, { nonNullable: true });

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.subscribeToStore();
		this.subscribeToSearchNeedleChanges();
	}

	ngOnChanges(changes: SimpleChanges): void {
		const resetCounterChanges = changes["resetSearchNeedleCounter"] || {};

		if (resetCounterChanges.currentValue != resetCounterChanges.previousValue) {
			this.searchField.setValue(EMPTY_STRING);
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
		this.store
			.select(selectPagination({ filtered: false }))
			.pipe(takeUntil(this.destroySbj$))
			.subscribe(pagination => {
				this.pagination = pagination;
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
				this.store.dispatch(
					reloadQuotes({
						filters: { searchNeedle },
					})
				);
			});

		this.searchField.valueChanges
			.pipe(
				switchMap(value =>
					this.store.select(
						selectPagination({
							filtered: Boolean(value.trim()),
						})
					)
				),
				takeUntil(this.destroySbj$)
			)
			.subscribe(pagination => {
				this.pagination = pagination;
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

	getPaginatedItemIndex(index: number, currentPage?: number) {
		currentPage = currentPage || 1;

		return index + 1 + (currentPage - 1) * appConfig.quotesPerPage;
	}
}
