import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user has a valid token
  if (authService.isLoggedIn()) {
    return true; // Access granted! Let the user see the Dashboard.
  }

  // If not logged in, redirect to the login page immediately
  console.warn('Unauthorized access attempt. Redirecting to Login.');
  router.navigate(['/login']);
  return false; // Access denied!
};