import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from '../reducers/auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const getUsers = createSelector(
  selectAuth,
  (auth) => auth.users
)

export const getLoggedInUser = createSelector(
  selectAuth,
  (auth) => auth.loggedInUser
)

export const authError = createSelector(
  selectAuth,
  (auth) => auth.error
)
