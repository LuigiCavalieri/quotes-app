import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { pageItems } from "../../config/pageItems";
import { ErrorCodes } from "../../constants";
import { AuthService } from "../../services/auth.service";
import { catchError, EMPTY } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { isEmail } from "../../utils/strings";
import { AuthLayoutComponent } from "../../components/auth-layout/auth-layout.component";
import { CommonModule } from "@angular/common";

@Component({
	standalone: true,
	selector: "app-activate-account-page",
	templateUrl: "./activate-account-page.component.html",
	styleUrl: "./activate-account-page.component.scss",
	imports: [CommonModule, RouterModule, AuthLayoutComponent],
})
export class ActivateAccountPageComponent {
	isLoading = false;
	errorCode = 0;

	readonly pageItems = pageItems;
	readonly errorCodes = {
		invalidQueryParams: 1,
		accountCannotBeActivated: 2,
		serverError: 3,
	};

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {
		this.route.queryParams.subscribe(({ email, activationToken }) => {
			if (email && activationToken) {
				this.triggerActivation(email, activationToken);
			} else {
				this.router.navigateByUrl(this.pageItems.signup.url);
			}
		});
	}

	triggerActivation(email: string, activationToken: string) {
		if (!isEmail(email) || /[^a-z0-9-]/i.test(activationToken)) {
			this.errorCode = this.errorCodes.invalidQueryParams;

			return;
		}

		this.isLoading = true;

		this.authService
			.activateAccount({ email, activationToken })
			.pipe(
				catchError(({ error }: HttpErrorResponse) => {
					this.isLoading = false;

					if (error?.message === ErrorCodes.accountCannotBeActivated) {
						this.errorCode = this.errorCodes.accountCannotBeActivated;
					} else {
						this.errorCode = this.errorCodes.serverError;
					}

					return EMPTY;
				})
			)
			.subscribe(() => {
				this.isLoading = false;
			});
	}
}
