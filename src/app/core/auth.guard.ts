import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserRole } from './model/user-role';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const role = userService.getRole();
  const requiredRole: UserRole[] = route.data['requiredRole'];

  if (role && requiredRole.includes(role as UserRole)) {
    console.log('User is authorized');
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
