import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { RestaurantsService } from '../../restaurants.service';
import { Restaurant } from '../../restaurant.model';
import { CreateOrderComponent } from '../../../orders/create-order/create-order.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit, OnDestroy {

  public restaurant: Restaurant;
  private restaurantSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.navigateBack('restaurants/tabs/discover');
        return;
      }
      this.restaurantSub = this.restaurantService.getRestaurant(paramMap.get('restaurantId')).subscribe(restaurant => {
        this.restaurant = restaurant;
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
