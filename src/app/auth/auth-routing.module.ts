import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'passwordUpdate',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
