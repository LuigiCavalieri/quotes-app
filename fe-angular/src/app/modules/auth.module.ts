import { NgModule } from "@angular/core";
import { SharedModule } from "./shared.module";

import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { AuthLayoutComponent } from "../components/auth-layout/auth-layout.component";
import { AuthFormComponent } from "../components/auth-form/auth-form.component";
import { SignupPageComponent } from "../pages/signup-page/signup-page.component";
import { AuthFormTitleComponent } from "../components/auth-form-title/auth-form-title.component";
import { ActivateAccountPageComponent } from "../pages/activate-account-page/activate-account-page.component";

@NgModule({
	declarations: [
		LoginPageComponent,
		AuthLayoutComponent,
		AuthFormComponent,
		SignupPageComponent,
		AuthFormTitleComponent,
		ActivateAccountPageComponent,
	],
	imports: [SharedModule],
})
export class AuthModule {}
