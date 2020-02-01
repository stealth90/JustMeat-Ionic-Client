import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../restaurants/restaurant.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  @Input() selectedRestaurant: Restaurant;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onOrderRestaurant() {
    this.modalCtrl.dismiss({messagge: 'This is a dummy message!'}, 'confirm');
  }

}
