import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { Credentials } from "../../types/auth";

@Component({
	selector: "app-signup-page",
	templateUrl: "./signup-page.component.html",
	styleUrl: "./signup-page.component.scss",
})
export class SignupPageComponent {
	isLoading = false;
	showSuccessMessage = false;

	readonly pageItems = pageItems;

	onSubmit(values: Credentials) {
		this.isLoading = true;

		console.log(values);
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}
}
