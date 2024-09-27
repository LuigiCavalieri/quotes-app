import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
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
export class QuotesListComponent implements OnInit {
	readonly quotes$ = this.store.select(selectDisplayedQuotes);
	readonly isLoading$ = this.store.select(selectIsLoadingQuotes);
	readonly isError$ = this.store.select(selectIsFetchError);
	readonly pagination$ = this.store.select(selectPagination);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(loadQuotes({ page: 1 }));
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
