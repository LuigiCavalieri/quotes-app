import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { pageItems } from "./config/pageItems";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
	{
		path: pageItems.login.routePath,
		component: LoginPageComponent,
	},
	{
		path: pageItems.signup.routePath,
		component: SignupPageComponent,
	},
	{
		path: "**",
		component: NotFoundPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
