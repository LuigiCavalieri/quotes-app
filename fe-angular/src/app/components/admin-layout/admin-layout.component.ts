import { Component } from "@angular/core";
import appConfig from "../../config/appConfig";
import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { Router } from "@angular/router";
import {
	selectIsFetchingUser,
	selectIsLoggedIn,
	selectUser,
} from "../../store/selectors/auth.selectors";
import { pageItems } from "../../config/pageItems";
import { doLogout } from "../../store/actions/auth.actions";

@Component({
	selector: "app-admin-layout",
	templateUrl: "./admin-layout.component.html",
	styleUrl: "./admin-layout.component.scss",
})
export class AdminLayoutComponent {
	readonly title = appConfig.appName;
	readonly destroySbj$ = new Subject();
	readonly isLoading$ = this.store.select(selectIsFetchingUser);
	readonly user$ = this.store.select(selectUser);

	constructor(
		private store: Store<AppState>,
		private router: Router
	) {
		store
			.select(selectIsLoggedIn)
			.pipe(takeUntil(this.destroySbj$))
			.subscribe(isLoggedIn => {
				if (!isLoggedIn) {
					this.router.navigateByUrl(pageItems.login.url);
				}
			});
	}

	handleLogout(): void {
		this.store.dispatch(doLogout({}));
	}

	ngOnDestroy(): void {
		this.destroySbj$.next(true);
		this.destroySbj$.complete();
	}
}
