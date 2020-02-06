import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant } from '../../restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestaurantsService } from '../../restaurants.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.page.html',
  styleUrls: ['./restaurant-orders.page.scss'],
})
export class RestaurantOrdersPage implements OnInit, OnDestroy {
  restaurant: Restaurant;
  private restaurantSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.navigateBack('/restaurants/tabs/restaurant');
        return;
      }
      this.restaurantSub = this.restaurantService.getRestaurant(paramMap.get('restaurantId')).subscribe(restaurant => {
        this.restaurant = restaurant;
      });
    });
  }

  ngOnDestroy() {
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }

}
