import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as AuthActions from '../actions/auth.actions'
import { AuthService } from '../../modules/login/services/auth.service'
import { User } from '../../modules/login/models/user.model'

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action: {username: string, password: string}) =>
        this.authService.login().pipe(
          map((users: User[]) => {
            const loggedInUser = users.find( (user) => user.username === action.username );
            if(loggedInUser) {
              this.authService.setuser(loggedInUser);
            }
            return AuthActions.loginSuccess( { users, loggedInUser })}),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
