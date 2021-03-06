import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BarRatingModule } from 'ngx-bar-rating';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomepageComponent } from './homepage/homepage.component';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
const config: SocketIoConfig = { url: 'https://just-meat-server.herokuapp.com', options: {} };

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],
  providers: [
    AuthGuard,
    AuthService,
    StatusBar,
    Deeplinks,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
