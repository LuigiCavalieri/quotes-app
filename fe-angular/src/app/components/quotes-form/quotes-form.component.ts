import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { EMPTY_STRING } from "../../constants";
import { QuoteWithoutServerGenFields } from "../../types/quotes";

@Component({
	selector: "app-quotes-form",
	templateUrl: "./quotes-form.component.html",
	styleUrl: "./quotes-form.component.scss",
})
export class QuotesFormComponent {
	readonly form = new FormGroup<{
		content: FormControl<string>;
		author: FormControl<string>;
	}>({
		content: new FormControl(EMPTY_STRING, { nonNullable: true }),
		author: new FormControl(EMPTY_STRING, { nonNullable: true }),
	});

	isSubmitDisabled(): boolean {
		return !this.form.controls.content.value.trim();
	}

	handleNgSubmit() {
		console.log(this.form.value);
	}
}
