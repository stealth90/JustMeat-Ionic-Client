import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { RestaurantsService } from '../../restaurants.service';
import { Restaurant } from '../../restaurant.model';
import { CreateOrderComponent } from '../../../orders/create-order/create-order.component';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit {

  public restaurantsImage = [
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-5.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/216525',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-7.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/218587',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-8.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/207018',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-0.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/222920',
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-3.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/219323'
  ]
  public restaurant: Restaurant ;
  getRandomImage(): string {
    return this.restaurantsImage[Math.floor(Math.random() * this.restaurantsImage.length)];
  }
  constructor(
    private navCtrl: NavController,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('restaurantId')){
        this.navCtrl.navigateBack('restaurants/tabs/discover');
        return;
      }
      this.restaurant = this.restaurantService.getRestaurant(paramMap.get('restaurantId'));
    })
  }

  onOrderRestaurant(){
    //this.router.navigateByUrl('/restaurants/tabs/discover');
    //this.navCtrl.navigateBack('/restaurants/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openOrderModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openOrderModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetElm =>{
      actionSheetElm.present();
    });
  }
  openOrderModal(mode: 'select' | 'random') {
    console.log(mode);
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
        if(resultData.role === 'confirm') {
          console.log('Ordered');
        }
      })
  }
}
