import { Component, OnInit } from '@angular/core';
import {PasswordRule} from '../models/changePassword.model'
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  passwordDetail: PasswordRule = {
    password: ''
  };
  token: string;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.token = params['token'];
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const password = form.value.password;
    const passwordConfirm = form.value.passwordConfirm;
    if ( password === passwordConfirm) {
      this.passwordDetail = {
        password
      };
      form.reset();
      this.loadingCtrl.create({
        keyboardClose: true, message: 'Check Password...'
      }).then( async loadingElm => {
        loadingElm.present();
        this.authService.changePassword(this.passwordDetail, this.token)
        .subscribe( () => {
          loadingElm.dismiss();
          this.navCtrl.navigateRoot('auth', {replaceUrl: true});
        // tslint:disable-next-line: variable-name
        });
      });
    } else {
      this.toastCtrl.create({
        message: 'An email with recovery password was sent to you',
        duration: 2000,

        color: 'primary'
      }).then( toast => {
        toast.present();
      });
    }
  }
}
