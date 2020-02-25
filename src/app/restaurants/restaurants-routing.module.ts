import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsPage } from './restaurants.page';
import { RestaurantGuard } from '../auth/restaurant.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/restaurants/tabs/discover',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: RestaurantsPage,
    children: [
      {
        path: '',
        redirectTo: '/restaurants/tabs/discover',
        pathMatch: 'full',
        canActivate : [RestaurantGuard]
      },
      {
        path : 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
          },
          {
            path: 'restaurants',
            loadChildren: () => import ('./discover/restaurants-detail/restaurants-detail.module').then( m => m.RestaurantsDetailPageModule)
          }
          /* {
            path: 'restaurant/:restaurantId',
            // tslint:disable-next-line: max-line-length
            loadChildren: () => import('./discover/restaurant-detail/restaurant-detail.module').then( m => m.RestaurantDetailPageModule)
          } */
        ],
        canActivate : [RestaurantGuard]
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
        children: [
          {
            path: '',
            loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule),
          },
          {
            path: 'details/:orderId',
            loadChildren: () => import('../orders/details/details.module').then( m => m.DetailsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsPageRoutingModule {}
