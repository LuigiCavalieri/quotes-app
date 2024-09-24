import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { selectIsFetchingUser, selectIsLoggedIn } from "../../store/selectors/auth.selectors";
import { Router } from "@angular/router";
import { pageItems } from "../../config/pageItems";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-auth-layout",
	templateUrl: "./auth-layout.component.html",
	styleUrl: "./auth-layout.component.scss",
})
export class AuthLayoutComponent implements OnDestroy {
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
				if (isLoggedIn) {
					this.router.navigateByUrl(pageItems.admin.url);
				}
			});
	}

	ngOnDestroy(): void {
		this.destroyedSbj$.next(true);
		this.destroyedSbj$.complete();
	}
}
