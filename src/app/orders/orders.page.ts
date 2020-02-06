import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  loadedOrders: Order[];

  constructor(private ordersService: OrderService) { }

  async ngOnInit() {
    this.loadedOrders = await this.ordersService.getOrders();
  }

  onCancelOrder(orderId: string, slidingEl: IonItemSliding){
    slidingEl.close();
  }
}
