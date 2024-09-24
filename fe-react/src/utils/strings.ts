import { EMAIL_REGEXP } from "../constants";

/**
 * Converts a string's casing to title case.
 */
export const toTitleCase = (str: string) => {
	const words = String(str).split(" ");

	return words
		.map(word => {
			const firstChar = word.charAt(0).toUpperCase();
			const restOfStr = word.substring(1);

			return firstChar + restOfStr;
		})
		.join(" ");
};

export const isEmail = (str: string) => {
	return EMAIL_REGEXP.test(String(str));
};
