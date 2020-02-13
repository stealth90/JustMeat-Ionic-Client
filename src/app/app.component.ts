import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';

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
    private navController: NavController  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe( state => {
        if (state || this.authService.loggedIn()) {
          return this.navController.navigateRoot(['restaurants/tabs/discover']);
        } else {
          return this.navController.navigateRoot('homepage');
        }
      });
    /*  if (this.authService.isNewUser) {
          this.router.navigateByUrl('/homepage');
      } else {
          this.router.navigateByUrl('/restaurant');
      } */
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
