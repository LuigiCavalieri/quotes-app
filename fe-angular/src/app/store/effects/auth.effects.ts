import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../actions/auth.actions";
import { delay, EMPTY, exhaustMap, of, switchMap, tap } from "rxjs";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../library/local-storage";
import { LocalStorageKeys } from "../../constants";
import { User } from "../../types/user";

@Injectable()
export class AuthEffects {
	readonly doLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login),
			exhaustMap(({ credentials }) => {
				console.log(credentials);

				return of(EMPTY).pipe(
					delay(2000),
					tap(() => setStorageItem(LocalStorageKeys.isLoggedIn, true)),
					switchMap(() => of(AuthActions.loginSuccess(), AuthActions.fetchUser()))
				);
			})
		)
	);
	readonly doLogout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logout),
				tap(() => removeStorageItem(LocalStorageKeys.isLoggedIn)),
				exhaustMap(() =>
					of(EMPTY).pipe(
						delay(2000),
						tap(() => console.log("logged out"))
					)
				)
			),
		{ dispatch: false }
	);
	readonly fetchUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.fetchUser),
			exhaustMap(() => {
				console.log("fetching user");

				if (!getStorageItem(LocalStorageKeys.isLoggedIn)) {
					return of(AuthActions.fetchUserSuccess({ user: {} as User }));
				}

				return of<User>({ name: "Mr. User", email: "user@mail.com" }).pipe(
					delay(2000),
					tap(() => setStorageItem(LocalStorageKeys.isLoggedIn, true)),
					switchMap(user => of(AuthActions.loginSuccess(), AuthActions.fetchUserSuccess({ user })))
				);
			})
		)
	);

	constructor(private actions$: Actions) {}
}
