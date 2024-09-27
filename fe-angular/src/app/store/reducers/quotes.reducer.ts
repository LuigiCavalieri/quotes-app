import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/quotes.actions";
import { Quote } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";

export interface QuotesState {
	quotes: Record<number, Quote[]>;
	displayedQuotes: Quote[];
	isLoading: boolean;
	fetchErrorMessage: string;
	pagination: {
		currentPage: number;
		totalCount: number;
	};
}

export const initialState: QuotesState = {
	quotes: {} as Record<number, Quote[]>,
	displayedQuotes: [],
	isLoading: false,
	fetchErrorMessage: EMPTY_STRING,
	pagination: {
		currentPage: 1,
		totalCount: 0,
	},
};

export const quotesReducer = createReducer(
	initialState,
	on(Actions.loadQuotes, (state, { page }) => {
		const _page = Number(page) || 0;

		if (state.quotes[_page]) {
			return {
				...state,
				displayedQuotes: state.quotes[_page],
				pagination: {
					...state.pagination,
					currentPage: page,
				},
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
	on(Actions.fetchQuotesSuccess, (state, { newQuotes, page, totalCount }) => {
		return {
			...state,
			displayedQuotes: newQuotes,
			isLoading: false,
			quotes: {
				...state.quotes,
				[page]: newQuotes,
			},
			pagination: {
				totalCount,
				currentPage: page,
			},
		};
	}),
	on(Actions.fetchQuotesError, (state, { errorMessage }) => {
		return {
			...state,
			isLoading: false,
			fetchErrorMessage: errorMessage,
		};
	})
);
