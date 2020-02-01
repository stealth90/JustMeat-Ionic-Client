import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  public loadedRestaurants: Restaurant[] = [];

  public restaurantsImage = [
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-5.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/216525',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-7.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/218587',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-8.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/207018',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-0.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/222920',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-3.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/219323'
  ];

  constructor(private restaurantService: RestaurantsService, private router: Router) { }

  async ngOnInit() {
    this.loadedRestaurants = await this.restaurantService.getRestaurants();
    this.loadedRestaurants.forEach( restaurant => restaurant.avatar = this.getRandomImage());
  }

  getRandomImage(): string {
    return this.restaurantsImage[Math.floor(Math.random() * this.restaurantsImage.length)];
  }

  onEdit(restaurantId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'restaurants' , 'tabs' , 'restaurant', 'edit' , restaurantId ])
  }
}
