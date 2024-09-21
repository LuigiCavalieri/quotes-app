import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { AuthFormValues } from "../../types/auth";

@Component({
	selector: "app-signup-page",
	templateUrl: "./signup-page.component.html",
	styleUrl: "./signup-page.component.scss",
})
export class SignupPageComponent {
	isLoading = false;
	showSuccessMessage = false;

	readonly pageItems = pageItems;

	onSubmit(values: AuthFormValues) {
		this.isLoading = true;

		console.log(values);
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}
}
