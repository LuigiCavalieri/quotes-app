import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { AuthFormTitleComponent } from "./components/auth-form-title/auth-form-title.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		AuthLayoutComponent,
		AuthFormComponent,
		SignupPageComponent,
		AuthFormTitleComponent,
		NotFoundPageComponent,
		AdminLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
	],
	providers: [provideAnimations()],
	bootstrap: [AppComponent],
})
export class AppModule {}
