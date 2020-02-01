import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrderService {
    private _orders: Order[] = []
    private apiURL = 'http://localhost:3006/orders';

    constructor(private httpClient: HttpClient) {}

    getOrders() {
        return this.httpClient.get<Order[]>(`${this.apiURL}`).toPromise().then( orders => this._orders = orders );
    }
    get orders() {
        return [...this._orders];
    }
}