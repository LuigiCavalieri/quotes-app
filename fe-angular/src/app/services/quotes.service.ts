import { Injectable } from "@angular/core";
import { QuotesRequestQueryParams, QuotesResponseData, QuotesSearchFilters } from "../types/quotes";
import appConfig from "../config/appConfig";
import { endpointsUrl } from "../config/endpointsUrl";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class QuotesService {
	constructor(private http: HttpClient) {}

	getQuotes(page: number, { keywords }: QuotesSearchFilters) {
		const keywordsParamValue = keywords
			?.replace(/|/g, "")
			.split(" ")
			.map(value => value.trim())
			.join("|");

		const queryParams: QuotesRequestQueryParams = {
			page: String(page),
			itemsPerPage: String(appConfig.quotesPerPage),
			keywords: keywordsParamValue || "",
		};

		const paramsObj = new URLSearchParams(queryParams as unknown as Record<string, string>);
		const url = endpointsUrl.quotes + "?" + paramsObj.toString();

		return this.http.get<QuotesResponseData>(url);
	}
}
