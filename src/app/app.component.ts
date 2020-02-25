import { Component, OnInit } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AuthPage } from './auth/auth.page';
import { ResetPasswordPage } from './auth/reset-password/reset-password.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navController: NavController,
    private socket: Socket,
    private toastCtrl: ToastController,
    private deepLinks: Deeplinks,
    private router: Router) {
    this.initializeApp();
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

  ionViewWillEnter() {
    this.socket.connect();
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(1, () => {});
      // tslint:disable-next-line: no-string-literal
      this.deepLinks.routeWithNavController(this.navController, {
        '/auth/passwordUpdate' : ResetPasswordPage
      }).subscribe( match => {
        this.router.navigate(['auth/passwordUpdate'], match.$args);
      } , noMatch => {
        // tslint:disable-next-line: no-string-literal
        if (localStorage.getItem['firstTimeLoad'] || localStorage.getItem['firstTimeLoad'] !== 'TRUE') {
            // tslint:disable-next-line: no-string-literal
            localStorage.setItem['firstTimeLoad'] = 'TRUE';
            this.navController.navigateRoot('homepage');
        } else {
          return this.navController.navigateRoot('restaurants/tabs/discover');
        }
        /* this.authService.authenticationState.subscribe( state => {
          if (!state || this.authService.loggedIn()) {
            return this.navController.navigateRoot(['restaurants/tabs/discover']);
          } else {
            return this.navController.navigateRoot('homepage');
          }
        }); */
      });
    });
  }
  goToRestaurants() {
    return this.navController.navigateRoot(['restaurants/tabs/discover']);
  }

  goToOrders() {
    return this.navController.navigateRoot(['restaurants/tabs/order']);
  }

  onLogout() {
    this.authService.logoutUser();
    // this.socket.disconnect();
    return this.navController.navigateRoot(['/auth']);
  }
}
