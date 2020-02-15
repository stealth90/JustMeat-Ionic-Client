import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsDetailPage } from './restaurants-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsDetailPage
  },
  {
    path: 'restaurant-detail/:restaurantId',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('../../discover/restaurant-detail/restaurant-detail.module').then( m => m.RestaurantDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsDetailPageRoutingModule {}
