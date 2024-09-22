import { createContext } from "react";
import { User } from "../types/user";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";

export interface AuthFunctionCallbacks {
	onError?: () => void;
	onSuccess?: () => void;
}

export type AuthFunction = (payload: AuthFormValues, callbacks?: AuthFunctionCallbacks) => void;

export interface AuthContextInterface {
	isLoggedIn: boolean;
	isQuering: boolean;
	isMutating: boolean;
	errorMessage: string;
	getUser: () => User | null;
	doLogin: AuthFunction;
	doSignup: AuthFunction;
	doLogout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	isLoggedIn: false,
	isQuering: false,
	isMutating: false,
	errorMessage: "",
	getUser: () => null,
	doLogin: () => undefined,
	doSignup: () => undefined,
	doLogout: () => undefined,
});
