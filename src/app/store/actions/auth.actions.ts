import { createAction, props } from '@ngrx/store';
import { User } from '../../modules/login/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ users: User[], loggedInUser: User | undefined | null }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

