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
    private navController: NavController) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // tslint:disable-next-line: no-string-literal
      if (localStorage.getItem['firstTimeLoad'] !== 'TRUE') {
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem['firstTimeLoad'] = 'TRUE';
          this.navController.navigateRoot('homepage');
      }
      else{
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
