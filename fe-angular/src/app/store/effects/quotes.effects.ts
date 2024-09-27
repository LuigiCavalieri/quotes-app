import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import * as QuotesActions from "../actions/quotes.actions";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { EMPTY_STRING } from "../../constants";
import { of, iif } from "rxjs";
import { noopAction } from "../actions/app.actions";
import { QuotesService } from "../../services/quotes.service";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { selectQuotes } from "../selectors/quotes.selectors";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class QuotesEffects {
	readonly loadQuotes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(QuotesActions.loadQuotes),
			concatLatestFrom(({ page }) => this.store.select(selectQuotes(page))),
			exhaustMap(([{ page }, quotes]) => {
				return iif(
					() => Boolean(!page || quotes.length),
					of(noopAction()),
					this.quotesService.getQuotes(page).pipe(
						map(data =>
							QuotesActions.fetchQuotesSuccess({
								page,
								newQuotes: data?.quotes || [],
								totalCount: data?.total_count || 0,
							})
						),
						catchError(({ error }: HttpErrorResponse) =>
							of(
								QuotesActions.fetchQuotesError({
									errorMessage: error?.message || EMPTY_STRING,
								})
							)
						)
					)
				);
			})
		)
	);
	readonly reloadQuotes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(QuotesActions.reloadQuotes),
			exhaustMap(() => {
				return this.quotesService.getQuotes(1).pipe(
					map(data =>
						QuotesActions.fetchQuotesSuccess({
							page: 1,
							resetCache: true,
							newQuotes: data?.quotes || [],
							totalCount: data?.total_count || 0,
						})
					),
					catchError(({ error }: HttpErrorResponse) =>
						of(
							QuotesActions.fetchQuotesError({
								errorMessage: error?.message || EMPTY_STRING,
							})
						)
					)
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
