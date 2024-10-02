import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { Credentials } from "../../types/auth";
import { AuthService } from "../../services/auth.service";
import { catchError, EMPTY } from "rxjs";
import { EMPTY_STRING } from "../../constants";

@Component({
	selector: "app-signup-page",
	templateUrl: "./signup-page.component.html",
	styleUrl: "./signup-page.component.scss",
})
export class SignupPageComponent {
	isLoading = false;
	errorMessage = EMPTY_STRING;
	showSuccessMessage = false;

	readonly pageItems = pageItems;

	constructor(private authService: AuthService) {}

	onSubmit(credentials: Credentials) {
		this.isLoading = true;
		this.errorMessage = EMPTY_STRING;

		this.authService
			.signup(credentials)
			.pipe(
				catchError((errorMessage: string) => {
					this.isLoading = false;
					this.errorMessage = errorMessage;

					return EMPTY;
				})
			)
			.subscribe(() => {
				this.isLoading = false;
				this.showSuccessMessage = true;
			});
	}
}
