import { environment } from "../../environments/environment";

const baseUrl = environment.apiBaseUrl || "";

export const endpointsUrl = {
	signup: `${baseUrl}/signup`,
	login: `${baseUrl}/login`,
	logout: `${baseUrl}/logout`,
	me: `${baseUrl}/me`,
	activateAccount: `${baseUrl}/activate-account`,
	quotes: `${baseUrl}/quotes`,
	randomQuote: `${baseUrl}/quotes/random`,
};
