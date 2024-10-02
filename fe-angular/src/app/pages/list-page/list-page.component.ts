import { Component, HostBinding } from "@angular/core";

@Component({
	selector: "app-list-page",
	templateUrl: "./list-page.component.html",
	styleUrl: "./list-page.component.scss",
})
export class ListPageComponent {
	showRandomQuote = true;
	resetSearchNeedleCounter = 0;

	@HostBinding("class") class = "flex flex-column gap-2";

	handleOnSave() {
		this.resetSearchNeedleCounter += 1;
	}
}
