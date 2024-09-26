import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/quotes.actions";
import { Quote } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";

export interface QuotesState {
	quotes: Record<number, Quote[]>;
	displayedQuotes: Quote[];
	isLoading: boolean;
	isRefetching: boolean;
	fetchError: string;
}

export const initialState: QuotesState = {
	quotes: {} as Record<number, Quote[]>,
	displayedQuotes: [],
	isLoading: false,
	isRefetching: false,
	fetchError: EMPTY_STRING,
};

export const quotesReducer = createReducer(
	initialState,
	on(Actions.loadQuotes, (state, { page }) => {
		if (Number(page) && state.quotes[page]) {
			return {
				...state,
				displayedQuotes: state.quotes[page],
			};
		}

		return {
			...state,
			isLoading: true,
		};
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
