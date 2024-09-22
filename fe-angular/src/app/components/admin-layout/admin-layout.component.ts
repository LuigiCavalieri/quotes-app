import { Component } from "@angular/core";
import appConfig from "../../config/appConfig";
import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store";
import { Router } from "@angular/router";
import { selectIsFetchingUser, selectIsLoggedIn } from "../../../store/selectors/auth.selectors";
import { pageItems } from "../../config/pageItems";

@Component({
	selector: "app-admin-layout",
	templateUrl: "./admin-layout.component.html",
	styleUrl: "./admin-layout.component.scss",
})
export class AdminLayoutComponent {
	readonly title = appConfig.appName;
	readonly destroyedSbj$ = new Subject();
	readonly isLoading$ = this.store.select(selectIsFetchingUser);

	constructor(
		private store: Store<AppState>,
		private router: Router
	) {
		store
			.select(selectIsLoggedIn)
			.pipe(takeUntil(this.destroyedSbj$))
			.subscribe(isLoggedIn => {
				if (!isLoggedIn) {
					this.router.navigateByUrl(pageItems.login.url);
				}
			});
	}

	ngOnDestroy(): void {
		this.destroyedSbj$.next(true);
		this.destroyedSbj$.complete();
	}
}
