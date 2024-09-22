import { Component, OnDestroy, OnInit } from "@angular/core";
import { delay, of } from "rxjs";

@Component({
	selector: "app-loading-screen",
	templateUrl: "./loading-screen.component.html",
	styleUrl: "./loading-screen.component.scss",
})
export class LoadingScreenComponent {
	readonly showScreen$ = of(true).pipe(delay(500));
}
