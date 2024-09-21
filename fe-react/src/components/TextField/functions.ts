import appConfig from "../../config/appConfig";
import { isEmail } from "../../utils/strings";
import { TextFieldInputTypes } from "./TextField.types";

export const validateInput = (
	inputType: TextFieldInputTypes,
	value: string,
	errorCallback: (errorMsg: string) => void
): boolean => {
	let regex;
	let errorMsg = "";

	switch (inputType) {
		case "name":
			regex = new RegExp(`[^${appConfig.authorNameAllowedCharsRegex}]`, "iu");

			if (regex.test(value)) {
				errorMsg = "Cannot include special characters.";
			}
			break;

		case "email":
			if (!isEmail(value)) {
				errorMsg = "Please, enter a valid email address.";
			}
			break;

		case "password":
			regex = new RegExp(
				`^[a-z0-9${appConfig.passwordSpecialChars}]{${appConfig.passwordMinLength},}$`,
				"i"
			);

			if (!regex.test(value)) {
				errorMsg = "Invalid password.";
			}
			break;
	}

	if (errorMsg) {
		errorCallback(errorMsg);

		return false;
	}

	return true;
};
