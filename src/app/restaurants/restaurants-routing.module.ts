import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsPage } from './restaurants.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: RestaurantsPage,
    children: [
      {
        path : 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
          },
          {
            path: ':restaurantId',
            // tslint:disable-next-line: max-line-length
            loadChildren: () => import('./discover/restaurant-detail/restaurant-detail.module').then( m => m.RestaurantDetailPageModule)
          }
        ]
      },
      {
        path: 'restaurant',
        children: [
          {
            path: '',
            loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./restaurant/new-restaurant/new-restaurant.module').then( m => m.NewRestaurantPageModule)
          },
          {
            path: 'edit/:restaurantId',
            loadChildren: () => import('./restaurant/edit-restaurant/edit-restaurant.module').then( m => m.EditRestaurantPageModule)
          }
        ]
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule),
      },
      {
        path: '',
        redirectTo: '/restaurants/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/restaurants/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsPageRoutingModule {}
