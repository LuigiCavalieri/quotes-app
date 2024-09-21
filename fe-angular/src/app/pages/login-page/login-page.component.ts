import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
	readonly pageItems = pageItems;
}
