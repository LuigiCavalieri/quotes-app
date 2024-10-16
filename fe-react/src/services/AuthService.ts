import { POST, GET, PATCH } from ".";
import { AuthFormValues } from "../components/AuthForm/AuthForm.types";
import { endpointsUrl } from "../config/endpointsUrl";
import { User } from "../types/user";

export const login = (payload: AuthFormValues) => {
	return POST(endpointsUrl.login, payload);
};

export const signup = (payload: AuthFormValues) => {
	return POST(endpointsUrl.signup, payload);
};

export const logout = () => {
	return POST(endpointsUrl.logout);
};

export const me = () => {
	return GET<User>(endpointsUrl.me);
};

export const activateAccount = (email: string, activationToken: string) => {
	return PATCH(endpointsUrl.activateAccount, { email, activationToken });
};
