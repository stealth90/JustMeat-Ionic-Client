import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../../restaurants.service';
import { NavController } from '@ionic/angular';
import { Restaurant } from '../../restaurant.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.page.html',
  styleUrls: ['./edit-restaurant.page.scss'],
})
export class EditRestaurantPage implements OnInit {
  restaurant: Restaurant;
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('restaurantId')) {
        this.navCtrl.navigateBack('/restaurants/tabs/restaurant');
        return;
      }
      this.restaurant = this.restaurantService.getRestaurant(paramMap.get('restaurantId'));
      this.form = new FormGroup({
        name: new FormControl(this.restaurant.name, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        address: new FormControl(this.restaurant.address, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        city: new FormControl(this.restaurant.city, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        email: new FormControl(this.restaurant.email, {
          updateOn: 'blur',
          validators:[Validators.required, Validators.email]
        }),
        typology: new FormControl(this.restaurant.typology, {
          updateOn: 'change',
          validators: [Validators.required, Validators.maxLength(12)]
        }),
        plates: new FormArray([])
      });
      this.restaurant.plates.forEach(plate => {
        (this.form.controls.plates as FormArray)
        .push(new FormGroup(
          {namePlate: new FormControl(plate.name,{
            updateOn: 'change',
            validators: [Validators.required]
          }),
          pricePlate: new FormControl(plate.price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(0.5)]
          })
        }))
      })
    });
  }

  addPlate() {
    (this.form.controls.plates as FormArray).push(new FormGroup(
      {namePlate: new FormControl(null,{
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
    if(!this.form.valid) { return; }
    this.restaurant = {_id: this.restaurant._id, ...this.form.value};
  }

  get formData() {
    return <FormArray>this.form.get('plates');
  }
}
