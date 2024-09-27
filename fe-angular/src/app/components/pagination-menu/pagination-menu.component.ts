import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import appConfig from "../../config/appConfig";
import { EMPTY_STRING } from "../../constants";

@Component({
	selector: "app-pagination-menu",
	templateUrl: "./pagination-menu.component.html",
	styleUrl: "./pagination-menu.component.scss",
})
export class PaginationMenuComponent implements OnChanges {
	totalPages = 1;
	counterText = EMPTY_STRING;

	@Input({ required: true }) currentPage!: number;
	@Input({ required: true }) numOfQuotes!: number;
	@Output() onClick = new EventEmitter<number>();

	ngOnChanges(_changes: SimpleChanges): void {
		this.computeMetrics();
	}

	computeMetrics() {
		const firstItemInPageIndex = 1 + appConfig.quotesPerPage * (this.currentPage - 1);
		const maxLastItemInPageIndex = firstItemInPageIndex + appConfig.quotesPerPage - 1;
		const lastItemInPageIndex = Math.min(maxLastItemInPageIndex, this.numOfQuotes);

		this.totalPages = Math.ceil(this.numOfQuotes / appConfig.quotesPerPage);
		this.counterText = `${firstItemInPageIndex} - ${lastItemInPageIndex} / ${this.numOfQuotes}`;
	}

	handleOnClick(newPage: number) {
		if (newPage > this.currentPage) {
			newPage = Math.min(this.totalPages, newPage);
		} else {
			newPage = Math.max(1, newPage);
		}

		this.onClick.emit(newPage);
	}
}
