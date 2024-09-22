import { Component } from "@angular/core";
import { pageItems } from "../../config/pageItems";
import { Credentials } from "../../types/auth";
import { Store } from "@ngrx/store";
import { login } from "../../../store/actions/auth.actions";
import { selectIsDoingLogin } from "../../../store/selectors/auth.selectors";
import { AppState } from "../../../store";

@Component({
	selector: "app-login-page",
	templateUrl: "./login-page.component.html",
	styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {
	readonly pageItems = pageItems;
	readonly isLoading$ = this.store.select(selectIsDoingLogin);

	constructor(private store: Store<AppState>) {}

	onSubmit(credentials: Credentials) {
		this.store.dispatch(login({ credentials }));
	}
}
