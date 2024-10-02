import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import * as QuotesActions from "../actions/quotes.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { QuotesService } from "../../services/quotes.service";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { selectQuotes } from "../selectors/quotes.selectors";

@Injectable()
export class QuotesEffects {
	readonly loadQuotes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(QuotesActions.loadQuotes),
			concatLatestFrom(({ page, filters }) => this.store.select(selectQuotes(page, filters))),
			switchMap(([{ page, filters, refetch }, quotes]) => {
				if (!page || (quotes.length && !refetch)) {
					return of(QuotesActions.resetIsLoadingQuotes());
				}

				return this.quotesService.getQuotes(page, filters).pipe(
					map(data =>
						QuotesActions.fetchQuotesSuccess({
							page,
							resetCache: refetch,
							filtered: Boolean(filters),
							newQuotes: data?.quotes || [],
							totalCount: data?.total_count || 0,
						})
					),
					catchError((errorMessage: string) => of(QuotesActions.fetchQuotesError({ errorMessage })))
				);
			})
		)
	);

	constructor(
		private actions$: Actions,
		private quotesService: QuotesService,
		private store: Store<AppState>
	) {}
}
