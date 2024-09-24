import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import appConfig from "../../config/appConfig";
import { Credentials } from "../../types/auth";
import { EMAIL_REGEXP, EMPTY_STRING } from "../../constants";

@Component({
	selector: "app-auth-form",
	templateUrl: "./auth-form.component.html",
	styleUrl: "./auth-form.component.scss",
})
export class AuthFormComponent implements OnInit, OnChanges {
	@Input({ required: true }) type!: "signup" | "login";
	@Input() isLoading = false;
	@Input() errorMessage = EMPTY_STRING;
	@Output() onSubmit = new EventEmitter<Credentials>();

	showPassword = false;

	readonly passwordMinLength = appConfig.passwordMinLength;
	readonly passwordSpecialChars = appConfig.passwordSpecialChars;
	readonly form = new FormGroup<{
		name?: FormControl<string>;
		email: FormControl<string>;
		password: FormControl<string>;
	}>({
		name: new FormControl(EMPTY_STRING, {
			validators: [
				Validators.required,
				Validators.pattern(new RegExp(`^[${appConfig.authorNameAllowedCharsRegex}]+$`, "iu")),
			],
			nonNullable: true,
		}),
		email: new FormControl(EMPTY_STRING, {
			validators: [Validators.required, Validators.pattern(EMAIL_REGEXP)],
			nonNullable: true,
		}),
		password: new FormControl(EMPTY_STRING, {
			validators: [Validators.required],
			nonNullable: true,
		}),
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

	ngOnChanges(changes: SimpleChanges): void {
		const { currentValue: isLoading } = changes["isLoading"] || {};

		if (isLoading) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	isSignupForm(): boolean {
		return this.type === "signup";
	}

	showErrorMessage(): boolean {
		return Boolean(this.errorMessage);
	}

	handleNgSubmit(): void {
		this.onSubmit.emit(this.form.value as Credentials);
	}
}
