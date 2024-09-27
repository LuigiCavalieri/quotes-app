import { Component } from "@angular/core";

@Component({
	selector: "app-list-page",
	templateUrl: "./list-page.component.html",
	styleUrl: "./list-page.component.scss",
	host: {
		class: "flex flex-column gap-3",
	},
})
export class ListPageComponent {
	resetSearchNeedleCounter = 0;

	handleOnSave() {
		this.resetSearchNeedleCounter += 1;
	}
}
