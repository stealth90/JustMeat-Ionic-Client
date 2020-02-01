import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantPage } from './restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPage
  },
  {
    path: 'new-restaurant',
    loadChildren: () => import('./new-restaurant/new-restaurant.module').then( m => m.NewRestaurantPageModule)
  },
  {
    path: 'edit-restaurant',
    loadChildren: () => import('./edit-restaurant/edit-restaurant.module').then( m => m.EditRestaurantPageModule)
  },
  {
    path: 'restaurant-orders',
    loadChildren: () => import('./restaurant-orders/restaurant-orders.module').then( m => m.RestaurantOrdersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantPageRoutingModule {}
