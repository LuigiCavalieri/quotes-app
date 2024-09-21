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
		url: "",
		routePath: `${appConfig.adminSlug}/quotes`,
		pageTitle: "Your Quotes",
	},
};

for (let key in _pageItems) {
	_pageItems[key as PageItemKey].url = "/" + _pageItems[key as PageItemKey].routePath;
}

export const pageItems = Object.freeze(_pageItems);
