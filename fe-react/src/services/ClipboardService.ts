import appConfig from "../config/appConfig";
import { Quote } from "../types/quotes";

export const copy = async (quote: Quote) => {
	try {
		const author = quote.author || appConfig.authorDefaultName;

		await navigator?.clipboard.writeText(`${quote.content}\n( ${author} )`);

		return Promise.resolve(true);
	} catch {
		return Promise.reject(false);
	}
};
