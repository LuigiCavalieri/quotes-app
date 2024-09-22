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
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "../store/effects/auth.effects";
import { reducers } from "../store";
import { logoutMetareducer } from "../store/reducers/auth.reducer";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { AuthFormTitleComponent } from "./components/auth-form-title/auth-form-title.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { LoadingScreenComponent } from "./components/loading-screen/loading-screen.component";

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
		LoadingScreenComponent,
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
		StoreModule.forRoot(reducers, { metaReducers: [logoutMetareducer] }),
		EffectsModule.forRoot(AuthEffects),
	],
	providers: [provideAnimations()],
	bootstrap: [AppComponent],
})
export class AppModule {}
