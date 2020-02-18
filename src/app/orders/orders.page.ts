import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderList } from './order.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurants/restaurant.model';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  public loadedOrders: Order[] = [];
  public loadedRestaurant: Restaurant[] = [];
  private ordersSub: Subscription;
  private restaurantsSub: Subscription;
  order: Order = {};
  isLoading = false;

  constructor(
    private ordersService: OrderService,
    private restaurantsService: RestaurantsService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.restaurantsSub = this.restaurantsService.restaurants.subscribe(restaurants => {
      this.loadedRestaurant = [...restaurants];
      this.ordersSub = this.ordersService.orders.subscribe(orders => {
        this.loadedOrders = [...orders];
      });
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.restaurantsService.fetchRestaurants().subscribe(() => {
      this.ordersService.fetchOrders().subscribe(() => {
        this.isLoading = false;
      });
    });
  }
<<<<<<< HEAD
  doRefresh(event) {
    this.ordersService.fetchOrders().subscribe(() =>{
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    });
  }
=======

  onLogout() {
    this.authService.logoutUser();
  }

>>>>>>> f8955330a2107504cb760f697cc107082c9a5f4e
  getRestaurantName(id: string) {
    for (const rest of this.loadedRestaurant) {
      if (rest._id === id) { return rest.name; }
    }
  }
  getRestaurantAvatar(id: string) {
    for (const rest of this.loadedRestaurant) {
      if (rest._id === id) {return rest.avatar; }
    }
  }

  getCountPlates(id: string) {
    let count = 0;
    for (const order of this.loadedOrders) {
      if (order._id === id) {
        for ( const plate of order.orderItems) {
          count += plate.quantity;
        }
      }
    }
    return count;
  }

  getPlates(id: string) {
    let plates = '';
    for (const order of this.loadedOrders) {
      if ( order._id === id) {
        for (const plate of order.orderItems) {
          plates += `${plate.quantity} x ${plate.name},`;
        }
      }
    }
    return plates.slice(0, -1);
  }

  onClickDetails(orderId: string) {
    this.router.navigate(['/', 'restaurants', 'tabs', 'orders', 'details', orderId]);
  }

  onCancelOrder(orderId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
    if (this.restaurantsSub) {
      this.restaurantsSub.unsubscribe();
    }
  }
}
