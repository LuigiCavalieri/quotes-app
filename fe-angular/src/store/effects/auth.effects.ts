import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../actions/auth.actions";
import { delay, EMPTY, exhaustMap, of, switchMap, tap } from "rxjs";
import { getStorageItem, setStorageItem } from "../../app/library/local-storage";
import { LocalStorageKeys } from "../../app/constants";

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
	readonly fetchUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.fetchUser),
			exhaustMap(() => {
				console.log("fetching user");

				if (!getStorageItem(LocalStorageKeys.isLoggedIn)) {
					return of(AuthActions.fetchUserSuccess());
				}

				return of(EMPTY).pipe(
					delay(2000),
					tap(() => setStorageItem(LocalStorageKeys.isLoggedIn, true)),
					switchMap(() => of(AuthActions.loginSuccess(), AuthActions.fetchUserSuccess()))
				);
			})
		)
	);

	constructor(private actions$: Actions) {}
}
