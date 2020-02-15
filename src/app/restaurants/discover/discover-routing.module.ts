import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage
  },
  {
    path: 'restaurants-detail',
    loadChildren: () => import('./restaurants-detail/restaurants-detail.module').then( m => m.RestaurantsDetailPageModule)
  },
  {
    path: 'restaurants-detail/:city',
    loadChildren: () => import('./restaurants-detail/restaurants-detail.module').then( m => m.RestaurantsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}
