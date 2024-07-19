import { createReducer, on } from '@ngrx/store'
import * as AuthActions from '../actions/auth.actions'
import { User } from '../../modules/login/models/user.model'

export interface AuthState {
  users: User[] | null
  loggedInUser: User | null | undefined
  isAuthenticated: boolean
  error: string | null
}

export const initialState: AuthState = {
  users: null,
  loggedInUser: null,
  isAuthenticated: false,
  error: null
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { users, loggedInUser }) => ({
    ...state,
    users: users,
    loggedInUser: loggedInUser,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    users: null,
    loggedInUser: null,
    isAuthenticated: false,
    error
  }))
)
