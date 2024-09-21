import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { AuthFormValues } from "../../types/auth";

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
	readonly pageItems = pageItems;
	isLoading = false;

	onSubmit(values: AuthFormValues) {
		this.isLoading = true;

		console.log(values);
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}
}
