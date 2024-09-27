import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/quotes.actions";
import { Quote, QuotesSearchFilters } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";

export interface QuotesState {
	quotesCache: {
		filtered: Record<number, Quote[]>;
		default: Record<number, Quote[]>;
	};
	displayedQuotes: Quote[];
	isLoading: boolean;
	fetchErrorMessage: string;
	currentPage: number;
	totalCount: {
		filtered: number;
		default: number;
	};
}

export const initialState: QuotesState = {
	quotesCache: {
		filtered: {} as Record<number, Quote[]>,
		default: {} as Record<number, Quote[]>,
	},
	displayedQuotes: [],
	isLoading: false,
	fetchErrorMessage: EMPTY_STRING,
	currentPage: 1,
	totalCount: {
		filtered: 0,
		default: 0,
	},
};

export const getCacheKey = (args: { filtered: boolean }) => {
	return args.filtered ? "filtered" : "default";
};

export const quotesReducer = createReducer(
	initialState,
	on(Actions.loadQuotes, (state, { page, filters }) => {
		const _page = Number(page) || 0;
		const cacheKey = getCacheKey({ filtered: Boolean(filters) });
		const quotesCache = state.quotesCache[cacheKey];

		if (quotesCache[_page]) {
			return {
				...state,
				displayedQuotes: quotesCache[_page],
				currentPage: page,
			};
		}

		if (_page > 0) {
			return {
				...state,
				fetchErrorMessage: EMPTY_STRING,
				isLoading: true,
			};
		}

		return state;
	}),
	on(Actions.fetchQuotesSuccess, (state, { newQuotes, page, totalCount, filtered, resetCache }) => {
		const cacheKey = getCacheKey({ filtered: Boolean(filtered) });
		const newQuotesCache = {
			...(resetCache ? {} : state.quotesCache[cacheKey]),
			[page]: newQuotes,
		};

		return {
			...state,
			currentPage: page,
			displayedQuotes: newQuotes,
			isLoading: false,
			quotesCache: {
				...state.quotesCache,
				[cacheKey]: newQuotesCache,
			},
			totalCount: {
				...state.totalCount,
				[cacheKey]: totalCount,
			},
		};
	}),
	on(Actions.fetchQuotesError, (state, { errorMessage }) => {
		return {
			...state,
			isLoading: false,
			fetchErrorMessage: errorMessage,
		};
	}),
	on(Actions.reloadQuotes, state => {
		return {
			...state,
			fetchErrorMessage: EMPTY_STRING,
			isLoading: true,
		};
	})
);
