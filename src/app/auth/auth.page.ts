import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoginRule } from './models/loginInterface.model';

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
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  onLogin() {
    this.isLoading = true;
    this.authService.loginUser(this.loginDetails).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.response);
        this.router.navigateByUrl(this.returnUrl);
      },
      err => {
        console.log(err);
      }
    );
    this.loadingCtrl.create({keyboardClose: true, message: 'Loggin in...'})
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/restaurants/tabs/discover');
      }, 1500);
    });
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
      form.reset();
      this.onLogin();
    } else {
      // Send a request to signup servers
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
