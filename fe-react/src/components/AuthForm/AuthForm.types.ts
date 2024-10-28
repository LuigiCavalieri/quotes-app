import { TextFieldInputTypes } from "../TextField/TextField.types";

export type AuthFormTypes = "signup" | "login";

interface AuthFormFieldInfo {
	value: string;
	isValid?: boolean;
	canBeValidated: boolean;
	type: TextFieldInputTypes;
	name: string;
	shortDescription: string;
	showError?: boolean;
	autoComplete: string;
}

export type AuthFormFieldsInfo = Record<string, AuthFormFieldInfo>;

export interface AuthFormValues {
	name?: string;
	email: string;
	password: string;
}

export interface AuthFormProps {
	type: AuthFormTypes;
	errorMessage: string | null;
	isLoading?: boolean;
	onSubmit: (formValues: AuthFormValues) => void;
}
