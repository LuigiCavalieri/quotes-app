import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { SharedModule } from "./shared.module";
import { QuotesFormComponent } from "../components/quotes-form/quotes-form.component";
import { ListPageComponent } from "../pages/list-page/list-page.component";
import { QuotesListComponent } from "../components/quotes-list/quotes-list.component";
import { QuotesListItemComponent } from "../components/quotes-list-item/quotes-list-item.component";

@NgModule({
	declarations: [
		AdminLayoutComponent,
		ListPageComponent,
		QuotesFormComponent,
		QuotesListComponent,
		QuotesListItemComponent,
	],
	imports: [SharedModule],
})
export class AdminModule {}
