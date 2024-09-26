import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { pageItems } from "../config/pageItems";
import { SignupPageComponent } from "../pages/signup-page/signup-page.component";
import { NotFoundPageComponent } from "../pages/not-found-page/not-found-page.component";
import appConfig from "../config/appConfig";
import { AdminLayoutComponent } from "../components/admin-layout/admin-layout.component";
import { ActivateAccountPageComponent } from "../pages/activate-account-page/activate-account-page.component";

const pageTitleEnd = ` | ${appConfig.appName}`;
const routes: Routes = [
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
		children: [],
	},
	{
		path: "**",
		component: NotFoundPageComponent,
		title: "404" + pageTitleEnd,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
