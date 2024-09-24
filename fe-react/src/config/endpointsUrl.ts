import { EMPTY_STRING } from "../constants";

const baseUrl = import.meta.env.VITE_API_BASE_URL || EMPTY_STRING;

export const endpointsUrl = {
	signup: `${baseUrl}/signup`,
	login: `${baseUrl}/login`,
	logout: `${baseUrl}/logout`,
	me: `${baseUrl}/me`,
	activateAccount: `${baseUrl}/activate-account`,
	quotes: `${baseUrl}/quotes`,
	randomQuote: `${baseUrl}/quotes/random`,
};
