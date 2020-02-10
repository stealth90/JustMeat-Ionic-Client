import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoginRule } from './models/loginInterface.model';
import { NewUser } from './models/userInterface.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  loginDetails: LoginRule = {
    username: '',
    password: ''
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
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alert: AlertController
    ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSignup() {
    this.authService.registerUser(this.signupDetails).subscribe(
      res => {
        this.alert.create({
          message: 'Successifull register',
          buttons: [{
            text: 'OK',
            role: 'Cancel',
            handler: () => { this.alert.dismiss(); }
          }]
        })
        .then( (alert) => {
          alert.present();
        });
        localStorage.setItem('token', res.response);
        this.router.navigate(['/auth']);
      },
      // tslint:disable-next-line: variable-name
      _err => {
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
      }
    );
  }

  onLogin() {
    this.isLoading = true;
    this.authService.loginUser(this.loginDetails).subscribe(
      res => {
        this.loadingCtrl.create({keyboardClose: true, message: 'Loggin in...'})
        .then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
          }, 1000);
        });
        localStorage.setItem('token', res.response);
        this.router.navigateByUrl(this.returnUrl);
      },
      // tslint:disable-next-line: variable-name
      _err => {
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
      }
    );
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.loginDetails = {
      username,
      password
    };
    if (this.isLogin) {
      console.log('Sono nel login');
      form.reset();
      this.onLogin();
    } else {
      console.log('Sono nella registrazione');
      const name = form.value.name;
      const surname = form.value.surname;
      const address = form.value.address;
      const phone = form.value.phone;
      const email = form.value.email;
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
      this.onSignup();
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
