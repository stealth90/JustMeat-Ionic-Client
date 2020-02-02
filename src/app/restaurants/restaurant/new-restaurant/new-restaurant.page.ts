import { Component, OnInit } from '@angular/core';
import { Plate } from '../../restaurant.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.page.html',
  styleUrls: ['./new-restaurant.page.scss'],
})
export class NewRestaurantPage implements OnInit {
  form: FormGroup;
  plates: Plate[] = [];
  constructor() {}

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
        validators:[Validators.required, Validators.email]
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
    (this.form.controls.plates as FormArray).push(new FormControl(null));
  }
  removePlate(i: number) {
    (this.form.controls.plates as FormArray).removeAt(i);
  }

  onCreateRestaurant() {
    if(!this.form.valid) { return; }
    console.log(this.form.value);
  }

  get formData() {
    return <FormArray>this.form.get('plates');
  }

}
