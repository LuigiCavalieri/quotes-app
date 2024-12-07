import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { interceptors } from "./app/http-interceptors";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideEffects } from "@ngrx/effects";
import { AuthEffects } from "./app/store/effects/auth.effects";
import { QuotesEffects } from "./app/store/effects/quotes.effects";
import { provideStore } from "@ngrx/store";
import { reducers } from "./app/store";
import { logoutMetareducer } from "./app/store/reducers/auth.reducer";
import { provideRouter } from "@angular/router";
import { routes } from "./app/pages/routes";

bootstrapApplication(AppComponent, {
	providers: [
		provideAnimations(),
		provideHttpClient(withInterceptors(interceptors)),
		provideRouter(routes),
		provideStore(reducers, { metaReducers: [logoutMetareducer] }),
		provideEffects(AuthEffects, QuotesEffects),
	],
});
