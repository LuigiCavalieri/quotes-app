import { createContext } from "react";
import { User } from "../types/user";

export interface AuthContextInterface {
	isLoggedIn: boolean;
	isFetchingUser: boolean;
	user: User | null;
	doLogin: () => void;
	doLogout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	isLoggedIn: false,
	isFetchingUser: false,
	user: null,
	doLogin: () => undefined,
	doLogout: () => undefined,
});
