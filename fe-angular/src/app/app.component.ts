import { Component, OnInit } from "@angular/core";
import { getStorageItem } from "./library/local-storage";
import { LocalStorageKeys } from "./constants";
import { Store } from "@ngrx/store";
import { fetchUser } from "../store/actions/auth.actions";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
	constructor(private store: Store) {}

	ngOnInit(): void {
		if (getStorageItem(LocalStorageKeys.isLoggedIn)) {
			this.store.dispatch(fetchUser());
		}
	}
}
