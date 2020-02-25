import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { Order, OrderList } from './order.model';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurants/restaurant.model';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
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
    private toastCtrl: ToastController,
    private socket: Socket,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.navigate(['/restaurants/tabs/discover']);
    this.isLoading = true;
    this.restaurantsSub = this.restaurantsService.restaurants.subscribe(restaurants => {
      this.loadedRestaurant = [...restaurants];
      this.ordersSub = this.ordersService.orders.subscribe(orders => {
        this.loadedOrders = [...orders];
      });
      this.isLoading = false;
    });
    this.socket.fromEvent('new-status').subscribe( (data: object & { event: string, status: any}) => {
      if (!this.authService.isRestaurant()) {
        this.showToast(`Status ${data.event} to ${data.status.status}`);
      }
    });
  }

  async showToast(event) {
    const toast = await this.toastCtrl.create({
      message: event,
      position: 'bottom',
      duration: 4000,
      color: 'primary'
    });
    toast.present();
  }
  isAdmin() {
    return this.authService.checkAdmin();
  }
  isRestaurant() {
    return this.authService.isRestaurant();
  }

  ionViewWillEnter() {
    this.router.navigate(['/restaurants/tabs/orders']);
    this.isLoading = true;
    this.restaurantsService.fetchRestaurants().subscribe(() => {
      this.ordersService.fetchOrders().subscribe(() => {
        this.isLoading = false;
      });
    });
  }
  doRefresh(event) {
    this.ordersService.fetchOrders().subscribe(() => {
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

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

  ionViewDidLeave() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
    if (this.restaurantsSub) {
      this.restaurantsSub.unsubscribe();
    }
  }
}
