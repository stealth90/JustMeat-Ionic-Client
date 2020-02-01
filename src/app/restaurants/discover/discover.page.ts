import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public restaurantsImage = [
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-5.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/216525',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-7.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/218587',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-8.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/207018',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-0.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/222920',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-3.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/219323'
  ];
  public loadedRestaurants: Restaurant[] =[];

  getRandomImage(): string {
    return this.restaurantsImage[Math.floor(Math.random() * this.restaurantsImage.length)];
  }
  constructor(private restaurantService: RestaurantsService, private menuCtrl: MenuController) {}

  async ngOnInit() {
    this.loadedRestaurants = await this.restaurantService.getRestaurants();
    this.loadedRestaurants.forEach( restaurant => restaurant.avatar = this.getRandomImage());
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  OnFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}

