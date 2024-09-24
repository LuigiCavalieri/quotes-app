import { createSelector } from "@ngrx/store";
import { AppState } from "..";

const selectAuth = (state: AppState) => state.authState;

export const selectIsLoggedIn = createSelector(selectAuth, authState => authState.isLoggedIn);
export const selectUser = createSelector(selectAuth, authState => authState.user);
export const selectIsFetchingUser = createSelector(
	selectAuth,
	authState => authState.isFetchingUser
);
