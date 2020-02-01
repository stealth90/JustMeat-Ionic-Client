import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  restaurants: Restaurant[] = [];
  
  private apiURL = 'http://localhost:3006/restaurants';

  constructor(private httpClient: HttpClient) {}

  getRestaurants() {
    return this.httpClient.get<Restaurant[]>(`${this.apiURL}`).toPromise().then( restaurants => this.restaurants = restaurants );
  }
  getRestaurant(id: string) {
    return {...this.restaurants.find(r => r._id === id)};
  }
}
