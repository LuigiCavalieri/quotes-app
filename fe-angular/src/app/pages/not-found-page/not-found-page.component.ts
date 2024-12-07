import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { RouterModule } from "@angular/router";

@Component({
	standalone: true,
	selector: "app-not-found-page",
	templateUrl: "./not-found-page.component.html",
	styleUrl: "./not-found-page.component.scss",
	imports: [RouterModule],
})
export class NotFoundPageComponent {
	readonly pageItems = pageItems;
}
