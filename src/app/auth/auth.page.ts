import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoginRule } from './models/loginInterface.model';
import { NewUser } from './models/userInterface.model';
import { RecoverRule } from './models/recoverInterface.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isAuth = true;
  isLogin = true;
  loginDetails: LoginRule = {
    email: '',
    password: ''
  };
  recoverDetails: RecoverRule = {
    email: ''
  };
  signupDetails: NewUser = {
    username: '',
    password: '',
    name: '',
    surname: '',
    address: '',
    phone: '',
    email: ''
  };
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  onSignup() {
    this.loadingCtrl.create({
      keyboardClose: true, message: 'Creating user...'
    }).then( async loadingElm => {
      loadingElm.present();
      this.authService.registerUser(this.signupDetails)
      .subscribe( () => {
        this.authService.isNewUser = false;
        this.onSwitchAuthMode();
        this.router.navigate(['/auth']);
        loadingElm.dismiss();
      },
      // tslint:disable-next-line: variable-name
      _err => {
        loadingElm.dismiss();
        this.alert.create({
          message: 'Invalid signup details',
          buttons: [{
            text: 'OK',
            role: 'Cancel',
            handler: () => { this.alert.dismiss(); }
          }]
        })
        .then( (alert) => {
          alert.present();
        });
      });
    });
  }
  onRecoveryPassword() {
    this.loadingCtrl.create({
      keyboardClose: true, message: 'Sending request...'
    }).then( async loadingElm => {
      loadingElm.present();
      this.authService.recoverPassword(this.recoverDetails)
      .subscribe( () => {
        this.toastCtrl.create({
          message: 'An email with recovery password was sent to you',
          duration: 2000,
          color: 'primary'
        }).then( toast => {
          loadingElm.dismiss();
          this.onSwitchAuthType();
          toast.present();
        });
      },
       // tslint:disable-next-line: variable-name
       _err => {
        loadingElm.dismiss();
        this.alert.create({
          message: 'Email was not found',
          buttons: [{
            text: 'Ok',
            role: 'Cancel',
            handler: () => {this.alert.dismiss(); }
          }]
        })
        .then( alert => {
          alert.present();
        });
      });
    });
  }

  onLogin() {
    this.loadingCtrl.create({
      keyboardClose: true, message: 'Loggin in...'
    }).then( async loadingElm => {
      loadingElm.present();
      this.authService.loginUser(this.loginDetails)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl(this.returnUrl, { replaceUrl: true });
        loadingElm.dismiss();
      // tslint:disable-next-line: variable-name
      }, _err => {
        loadingElm.dismiss();
        this.alert.create({
          message: 'Invalid login details',
          buttons: [{
            text: 'OK',
            role: 'Cancel',
            handler: () => { this.alert.dismiss(); }
          }]
        })
        .then( (alert) => {
          alert.present();
        });
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    if (!this.isAuth) {
      const email = form.value.email;
      this.recoverDetails = {
        email
      };
      form.reset();
      return this.onRecoveryPassword();
    } else if (this.isLogin) {
      const email = form.value.email;
      const password = form.value.password;
      this.loginDetails = {
        email,
        password
      };
      form.reset();
      return this.onLogin();
    } else if (!this.isLogin) {
      const email = form.value.email;
      const username = form.value.username;
      const name = form.value.name;
      const password = form.value.password;
      const surname = form.value.surname;
      const address = form.value.address;
      const phone = form.value.phone;
      this.signupDetails = {
        username,
        password,
        name,
        surname,
        address,
        phone,
        email
      };
      form.reset();
      return this.onSignup();
    }
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
  onSwitchAuthType() {
    this.isAuth = !this.isAuth;
  }
}
