import { Component } from "@angular/core";

@Component({
	selector: "app-list-page",
	templateUrl: "./list-page.component.html",
	styleUrl: "./list-page.component.scss",
	host: {
		class: "flex flex-column gap-2",
	},
})
export class ListPageComponent {
	showRandomQuote = true;
	resetSearchNeedleCounter = 0;

	handleOnSave() {
		this.resetSearchNeedleCounter += 1;
	}
}
