import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AuthModule } from "./modules/auth.module";
import { AdminModule } from "./modules/admin.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/effects/auth.effects";
import { QuotesEffects } from "./store/effects/quotes.effects";
import { reducers } from "./store";
import { logoutMetareducer } from "./store/reducers/auth.reducer";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { interceptors } from "./http-interceptors";

import { AppComponent } from "./app.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

@NgModule({
	declarations: [AppComponent, NotFoundPageComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		AdminModule,
		HttpClientModule,
		StoreModule.forRoot(reducers, { metaReducers: [logoutMetareducer] }),
		EffectsModule.forRoot(AuthEffects, QuotesEffects),
	],
	providers: [provideAnimations(), provideHttpClient(withInterceptors(interceptors))],
	bootstrap: [AppComponent],
})
export class AppModule {}
