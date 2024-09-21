import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import appConfig from "../../config/appConfig";

@Component({
	selector: "app-auth-form",
	templateUrl: "./auth-form.component.html",
	styleUrl: "./auth-form.component.scss",
})
export class AuthFormComponent implements OnInit {
	@Input({ required: true }) type!: "signup" | "login";
	showPassword = false;

	readonly passwordMinLength = appConfig.passwordMinLength;
	readonly passwordSpecialChars = appConfig.passwordSpecialChars;

	readonly form = new FormGroup<{
		name?: FormControl<string | null>;
		email: FormControl<string | null>;
		password: FormControl<string | null>;
	}>({
		name: new FormControl("", [
			Validators.required,
			Validators.pattern(new RegExp(`^[${appConfig.authorNameAllowedCharsRegex}]+$`, "iu")),
		]),
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
	});

	constructor() {}

	ngOnInit(): void {
		if (this.isSignupForm()) {
			const regex = new RegExp(
				`^[a-z0-9${this.passwordSpecialChars}]{${this.passwordMinLength},}$`,
				"i"
			);

			this.form.controls.password.addValidators(Validators.pattern(regex));
		} else {
			this.form.removeControl("name");
		}
	}

	isSignupForm() {
		return this.type === "signup";
	}
}
