import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'confirmOrder',
    component: ConfirmOrderComponent
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
