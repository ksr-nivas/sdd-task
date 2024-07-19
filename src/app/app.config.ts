import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/reducers/auth.reducer';
import { employeeReducer } from './store/reducers/employee.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { EmployeeEffects } from './store/effects/employee.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ auth: authReducer, employees: employeeReducer }),
    provideEffects([AuthEffects, EmployeeEffects]),
  ],
};
