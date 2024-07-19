import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducers/auth.reducer';
// import { login, loginFailure, loginSuccess } from '../../store/actions/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as AuthActions from '../../store/actions/auth.actions';
import { User } from './models/user.model';
import { authError, getUsers } from '../../store/selectors/auth.selector';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  readonly store = inject(Store<AuthState>);

  router: Router = inject(Router);
  loginForm: FormGroup = new FormGroup({});

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.store.dispatch(
      AuthActions.login({
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      })
    );

    this.store.select(getUsers).subscribe((users) => {
      if(!users) return;
      const user = users?.find((user: User) => user.username === this.loginForm.value.userName);
      if (user) {
        this.router.navigate(['/employee']);
      } else {
        this.router.navigate(['/login']);
        this._snackBar.open('Invalid username or password', '', {
          duration: 5000
        });
      }
    });
    this.store.select(authError).subscribe((error) => {
      if(error) {
        this.router.navigate(['/login']);
        this._snackBar.open('Invalid username or password', '', {
          duration: 5000
        });
      }
    });
  }
}
