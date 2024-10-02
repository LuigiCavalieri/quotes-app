import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./reducers/auth.reducer";
import { quotesReducer, QuotesState } from "./reducers/quotes.reducer";

export interface AppState {
	authState: AuthState;
	quotesState: QuotesState;
}

export const reducers: ActionReducerMap<AppState> = {
	authState: authReducer,
	quotesState: quotesReducer,
};
