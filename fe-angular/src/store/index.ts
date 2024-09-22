import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./reducers/auth.reducer";

export interface AppState {
	authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
	authState: authReducer,
};
