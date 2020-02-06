import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../restaurants.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Restaurant } from '../../restaurant.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.page.html',
  styleUrls: ['./edit-restaurant.page.scss'],
})
export class EditRestaurantPage implements OnInit, OnDestroy {
  restaurant: Restaurant;
  form: FormGroup;
  platesRestaurant = new FormArray([]);
  private restaurantSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.navigateBack('/restaurants/tabs/restaurant');
        return;
      }
      this.restaurantSub = this.restaurantService
        .getRestaurant(paramMap.get('restaurantId')).subscribe(restaurant => {
        this.restaurant = restaurant;
        restaurant.plates.forEach(plate => {
          (this.platesRestaurant as FormArray)
          .push(new FormGroup(
            {namePlate: new FormControl(plate.namePlate, {
              updateOn: 'change',
              validators: [Validators.required]
            }),
            pricePlate: new FormControl(plate.pricePlate, {
              updateOn: 'change',
              validators: [Validators.required, Validators.min(0.5)]
            })
          }));
        });
        this.form = new FormGroup({
          name: new FormControl(restaurant.name, {
          updateOn: 'change',
          validators: [Validators.required]
          }),
          address: new FormControl(restaurant.address, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          city: new FormControl(restaurant.city, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          email: new FormControl(restaurant.email, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email]
          }),
          typology: new FormControl(restaurant.typology, {
            updateOn: 'change',
            validators: [Validators.required, Validators.maxLength(15)]
          }),
          plates: this.platesRestaurant
        });
      });
    });
  }

  addPlate() {
    (this.form.controls.plates as FormArray).push(new FormGroup({
      namePlate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      pricePlate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0.5)]
      })
    }));
  }

  removePlate(i: number) {
    (this.form.controls.plates as FormArray).removeAt(i);
  }

  onEditRestaurant() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating restaurants...'
    }).then( loadingElm => {
      loadingElm.present();
      this.restaurantService.updateRestaurant(
        this.restaurant._id,
        this.form,
        this.formData
      ).subscribe(() => {
        loadingElm.dismiss();
        this.form.reset();
        this.router.navigate(['/restaurants/tabs/restaurant']);
      });
    });
  }

  get formData() {
    return (this.form.get('plates') as FormArray);
  }

  ngOnDestroy() {
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }
}
