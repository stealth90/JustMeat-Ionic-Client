import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../order.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../order.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {
  order: Order = {
    _id: '',
    user: '',
    restaurant: '',
    date: '',
    shippingAddress: '',
    orderItems: [],
    totalAmount: 0,
    statusOrder: ''
  };
  statusList: Array<string> = ['NEW', 'ACCEPTED', 'SHIPPED', 'DELIVERED'];
  orderId: string;
  private orderSub: Subscription;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
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
        ).subscribe(() => {
          loadingElm.dismiss();
          this.navCtrl.navigateBack('/restaurants/tabs/orders');
        });
      });
    }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

}
