import { Component, Input } from "@angular/core";
import { Quote } from "../../types/quotes";
import { EMPTY_STRING } from "../../constants";
import appConfig from "../../config/appConfig";

@Component({
	selector: "app-quotes-list-item",
	templateUrl: "./quotes-list-item.component.html",
	styleUrl: "./quotes-list-item.component.scss",
})
export class QuotesListItemComponent {
	@Input({ required: true }) quote = {} as Quote;
	@Input({ required: true }) itemIndex = 1;
	@Input() class = EMPTY_STRING;

	readonly authorDefaultName = appConfig.authorDefaultName;
}
