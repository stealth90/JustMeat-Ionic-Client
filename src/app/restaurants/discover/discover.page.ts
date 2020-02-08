import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from '../restaurant.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  public loadedRestaurants: Restaurant[] = [];
  private restaurantsSub: Subscription;
  isLoading = false;

  constructor(private restaurantService: RestaurantsService, private menuCtrl: MenuController) {}

  ngOnInit() {
    this.restaurantsSub = this.restaurantService.restaurants.subscribe(restaurants => {
        this.loadedRestaurants = restaurants;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.restaurantService.fetchRestaurants().subscribe(() => {
      this.isLoading = false;
    });
  }


  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  OnFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.restaurantsSub) {
      this.restaurantsSub.unsubscribe();
    }
  }
}

