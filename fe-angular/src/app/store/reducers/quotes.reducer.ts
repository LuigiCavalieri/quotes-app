import { createReducer, on } from "@ngrx/store";
import * as Actions from "../actions/quotes.actions";
import { Quote } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";

type CacheKey = "filtered" | "default";

export interface QuotesState {
	quotesCache: Record<CacheKey, Record<number, Quote[]>>;
	activeCacheKey: CacheKey;
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
	activeCacheKey: "default",
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
	return (args.filtered ? "filtered" : "default") as CacheKey;
};

export const quotesReducer = createReducer(
	initialState,
	on(Actions.loadQuotes, (state, { page, filters, reload }) => {
		const _page = Number(page) || 0;
		const filtered = Boolean(filters);
		const cacheKey = getCacheKey({ filtered });
		const quotesCache = state.quotesCache[cacheKey];

		if (!reload && quotesCache[_page]) {
			return {
				...state,
				activeCacheKey: cacheKey,
				displayedQuotes: quotesCache[_page],
				currentPage: page,
			};
		}

		const isSwitchingBetweenCaches = state.activeCacheKey !== cacheKey;
		const newState = {
			...state,
			activeCacheKey: cacheKey,
			fetchErrorMessage: EMPTY_STRING,
			isLoading: true,
		};

		if (reload && isSwitchingBetweenCaches && cacheKey === "filtered") {
			const oldTotalCount = state.totalCount;

			return {
				...newState,
				totalCount: {
					...oldTotalCount,
					filtered: oldTotalCount.default,
				},
			};
		}

		if (reload || _page > 0) {
			return newState;
		}

		return state;
	}),
	on(Actions.fetchQuotesSuccess, (state, { newQuotes, page, totalCount, resetCache }) => {
		const cacheKey = state.activeCacheKey;
		const newQuotesCache = {
			...(resetCache ? {} : state.quotesCache[cacheKey]),
			[page]: newQuotes,
		};

		return {
			...state,
			currentPage: page,
			displayedQuotes: newQuotes ?? [],
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
	on(Actions.resetIsLoadingQuotes, state => {
		return {
			...state,
			isLoading: false,
		};
	})
);
