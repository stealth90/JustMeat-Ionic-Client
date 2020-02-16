import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderList } from './order.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  loadedOrders: Order[] = [];
  order: Order = {
    _id: '',
    user: '',
    restaurant: '',
    date: '',
    shippingAddress: '',
    orderItems: [],
    totalAmount: 0,
    statusOrder: '',
    rating: 0
  };
  private ordersSub: Subscription;
  isLoading = false;

  constructor(private ordersService: OrderService, private router: Router) { }

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

  onClickDetails(orderId: string) {
    this.router.navigate(['/', 'restaurants', 'tabs', 'orders', 'details', orderId]);
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
