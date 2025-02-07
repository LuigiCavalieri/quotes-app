import { ChangeEvent } from "react";

export type TextFieldInputTypes = "name" | "email" | "password" | "search";

export interface TextFieldProps {
	required?: boolean;
	type: TextFieldInputTypes;
	value?: string;
	placeholder?: string;
	name?: string;
	showError?: boolean;
	maxLength?: number;
	disabled?: boolean;
	validate?: boolean;
	autoComplete?: string;
	className?: string;
	outerClassName?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onValidated?: (validatedValue: string, event: ChangeEvent<HTMLInputElement>) => void;
	onError?: (event: ChangeEvent<HTMLInputElement>) => void;
}
