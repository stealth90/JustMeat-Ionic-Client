import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRestaurantPage } from './new-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: NewRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRestaurantPageRoutingModule {}
