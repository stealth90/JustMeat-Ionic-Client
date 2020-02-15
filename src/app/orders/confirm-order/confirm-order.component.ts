import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Plate } from 'src/app/restaurants/restaurant.model';
import { Order, OrderList } from '../order.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { AllergyComponent } from '../allergy/allergy.component';
import { OrderService } from '../order.service';
import { NewUser } from 'src/app/auth/models/userInterface.model';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {
  myData: OrderList[] = [];
  newOrder: Order;
  user: NewUser;
  userSub: Subscription;
  userId: string;
  idRestaurant: string;
  token: string;
  isLoading = false;
  decoded: object & { isAdmin: boolean, isRestaurant: boolean, subject: string, email: string };
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private orderService: OrderService,
    private authService: AuthService,
    private loaderCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.myData = [...this.router.getCurrentNavigation().extras.state.plates];
    this.idRestaurant = this.router.getCurrentNavigation().extras.state.restaurant;
    this.token = this.authService.getToken();
    this.decoded = jwt_decode(this.token);
    this.userId = this.decoded.subject;
    this.userSub=  this.authService.getUser(this.userId)
      .subscribe( user => {
        this.user = user;
      });
  }

  getTotalOrderItems() {
    let items = 0;
    this.myData.forEach( plate => {
      items += plate.quantity;
    });
    return items;
  }

  getTotalPriceOrder() {
    let price = 0;
    this.myData.forEach( plate => {
      price += (plate.price * plate.quantity);
    })
    return price;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AllergyComponent,
      cssClass: 'setting-modal',
      backdropDismiss: false,
      showBackdrop: true
    });
 
    modal.onDidDismiss().then(() => {
      });
    return await modal.present();
    }
    createOrder(){
      this.loaderCtrl.create({
        message: 'Creating order...'
      }).then(async loadingElm => {
        loadingElm.present();
        this.newOrder = {
          user: this.userId,
          restaurant: this.idRestaurant,
          shippingAddress: this.user.address,
          orderItems: this.myData,
          totalAmount: this.getTotalPriceOrder(),
          rating: null,
          statusOrder: 'NEW'
        };
        this.orderService
          .createOrder(
            this.newOrder
          ).subscribe(() => {
            loadingElm.dismiss();
            this.router.navigate(['/restaurants/tabs/discover']);
          });
      });

    }

    ngOnDestroy() {
      if (this.userSub) {
        this.userSub.unsubscribe();
      }
    }

}
