import {OnInit, OnDestroy, Component } from '@angular/core';
import { Order } from '../order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../order.service';
import { LoadingController, NavController, ToastController} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Restaurant } from 'src/app/restaurants/restaurant.model';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {
  public order: Order;
  public loadedRestaurant: Restaurant [] = [];
  private orderSub: Subscription;
  private restaurantSub: Subscription;
  statusList: Array<string> = ['NEW', 'ACCEPTED', 'SHIPPED', 'DELIVERED'];
  orderId: string;
  isLoading = false;
  rating: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private restaurantsService: RestaurantsService,
    private socket: Socket,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('orderId')) {
        this.navCtrl.navigateBack('/restaurants/tabs/orders');
        return;
      }
      this.orderId = paramMap.get('orderId');
      this.isLoading = true;
      this.orderSub = this.orderService
        .getOrder(paramMap.get('orderId')).subscribe((order: Order) => {
          this.order = order;
          this.restaurantSub = this.restaurantsService.restaurants.subscribe(restaurants => {
            this.loadedRestaurant = [...restaurants];
            this.isLoading = false;
          });
        });
      });
  }

  statusInformation(status: string) {
    let index: number ;
    this.statusList.find((stat: string, i: number) => {
      if (status === stat) {
        index = i;
        return status === stat;
      }
    });
    return this.statusList[index + 1];
  }

  onStatusChange(status: string) {
    this.loadingCtrl.create({
      message: 'Updating status...'
    }).then( loadingElm => {
      loadingElm.present();
      this.orderService.updateStatusOrder(
        this.order._id,
        status
      ).subscribe((stat: string) => {
        loadingElm.dismiss();
        this.socket.emit('status-changed', stat);
      });
    });
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

  submitRating(id: string, restaurantId: string, rating: number) {
    this.loadingCtrl.create({
      message: 'Update rating...'
    }).then(async loadingElm => {
      loadingElm.present();
      this.orderService.updateRatingOrder(id, rating).subscribe(() => {
        this.restaurantsService.updateRestaurantRating(restaurantId).subscribe(() => {
          loadingElm.dismiss();
          this.router.navigate(['/restaurants/tabs/discover']);
        });
      });
    });
  }


  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
