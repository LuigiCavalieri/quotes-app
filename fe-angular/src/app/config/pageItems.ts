import appConfig from "./appConfig";

export type PageItemKey = "admin" | "list" | "login" | "signup" | "activateAccount";

export interface PageItem {
	routePath: string;
	url: string;
	pageTitle: string;
}

const _pageItems: Readonly<Record<PageItemKey, PageItem>> = {
	login: {
		routePath: "",
		url: "",
		pageTitle: appConfig.appName,
	},
	signup: {
		url: "",
		routePath: "signup",
		pageTitle: "Create Your Account",
	},
	activateAccount: {
		url: "",
		routePath: "activate-account",
		pageTitle: "Your are Almost Done",
	},
	admin: {
		url: "",
		routePath: `${appConfig.adminSlug}`,
		pageTitle: "",
	},
	list: {
		url: `/${appConfig.adminSlug}/quotes`,
		routePath: `quotes`,
		pageTitle: "Your Quotes",
	},
};

for (const key in _pageItems) {
	const _key = key as PageItemKey;

	if (_pageItems[_key].url) {
		continue;
	}

	_pageItems[_key].url = "/" + _pageItems[_key].routePath;
}

export const pageItems = Object.freeze(_pageItems);
