import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { TokenInterceptorService } from '../auth/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AllergyComponent } from './allergy/allergy.component';
import { SharedModule } from '../shared/shared.module';
import { RatingComponent } from '../rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  declarations: [OrdersPage, ConfirmOrderComponent, AllergyComponent],
  entryComponents: [AllergyComponent]
})
export class OrdersPageModule {}
