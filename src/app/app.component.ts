import { Component, OnInit } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navController: NavController,
    private socket: Socket,
    private toastCtrl: ToastController) {
    this.initializeApp();
  }

  async showToast(event) {
    const toast = await this.toastCtrl.create({
      message: event,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  ngOnInit() {
    this.socket.connect();
    this.socket.fromEvent('new-status').subscribe( (data: object & { event: string, status: any}) => {
      if (!this.authService.isRestaurant()) {
        this.showToast(`Status ${data.event} to ${data.status.status}`);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // tslint:disable-next-line: no-string-literal
      if (localStorage.getItem['firstTimeLoad'] || localStorage.getItem['firstTimeLoad'] !== 'TRUE') {
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem['firstTimeLoad'] = 'TRUE';
          this.navController.navigateRoot('homepage');
      } else {
        return this.navController.navigateRoot(['restaurants/tabs/discover']);
      }
      /* this.authService.authenticationState.subscribe( state => {
        if (!state || this.authService.loggedIn()) {
          return this.navController.navigateRoot(['restaurants/tabs/discover']);
        } else {
          return this.navController.navigateRoot('homepage');
        }
      }); */
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
