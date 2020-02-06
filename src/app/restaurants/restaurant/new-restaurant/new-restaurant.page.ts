import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants.service';
import { Plate } from '../../restaurant.model';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.page.html',
  styleUrls: ['./new-restaurant.page.scss'],
})
export class NewRestaurantPage implements OnInit {
  form: FormGroup;
  plates: Plate[] = [];
  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router,
    private loaderCtrl: LoadingController) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      typology: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(12)]
      }),
      plates: new FormArray([
        new FormGroup({
          namePlate: new FormControl(null, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          pricePlate: new FormControl(null, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(0.5)]
          })
        })
      ])
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

  onCreateRestaurant() {
    if (!this.form.valid) { return; }
    this.loaderCtrl.create({
      message: 'Creating restaurant...'
    }).then(async loadingElm => {
      loadingElm.present();
      (await this.restaurantsService.newRestaurant(this.form.value)).subscribe(() => {
        loadingElm.dismiss();
        this.form.reset();
        this.router.navigate(['/restaurants/tabs/restaurant']);
      });
    });
  }

  get formData() {
    return this.form.get('plates') as FormArray;
  }

}
