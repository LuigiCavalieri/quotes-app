import { createSelector } from "@ngrx/store";
import { AppState } from "..";

const selectAuthState = (state: AppState) => state.authState;

export const selectIsLoggedIn = createSelector(selectAuthState, authState => authState.isLoggedIn);
export const selectUser = createSelector(selectAuthState, authState => authState.user);
export const selectIsFetchingUser = createSelector(
	selectAuthState,
	authState => authState.isFetchingUser
);
