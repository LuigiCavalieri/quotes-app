import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Quote } from "../../types/quotes";
import { CopyStatus, EMPTY_STRING } from "../../constants";
import appConfig from "../../config/appConfig";

@Component({
	selector: "app-quotes-list-item",
	templateUrl: "./quotes-list-item.component.html",
	styleUrl: "./quotes-list-item.component.scss",
})
export class QuotesListItemComponent {
	@Input({ required: true }) quote = {} as Quote;
	@Input({ required: true }) itemIndex = 1;
	@Input() class = EMPTY_STRING;
	@Input() copyStatus: CopyStatus | null = null;
	@Output() clickCopy = new EventEmitter<Quote>();

	readonly copyStati = CopyStatus;
	readonly authorDefaultName = appConfig.authorDefaultName;

	handlerClickCopy() {
		this.clickCopy.emit(this.quote);
	}

	isCopyStatus(status: CopyStatus) {
		if (this.copyStatus === null) {
			return status === this.copyStati.waiting;
		}

		return status === this.copyStatus;
	}
}
