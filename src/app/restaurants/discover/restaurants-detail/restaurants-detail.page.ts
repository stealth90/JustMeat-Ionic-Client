import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';


import { Subscription } from 'rxjs';
import { Restaurant } from '../../restaurant.model';
import { RestaurantsService } from '../../restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './restaurants-detail.page.html',
  styleUrls: ['./restaurants-detail.page.scss'],
})
export class RestaurantsDetailPage implements OnInit, OnDestroy {

  public loadedRestaurants: Restaurant[] = [];
  private restaurantsSub: Subscription;
  private city: string;
  isLoading = false;

  constructor(
    private restaurantService: RestaurantsService,
    private menuCtrl: MenuController,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.restaurantsSub = this.restaurantService.restaurants.subscribe(restaurants => {
      this.loadedRestaurants = [...restaurants];
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    if (this.city !== '') {
      this.city = this.route.snapshot.paramMap.get('city').toLowerCase();
      this.restaurantService.fetchRestaurantsByCity(this.capitalizeFirstLetter(this.city)).subscribe(() => {
        this.isLoading = false;
      });
    } else {
      this.restaurantService.fetchRestaurants().subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  capitalizeFirstLetter(city: string) {
    return city.charAt(0).toUpperCase() + city.slice(1);
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


