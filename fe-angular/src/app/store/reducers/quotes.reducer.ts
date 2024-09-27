import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/quotes.actions";
import { Quote } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";

export interface QuotesState {
	quotes: Record<number, Quote[]>;
	displayedQuotes: Quote[];
	isLoading: boolean;
	fetchError: string;
}

export const initialState: QuotesState = {
	quotes: {} as Record<number, Quote[]>,
	displayedQuotes: [],
	isLoading: false,
	fetchError: EMPTY_STRING,
};

export const quotesReducer = createReducer(
	initialState,
	on(Actions.loadQuotes, (state, { page }) => {
		const _page = Number(page) || 0;

		if (state.quotes[_page]) {
			return {
				...state,
				displayedQuotes: state.quotes[_page],
			};
		}

		if (_page > 0) {
			return {
				...state,
				isLoading: true,
			};
		}

		return state;
	}),
	on(Actions.fetchQuotesSuccess, (state, { newQuotes, page }) => {
		const quotes = {
			...state.quotes,
			[page]: newQuotes,
		};

		return {
			...state,
			quotes,
			displayedQuotes: newQuotes,
			isLoading: false,
		};
	})
);
