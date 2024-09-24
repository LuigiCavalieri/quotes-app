import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../actions/auth.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../library/local-storage";
import { LocalStorageKeys } from "../../constants";
import { EMPTY, of, iif } from "rxjs";
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
					return iif(
						() => Boolean(force),
						of(EMPTY),
						this.authService.logout().pipe(catchError(() => EMPTY))
					);
				})
			),
		{ dispatch: false }
	);
	readonly fetchUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.fetchUser),
			exhaustMap(() => {
				return iif(
					() => Boolean(getStorageItem(LocalStorageKeys.isLoggedIn)),
					this.authService.me().pipe(
						map(user => AuthActions.fetchUserSuccess({ user })),
						catchError(() => of(AuthActions.doLogout({ force: true })))
					),
					of(noopAction())
				);
			})
		)
	);

	constructor(
		private actions$: Actions,
		private authService: AuthService
	) {}
}
