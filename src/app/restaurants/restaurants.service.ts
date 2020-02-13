import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap, delay } from 'rxjs/operators';

import { Restaurant, Plate} from './restaurant.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  // tslint:disable-next-line: variable-name
  public _restaurants = new BehaviorSubject<Restaurant[]>([]);
  public restaurantsImage = [
    // tslint:disable-next-line: max-line-length
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-5.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/216525',
    // tslint:disable-next-line: max-line-length
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-7.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/218587',
    // tslint:disable-next-line: max-line-length
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-8.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/207018',
    // tslint:disable-next-line: max-line-length
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-0.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/222920',
    // tslint:disable-next-line: max-line-length
    'https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,d_it:cuisines:pizza-3.jpg,f_auto,h_161,q_auto,w_436/v1/it/restaurants/219323'
  ];

  private apiURL = 'http://localhost:3006/restaurants';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  fetchRestaurants() {
    return this.httpClient
      .get<Restaurant[]>(`${this.apiURL}`)
      .pipe(
        map(resData => {
          const restaurants = [];
          resData.forEach(element => {
            if (!element.avatar) {
              element.avatar = this.getRandomImage();
            }
            restaurants.push(element);
          });
          return restaurants;
        }),
        tap(restaurants => {
          this._restaurants.next(restaurants);
        })
      );
  }

  getRandomImage(): string {
    return this.restaurantsImage[Math.floor(Math.random() * this.restaurantsImage.length)];
  }

  get restaurants() {
    return this._restaurants.asObservable();
  }

  getRestaurant(id: string) {
    return this.restaurants.pipe(
      take(1),
      map(restaurants => {
        return {...restaurants.find(r => r._id === id)};
    }));
  }

  newRestaurant(name: string, address: string, city: string, email: string, typology: string, plates: Plate[]) {
    let generatedId: string;
    const newRestaurant: Restaurant = {
      _id : null,
      name,
      address,
      city,
      email,
      typology,
      plates,
      rating : null,
    };
    return this.httpClient
      .post<Restaurant>(`${this.apiURL}`, newRestaurant)
      .pipe(
        switchMap(resData => {
          generatedId = resData._id;
          return this.restaurants;
        }),
        take(1),
        delay(1000),
        tap(restaurants => {
          newRestaurant._id = generatedId;
          this._restaurants.next(restaurants.concat(newRestaurant));
        })
      );
  }

  updateRestaurant(restaurantId: string, form: FormGroup , plates: FormArray) {
    let updatedRestaurants: Restaurant[];
    const newPlates: Plate[] = [];
    plates.controls.forEach(plate => {
      newPlates.push(plate.value);
    });
    return this.restaurants
    .pipe(
      take(1),
      switchMap( restaurants => {
        const updatedRestaurantIndex = restaurants.findIndex(r => r._id === restaurantId);
        updatedRestaurants = [...restaurants];
        const oldRestaurant = updatedRestaurants[updatedRestaurantIndex];
        updatedRestaurants[updatedRestaurantIndex] = {
          _id: oldRestaurant._id,
          name: form.value.name,
          address: form.value.address,
          city: form.value.city,
          email: form.value.email,
          rating: oldRestaurant.rating,
          avatar: oldRestaurant.avatar,
          typology: form.value.typology,
          plates : newPlates,
        };
        return this.httpClient.put
          (`${this.apiURL}/${restaurantId}`,
          {...updatedRestaurants[updatedRestaurantIndex]}
        );
      }),
      tap(() => {
        this._restaurants.next(updatedRestaurants);
      })
    );
  }

}
