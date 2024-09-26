import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import * as QuotesActions from "../actions/quotes.actions";
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../library/local-storage";
import { LocalStorageKeys } from "../../constants";
import { EMPTY, of, iif } from "rxjs";
import { noopAction } from "../actions/app.actions";
import { QuotesService } from "../../services/quotes.service";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { selectQuotes } from "../selectors/quotes.selectors";

@Injectable()
export class QuotesEffects {
	readonly loadQuotes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(QuotesActions.loadQuotes),
			concatLatestFrom(({ page }) => this.store.select(selectQuotes(page))),
			switchMap(([{ page, filters }, quotes]) => {
				return iif(
					() => Boolean(quotes.length),
					of(noopAction()),
					this.quotesService.getQuotes(page, filters).pipe(
						map(data => QuotesActions.fetchQuotesSuccess({ newQuotes: data?.quotes || [], page })),
						catchError(() => of(noopAction()))
					)
				);
			})
		)
	);
	// readonly doLogout$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(AuthActions.doLogout),
	// 			tap(() => removeStorageItem(LocalStorageKeys.isLoggedIn)),
	// 			exhaustMap(({ force }) => {
	// 				return iif(
	// 					() => Boolean(force),
	// 					of(EMPTY),
	// 					this.authService.logout().pipe(catchError(() => EMPTY))
	// 				);
	// 			})
	// 		),
	// 	{ dispatch: false }
	// );
	// readonly fetchUser$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(AuthActions.fetchUser),
	// 		exhaustMap(() => {
	// 			return iif(
	// 				() => Boolean(getStorageItem(LocalStorageKeys.isLoggedIn)),
	// 				this.authService.me().pipe(
	// 					map(user => AuthActions.fetchUserSuccess({ user })),
	// 					catchError(() => of(AuthActions.doLogout({ force: true })))
	// 				),
	// 				of(noopAction())
	// 			);
	// 		})
	// 	)
	// );

	constructor(
		private actions$: Actions,
		private quotesService: QuotesService,
		private store: Store<AppState>
	) {}
}
