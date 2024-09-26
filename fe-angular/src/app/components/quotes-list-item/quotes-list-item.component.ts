import { Component, Input } from "@angular/core";
import { Quote } from "../../types/quotes";

@Component({
	selector: "app-quotes-list-item",
	templateUrl: "./quotes-list-item.component.html",
	styleUrl: "./quotes-list-item.component.scss",
})
export class QuotesListItemComponent {
	@Input({ required: true }) quote!: Quote;
}
