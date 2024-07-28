import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/login/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const loggedinUser = authService.isLoggedInUser();
    if (!loggedinUser) {
        router.navigate(['/login']);
        return false;
    }

    return authService.isLoggedInUser();
};