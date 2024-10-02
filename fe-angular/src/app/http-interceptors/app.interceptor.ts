import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { endpointsUrl } from "../config/endpointsUrl";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store";
import { doLogout } from "../store/actions/auth.actions";

const authUrls = [endpointsUrl.login, endpointsUrl.logout, endpointsUrl.signup, endpointsUrl.me];

export const appInterceptor: HttpInterceptorFn = (req, next) => {
	const store = inject(Store<AppState>);
	const newReq = req.clone({
		withCredentials: true,
		setHeaders: { "Content-Type": "application/json" },
	});

	return next(newReq).pipe(
		catchError((respError: HttpErrorResponse) => {
			if (!authUrls.includes(newReq.url) && [401, 403].includes(respError.status)) {
				alert("Your session expired. Please, log in again.");
				store.dispatch(doLogout({ force: true }));
			}

			return throwError(() => respError.error?.message || respError.statusText);
		})
	);
};
