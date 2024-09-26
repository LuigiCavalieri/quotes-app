import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { SharedModule } from "./shared.module";
import { QuotesFormComponent } from "../components/quotes-form/quotes-form.component";
import { ListPageComponent } from "../pages/list-page/list-page.component";

@NgModule({
	declarations: [AdminLayoutComponent, ListPageComponent, QuotesFormComponent],
	imports: [SharedModule],
})
export class AdminModule {}
