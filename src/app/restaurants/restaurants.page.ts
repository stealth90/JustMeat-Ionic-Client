import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private socket: Socket,
    private toastCtrl: ToastController) { }

  async showToast(event) {
    const toast = await this.toastCtrl.create({
      message: event,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  ngOnInit() {
    this.socket.fromEvent('new-status').subscribe( (data: object & { event: string, status: any}) => {
      if (!this.authService.isRestaurant()) {
        this.showToast(`One of your order ${data.event} to ${data.status.status}`);
      }
    });
  }

  isAdmin() {
    return this.authService.checkAdmin();
  }
  isRestaurant() {
    return this.authService.isRestaurant();
  }

}
