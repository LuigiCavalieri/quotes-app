import { Component } from "@angular/core";
import appConfig from "../../config/appConfig";

@Component({
	selector: "app-admin-layout",
	templateUrl: "./admin-layout.component.html",
	styleUrl: "./admin-layout.component.scss",
})
export class AdminLayoutComponent {
	readonly title = appConfig.appName;
}
