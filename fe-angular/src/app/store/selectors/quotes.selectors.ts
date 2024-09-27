import { createSelector } from "@ngrx/store";
import { AppState } from "..";

const selectQuotesState = (state: AppState) => state.quotesState;

export const selectQuotes = (page: number) =>
	createSelector(
		selectQuotesState,
		quotesState => quotesState.cachedQuotes[Number(page) || 0] ?? []
	);
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
export const selectPagination = createSelector(
	selectQuotesState,
	quotesState => quotesState.pagination
);
