import { createAction, props } from "@ngrx/store";
import { Quote, QuotesSearchFilters } from "../../types/quotes";

export const loadQuotes = createAction("[Quotes State] Load quotes", props<{ page: number }>());
export const fetchQuotesSuccess = createAction(
	"[Quotes State] Quotes successfully fetched",
	props<{ newQuotes: Quote[]; page: number; totalCount: number; resetCache?: boolean }>()
);
export const fetchQuotesError = createAction(
	"[Quotes State] Failed fetching quotes",
	props<{ errorMessage: string }>()
);
export const reloadQuotes = createAction("[Quotes State] Reload quotes");
