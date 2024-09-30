import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { SharedModule } from "./shared.module";
import { QuoteFormComponent } from "../components/quote-form/quote-form.component";
import { ListPageComponent } from "../pages/list-page/list-page.component";
import { QuotesListComponent } from "../components/quotes-list/quotes-list.component";
import { QuotesListItemComponent } from "../components/quotes-list-item/quotes-list-item.component";
import { PaginationMenuComponent } from "../components/pagination-menu/pagination-menu.component";
import { RandomQuoteComponent } from "../components/random-quote/random-quote.component";

@NgModule({
	declarations: [
		AdminLayoutComponent,
		ListPageComponent,
		QuoteFormComponent,
		QuotesListComponent,
		QuotesListItemComponent,
		PaginationMenuComponent,
		RandomQuoteComponent,
	],
	imports: [SharedModule],
})
export class AdminModule {}
