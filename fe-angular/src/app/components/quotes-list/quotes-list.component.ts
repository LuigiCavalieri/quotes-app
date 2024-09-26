import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Quote } from "../../types/quotes";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadQuotes } from "../../store/actions/quotes.actions";
import {
	selectDisplayedQuotes,
	selectIsLoadingQuotes,
} from "../../store/selectors/quotes.selectors";

@Component({
	selector: "app-quotes-list",
	templateUrl: "./quotes-list.component.html",
	styleUrl: "./quotes-list.component.scss",
})
export class QuotesListComponent implements OnInit {
	currentPage = 1;

	readonly quotes$ = this.store.select(selectDisplayedQuotes);
	readonly isLoading$ = this.store.select(selectIsLoadingQuotes);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(loadQuotes({ page: 1, filters: { keywords: "" } }));
	}

	handlePageChange(page: number) {
		this.currentPage = page;

		this.store.dispatch(loadQuotes({ page, filters: { keywords: "" } }));
	}
}
