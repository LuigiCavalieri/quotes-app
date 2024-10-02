import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { getCacheKey, QuotesState } from "../reducers/quotes.reducer";
import { QuotesPagination, QuotesSearchFilters } from "../../types/quotes";

const selectQuotesState = (state: AppState) => state.quotesState;

export const selectQuotes = (page: number, filters?: QuotesSearchFilters) =>
	createSelector(selectQuotesState, quotesState => {
		const _page = Number(page) || 0;
		const cacheKey = getCacheKey({ filtered: Boolean(filters) });

		return quotesState.quotesCache[cacheKey][_page] ?? [];
	});
export const selectDisplayedQuotes = createSelector(
	selectQuotesState,
	quotesState => quotesState.displayedQuotes
);
export const selectIsLoadingQuotes = createSelector(
	selectQuotesState,
	quotesState => quotesState.isLoading
);
export const selectIsFetchError = createSelector(selectQuotesState, quotesState =>
	Boolean(quotesState.fetchErrorMessage)
);
export const selectFetchErrorMessage = createSelector(
	selectQuotesState,
	quotesState => quotesState.fetchErrorMessage
);
export const selectPagination = createSelector<AppState, QuotesState, QuotesPagination>(
	selectQuotesState,
	quotesState => {
		const cacheKey = quotesState.activeCacheKey;

		return {
			currentPage: quotesState.currentPage,
			totalCount: quotesState.totalCount[cacheKey],
		};
	}
);
