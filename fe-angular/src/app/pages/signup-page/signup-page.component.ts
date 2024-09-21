import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";

@Component({
	selector: "app-signup-page",
	templateUrl: "./signup-page.component.html",
	styleUrl: "./signup-page.component.scss",
})
export class SignupPageComponent {
	readonly pageItems = pageItems;
	showSuccessMessage = false;
}
