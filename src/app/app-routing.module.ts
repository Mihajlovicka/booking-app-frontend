import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { authGuard } from './core/auth.guard';
import { UserRole } from './core/model/user-role';
import { ProfileComponent } from './features/user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
    data: { requiredRole: [UserRole.GUEST, UserRole.HOST] },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'accommodations',
    loadChildren: () =>
      import('./features/accommodation/accommodation.module').then(
        (m) => m.AccommodationModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
