import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { SharedModule } from "./shared.module";

@NgModule({
	declarations: [AdminLayoutComponent],
	imports: [SharedModule],
})
export class AdminModule {}
