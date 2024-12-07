import { Component, HostBinding } from "@angular/core";
import { RandomQuoteComponent } from "../../components/random-quote/random-quote.component";
import { QuoteFormComponent } from "../../components/quote-form/quote-form.component";
import { QuotesListComponent } from "../../components/quotes-list/quotes-list.component";
import { CommonModule } from "@angular/common";

@Component({
	standalone: true,
	selector: "app-list-page",
	templateUrl: "./list-page.component.html",
	styleUrl: "./list-page.component.scss",
	imports: [CommonModule, RandomQuoteComponent, QuoteFormComponent, QuotesListComponent],
})
export class ListPageComponent {
	showRandomQuote = true;
	resetSearchNeedleCounter = 0;

	@HostBinding("class") class = "flex flex-column gap-2";

	handleOnSave() {
		this.resetSearchNeedleCounter += 1;
	}
}
