import { EMAIL_REGEXP } from "../constants";

export const isEmail = (str: string) => {
	return EMAIL_REGEXP.test(String(str));
};
