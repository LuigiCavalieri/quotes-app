import { createSelector } from "@ngrx/store";
import { AppState } from "..";

const selectQuotesState = (state: AppState) => state.quotesState;

export const selectQuotes = (page: number) =>
	createSelector(selectQuotesState, quotesState => quotesState.quotes[Number(page) || 0] ?? []);
export const selectDisplayedQuotes = createSelector(
	selectQuotesState,
	quotesState => quotesState.displayedQuotes
);
export const selectIsLoadingQuotes = createSelector(
	selectQuotesState,
	quotesState => quotesState.isLoading
);
