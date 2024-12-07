import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import appConfig from "../../config/appConfig";
import { EMPTY_STRING } from "../../constants";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	standalone: true,
	selector: "app-pagination-menu",
	templateUrl: "./pagination-menu.component.html",
	styleUrl: "./pagination-menu.component.scss",
	imports: [MatIconModule, MatButtonModule],
})
export class PaginationMenuComponent implements OnChanges {
	totalPages = 1;
	counterText = EMPTY_STRING;

	@Input({ required: true }) currentPage!: number;
	@Input({ required: true }) numOfQuotes!: number;
	@Output() clickPagination = new EventEmitter<number>();

	ngOnChanges(): void {
		this.computeMetrics();
	}

	private computeMetrics() {
		const firstItemInPageIndex = 1 + appConfig.quotesPerPage * (this.currentPage - 1);
		const maxLastItemInPageIndex = firstItemInPageIndex + appConfig.quotesPerPage - 1;
		const lastItemInPageIndex = Math.min(maxLastItemInPageIndex, this.numOfQuotes);

		this.totalPages = Math.ceil(this.numOfQuotes / appConfig.quotesPerPage);
		this.counterText = `${firstItemInPageIndex} - ${lastItemInPageIndex} / ${this.numOfQuotes}`;
	}

	handleClick(newPage: number) {
		if (newPage > this.currentPage) {
			newPage = Math.min(this.totalPages, newPage);
		} else {
			newPage = Math.max(1, newPage);
		}

		this.clickPagination.emit(newPage);
	}
}
