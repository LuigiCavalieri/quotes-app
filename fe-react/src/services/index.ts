export const REQUEST = async <Data = unknown>(
	url: string,
	requestInit?: RequestInit
): Promise<Data> => {
	try {
		const response = await fetch(url, requestInit);

		if (response.status === 204) {
			return {} as Data;
		}

		const result = await response.json();

		if (!response.ok) {
			throw result;
		}

		return result;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const GET = <Data = unknown>(url: string) => {
	return REQUEST<Data>(url);
};

export const POST = <Payload = unknown, Data = unknown>(url: string, payload?: Payload) => {
	return REQUEST<Data>(url, {
		method: "POST",
		body: payload ? JSON.stringify(payload) : undefined,
	});
};

export const PATCH = <Payload = unknown, Data = unknown>(url: string, payload: Payload) => {
	return REQUEST<Data>(url, {
		method: "PATCH",
		body: JSON.stringify(payload),
	});
};
