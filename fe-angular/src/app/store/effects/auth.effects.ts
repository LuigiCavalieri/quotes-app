import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../actions/auth.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../library/local-storage";
import { LocalStorageKeys } from "../../constants";
import { EMPTY, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { noopAction } from "../actions/app.actions";

@Injectable()
export class AuthEffects {
	readonly doLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.doLogin),
			tap(() => setStorageItem(LocalStorageKeys.isLoggedIn, true)),
			map(() => AuthActions.fetchUser())
		)
	);
	readonly doLogout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.doLogout),
				tap(() => removeStorageItem(LocalStorageKeys.isLoggedIn)),
				exhaustMap(({ force }) => {
					if (force) {
						return of(EMPTY);
					}

					return this.authService.logout().pipe(catchError(() => of(EMPTY)));
				})
			),
		{ dispatch: false }
	);
	readonly fetchUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.fetchUser),
			exhaustMap(() => {
				if (!getStorageItem(LocalStorageKeys.isLoggedIn)) {
					return of(noopAction());
				}

				return this.authService.me().pipe(
					map(user => AuthActions.fetchUserSuccess({ user })),
					catchError(() => of(AuthActions.doLogout({ force: true })))
				);
			})
		)
	);

	constructor(
		private actions$: Actions,
		private authService: AuthService
	) {}
}
