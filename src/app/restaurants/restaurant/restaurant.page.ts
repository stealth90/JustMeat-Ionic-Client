import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from '../restaurant.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit, OnDestroy {

  public loadedRestaurants: Restaurant[];
  isLoading = false;
  private restaurantsSub: Subscription;

  constructor(private restaurantService: RestaurantsService, private router: Router) { }

  ngOnInit() {
    this.restaurantsSub = this.restaurantService.restaurants.subscribe(restaurants => {
      this.loadedRestaurants = restaurants;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.restaurantService.fetchRestaurants().subscribe( () => {
      this.isLoading = false;
    });
  }

  onEdit(restaurantId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'restaurants' , 'tabs' , 'restaurant', 'edit' , restaurantId ]);
  }

  ngOnDestroy() {
    if (this.restaurantsSub) {
      this.restaurantsSub.unsubscribe();
    }
  }
}
