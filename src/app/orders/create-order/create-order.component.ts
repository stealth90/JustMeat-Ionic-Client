import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Restaurant } from '../../restaurants/restaurant.model';
import { ModalController } from '@ionic/angular';
import { Order, OrderList } from '../order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  @Input() selectedRestaurant: Restaurant;
  newOrder: Order;
  plates: OrderList[] = [];
  constructor(private ordersService: OrderService, private modalCtrl: ModalController) { }

  order: Order;

  ngOnInit() {
    this.order = this.ordersService.newOrder;
  }

  addPlateToOrder(plate) {
    this.plates.push(plate);
    this.getTotalAmount();
  }
  getTotalAmount() {
    let totalAmount = 0;
    for (const item of this.plates) {
      totalAmount += item.price;
    }
    return totalAmount;
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onOrderPlate() {
    this.plates.forEach((plate) => {
      plate.quantity = this.plates.reduce((acc, item) => {
        if (item.name === plate.name) {
          return acc + 1;
        }
        return acc;
      }, 0 );
    });
    this.modalCtrl.dismiss({ orderingPlates: [...new Set(this.plates)]
    }, 'confirm');
  }

}
