import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { selectIsFetchingUser, selectIsLoggedIn } from "../../store/selectors/auth.selectors";
import { Router } from "@angular/router";
import { pageItems } from "../../config/pageItems";
import { Subject, takeUntil } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { CommonModule } from "@angular/common";

@Component({
	standalone: true,
	selector: "app-auth-layout",
	templateUrl: "./auth-layout.component.html",
	styleUrl: "./auth-layout.component.scss",
	imports: [CommonModule, MatCardModule, LoadingScreenComponent],
})
export class AuthLayoutComponent implements OnDestroy {
	readonly destroySbj$ = new Subject();
	readonly isLoading$ = this.store.select(selectIsFetchingUser);

	constructor(
		private store: Store<AppState>,
		private router: Router
	) {
		store
			.select(selectIsLoggedIn)
			.pipe(takeUntil(this.destroySbj$))
			.subscribe(isLoggedIn => {
				if (isLoggedIn) {
					this.router.navigateByUrl(pageItems.admin.url);
				}
			});
	}

	ngOnDestroy(): void {
		this.destroySbj$.next(true);
		this.destroySbj$.complete();
	}
}
