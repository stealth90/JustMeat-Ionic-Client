import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  loadedOrders: Order[] = [];
  private ordersSub: Subscription;
  isLoading = false;

  constructor(private ordersService: OrderService) { }

  ngOnInit() {
    this.ordersSub = this.ordersService.orders.subscribe(orders => {
      this.loadedOrders = [...orders];
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.ordersService.fetchOrders().subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancelOrder(orderId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
  }
}
