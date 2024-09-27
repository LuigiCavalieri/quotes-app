import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
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

@Component({
	selector: "app-quotes-list",
	templateUrl: "./quotes-list.component.html",
	styleUrl: "./quotes-list.component.scss",
})
export class QuotesListComponent implements OnInit, OnDestroy {
	quotes: Quote[] = [];
	showSearchField = false;

	readonly destroySbj$ = new Subject();
	readonly isLoading$ = this.store.select(selectIsLoadingQuotes);
	readonly isError$ = this.store.select(selectIsFetchError);
	readonly pagination$ = this.store.select(selectPagination);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
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

	ngOnDestroy(): void {
		this.destroySbj$.next(true);
		this.destroySbj$.complete();
	}

	handleClickPagination(page: number) {
		this.store.dispatch(loadQuotes({ page }));
	}

	handleClickRefreshPage() {
		location.reload();
	}

	getPaginatedItemIndex(index: number, currentPage?: number) {
		currentPage = currentPage || 1;

		return index + 1 + (currentPage - 1) * appConfig.quotesPerPage;
	}
}
