import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
import { QuoteWithoutServerGenFields } from "../../types/quotes";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadQuotes } from "../../store/actions/quotes.actions";
import appConfig from "../../config/appConfig";

@Component({
	selector: "app-random-quote",
	templateUrl: "./random-quote.component.html",
	styleUrl: "./random-quote.component.scss",
})
export class RandomQuoteComponent implements OnInit {
	isLoading = false;
	isSaving = false;
	isError = false;
	isSaveError = false;
	showView = true;
	quote: QuoteWithoutServerGenFields | null = null;

	@Output() onSave = new EventEmitter();
	@Output() onClickDismiss = new EventEmitter();

	readonly destroySbj$ = new Subject<boolean>();
	readonly showSavedSbj$ = new BehaviorSubject(false);

	constructor(
		private quotesService: QuotesService,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.fetchRandomQuote();

		this.showSavedSbj$
			.pipe(
				filter(Boolean),
				switchMap(value => of(value).pipe(delay(appConfig.feedbackTimeout))),
				takeUntil(this.destroySbj$)
			)
			.subscribe(() => {
				this.showSavedSbj$.next(false);
				this.fetchRandomQuote();
			});
	}

	handleClickSave() {
		if (!this.quote) {
			return;
		}

		this.isSaving = true;
		this.isSaveError = false;

		this.quotesService
			.saveQuote(this.quote)
			.pipe(
				catchError(() => {
					this.isSaving = false;
					this.isSaveError = true;

					return EMPTY;
				})
			)
			.subscribe(() => {
				this.isSaving = false;

				this.showSavedSbj$.next(true);
				this.onSave.emit();
				this.store.dispatch(loadQuotes({ page: 1, refetch: true }));
			});
	}

	handleClickDismiss() {
		this.onClickDismiss.emit();
	}

	handleClickRefresh() {
		location.reload();
	}

	private fetchRandomQuote() {
		this.isLoading = true;
		this.isError = false;

		this.quotesService
			.getRandomQuote()
			.pipe(
				catchError(() => {
					this.isError = true;
					this.isLoading = false;

					return EMPTY;
				})
			)
			.subscribe(data => {
				this.isLoading = false;
				this.quote = data;
			});
	}
}
