import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { pageItems } from "../config/pageItems";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import appConfig from "../config/appConfig";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { ActivateAccountPageComponent } from "./activate-account-page/activate-account-page.component";
import { ListPageComponent } from "./list-page/list-page.component";

const pageTitleEnd = ` | ${appConfig.appName}`;

export const routes: Routes = [
	{
		path: pageItems.login.routePath,
		component: LoginPageComponent,
		title: appConfig.appName,
	},
	{
		path: pageItems.signup.routePath,
		component: SignupPageComponent,
		title: pageItems.signup.pageTitle + pageTitleEnd,
	},
	{
		path: pageItems.activateAccount.routePath,
		component: ActivateAccountPageComponent,
		title: pageItems.activateAccount.pageTitle + pageTitleEnd,
	},
	{
		path: pageItems.admin.routePath,
		component: AdminLayoutComponent,
		children: [
			{
				path: pageItems.list.routePath,
				component: ListPageComponent,
				title: pageItems.list.pageTitle + pageTitleEnd,
			},
		],
	},
	{
		path: "**",
		component: NotFoundPageComponent,
		title: "404" + pageTitleEnd,
	},
];
