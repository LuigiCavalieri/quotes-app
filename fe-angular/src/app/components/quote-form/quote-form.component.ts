import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { EMPTY_STRING } from "../../constants";
import { QuoteWithoutServerGenFields } from "../../types/quotes";
import { QuotesService } from "../../services/quotes.service";
import {
	BehaviorSubject,
	catchError,
	delay,
	EMPTY,
	filter,
	of,
	Subject,
	switchMap,
	takeUntil,
} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadQuotes } from "../../store/actions/quotes.actions";
import appConfig from "../../config/appConfig";
import { MatCardModule } from "@angular/material/card";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
	standalone: true,
	selector: "app-quotes-form",
	templateUrl: "./quote-form.component.html",
	styleUrl: "./quote-form.component.scss",
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		ErrorMessageComponent,
	],
})
export class QuoteFormComponent implements OnInit, OnDestroy {
	isSaving = false;
	errorMessage = EMPTY_STRING;
	showSavedSbj$ = new BehaviorSubject(false);

	@Output() save = new EventEmitter();

	readonly destroySbj$ = new Subject();
	readonly form = new FormGroup<{
		content: FormControl<string>;
		author: FormControl<string>;
	}>({
		content: new FormControl(EMPTY_STRING, { nonNullable: true }),
		author: new FormControl(EMPTY_STRING, { nonNullable: true }),
	});

	constructor(
		private quotesService: QuotesService,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.showSavedSbj$
			.pipe(
				filter(Boolean),
				switchMap(value => of(value).pipe(delay(appConfig.feedbackTimeout))),
				takeUntil(this.destroySbj$)
			)
			.subscribe(() => {
				this.showSavedSbj$.next(false);
			});

		this.form.valueChanges.pipe(takeUntil(this.destroySbj$)).subscribe(() => {
			if (this.showSavedSbj$.getValue()) {
				this.showSavedSbj$.next(false);
			}
		});
	}

	ngOnDestroy(): void {
		this.destroySbj$.next(true);
		this.destroySbj$.complete();
	}

	isSubmitDisabled(): boolean {
		return !this.form.controls.content.value.trim() || this.isSaving;
	}

	handleNgSubmit() {
		this.isSaving = true;
		this.errorMessage = EMPTY_STRING;
		this.form.disable();

		this.quotesService
			.saveQuote(this.form.value as QuoteWithoutServerGenFields)
			.pipe(
				catchError((errorMessage: string) => {
					this.isSaving = false;
					this.errorMessage = errorMessage;

					this.form.enable();

					return EMPTY;
				})
			)
			.subscribe(() => {
				this.isSaving = false;

				this.form.reset();
				this.form.enable();
				this.showSavedSbj$.next(true);
				this.save.emit();
				this.store.dispatch(loadQuotes({ page: 1, refetch: true }));
			});
	}
}
