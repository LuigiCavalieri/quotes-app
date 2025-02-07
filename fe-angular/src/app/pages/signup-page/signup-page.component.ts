import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { Credentials } from "../../types/auth";
import { AuthService } from "../../services/auth.service";
import { catchError, EMPTY } from "rxjs";
import { EMPTY_STRING } from "../../constants";
import { AuthLayoutComponent } from "../../components/auth-layout/auth-layout.component";
import { AuthFormTitleComponent } from "../../components/auth-form-title/auth-form-title.component";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
	standalone: true,
	selector: "app-signup-page",
	templateUrl: "./signup-page.component.html",
	styleUrl: "./signup-page.component.scss",
	imports: [
		CommonModule,
		RouterModule,
		AuthLayoutComponent,
		AuthFormTitleComponent,
		AuthFormComponent,
	],
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
