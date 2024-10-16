import { endpointsUrl } from "../config/endpointsUrl";

const { fetch: originalFetch } = window;

const abortController = new AbortController();
const authUrls = [endpointsUrl.login, endpointsUrl.logout, endpointsUrl.signup, endpointsUrl.me];

export const initFetchInterceptor = (args: { onAuthError: (response?: Response) => void }) => {
	window.fetch = async (info: RequestInfo | URL, init?: RequestInit) => {
		const url = info.toString();
		const { headers } = init || {};

		const newInit: RequestInit = {
			...(init || {}),
			signal: abortController.signal,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		};

		try {
			const response = await originalFetch(info, newInit);

			if (!authUrls.includes(url) && [401, 403].includes(response.status)) {
				abortController.abort();
				args?.onAuthError(response);

				return Promise.reject();
			}

			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	};
};
