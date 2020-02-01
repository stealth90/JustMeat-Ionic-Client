import { Component, OnInit } from '@angular/core';
import { Plate } from '../../restaurant.model';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.page.html',
  styleUrls: ['./new-restaurant.page.scss'],
})
export class NewRestaurantPage implements OnInit {

  plates: Plate[] = [{
    _id: undefined,
    name:"",
    price: undefined
  }];
  constructor() { }

  ngOnInit() {
  }
  addPlate() {
    this.plates.push({
      _id: undefined,
      name:"",
      price: undefined
    });
  }
  removePlate(i: number) {
    this.plates.splice(i, 1);
  }

}
