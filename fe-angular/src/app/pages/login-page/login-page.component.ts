import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { Credentials } from "../../types/auth";
import { Store } from "@ngrx/store";
import { doLogin } from "../../store/actions/auth.actions";
import { AppState } from "../../store";
import { AuthService } from "../../services/auth.service";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { EMPTY_STRING } from "../../constants";
import { AuthLayoutComponent } from "../../components/auth-layout/auth-layout.component";
import { RouterModule } from "@angular/router";
import { AuthFormTitleComponent } from "../../components/auth-form-title/auth-form-title.component";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
	standalone: true,
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrl: "./login-page.component.scss",
	imports: [RouterModule, AuthLayoutComponent, AuthFormTitleComponent, AuthFormComponent],
})
export class LoginPageComponent {
	isLoading = false;
	errorMessage = EMPTY_STRING;

	readonly pageItems = pageItems;

	constructor(
		private store: Store<AppState>,
		private authService: AuthService
	) {}

	onSubmit(credentials: Credentials) {
		this.isLoading = true;
		this.errorMessage = EMPTY_STRING;

		this.authService
			.login(credentials)
			.pipe(
				catchError((errorMessage: string) => {
					this.isLoading = false;
					this.errorMessage = errorMessage;

					return EMPTY;
				})
			)
			.subscribe(() => {
				this.isLoading = false;
				this.store.dispatch(doLogin());
			});
	}
}
