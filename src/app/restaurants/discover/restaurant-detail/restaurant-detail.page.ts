import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { RestaurantsService } from '../../restaurants.service';
import { Restaurant } from '../../restaurant.model';
import { CreateOrderComponent } from '../../../orders/create-order/create-order.component';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit, OnDestroy {

  public restaurant: Restaurant;
  isOrdenable = false;
  isLoading = false;
  private restaurantSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private orderService: OrderService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.navigateBack('restaurants/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.restaurantSub = this.restaurantService
        .getRestaurant(paramMap.get('restaurantId'))
        .subscribe(restaurant => {
          this.restaurant = restaurant;
          this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occurred!',
          message: 'Could not load restaurant.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/restaurants/tabs/discover']);
              }
            }
          ]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  onOrderRestaurant() {
    // this.router.navigateByUrl('/restaurants/tabs/discover');
    // this.navCtrl.navigateBack('/restaurants/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Order Now',
          handler: () => {
            this.openOrderModal('select');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetElm => {
      actionSheetElm.present();
    });
  }
  openOrderModal(mode: 'select') {
    this.modalCtrl
      .create({
        component: CreateOrderComponent,
        componentProps: {selectedRestaurant: this.restaurant}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Ordered');
        }
      });
  }

  ngOnDestroy() {
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }
}
