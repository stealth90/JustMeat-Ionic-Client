import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewUser } from '../auth/models/userInterface.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoadingController, ToastController} from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user: NewUser;
  decoded: object & { isAdmin: boolean, isRestaurant: boolean, subject: string, email: string };
  userId: string;
  userEmail: string;
  token: string;
  form: FormGroup;
  isLoading = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private socket: Socket,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.token = this.authService.getToken();
    this.decoded = jwt_decode(this.token);
    this.userId = this.decoded.subject;
    this.userEmail = this.decoded.email;
    this.userSub = this.authService
      .getUser(this.userId)
      .subscribe( user => {
        this.user = user;
        this.form = new FormGroup({
          name: new FormControl(this.user.name, {
          updateOn: 'change',
          validators: [Validators.required]
          }),
          surname: new FormControl(this.user.surname, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          address: new FormControl(this.user.address, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          email: new FormControl(this.user.email, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email]
          }),
          phone: new FormControl(this.user.phone, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
        this.isLoading = false;
      });
    this.socket.fromEvent('new-status').subscribe( (data: object & { status: any}) => {
        if (!this.authService.isRestaurant()) {
          this.showToast(`Un ordine è cambiato a ${data.status.status}`);
        }
      });
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

  onEditProfile() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating user...'
    }).then( loadingElm => {
      loadingElm.present();
      this.authService.updateUser(this.user.username, this.userId, this.form)
        .subscribe(() => {
          loadingElm.dismiss();
          this.form.reset();
          this.router.navigate(['/restaurants/tabs/discover']);
        });
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
