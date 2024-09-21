import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";

@Component({
	selector: "app-not-found-page",
	templateUrl: "./not-found-page.component.html",
	styleUrl: "./not-found-page.component.scss",
})
export class NotFoundPageComponent {
	readonly pageItems = pageItems;
}
