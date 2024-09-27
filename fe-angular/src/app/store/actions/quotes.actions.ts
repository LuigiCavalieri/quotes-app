import { createAction, props } from "@ngrx/store";
import { Quote, QuotesSearchFilters } from "../../types/quotes";

export const loadQuotes = createAction(
	"[Quotes State] Load quotes",
	props<{ page: number; filters: QuotesSearchFilters }>()
);
export const fetchQuotesSuccess = createAction(
	"[Quotes State] Quotes successfully fetched",
	props<{ newQuotes: Quote[]; page: number; totalCount: number }>()
);
