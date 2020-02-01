import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantOrdersPage } from './restaurant-orders.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantOrdersPageRoutingModule {}
