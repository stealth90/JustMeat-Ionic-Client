import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class OrderService {
    newOrder: Order = {} ;
    private orderUrl = 'http://localhost:3006/orders';
    // tslint:disable-next-line: variable-name
    private _orders = new BehaviorSubject<Order[]>([]);

    get orders() {
        return this._orders.asObservable();
    }

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient) {}

    public getOrders(): Promise<Order[]> {
        return this.httpClient.get<Order[]>(`${this.orderUrl}`).toPromise();
    }

    createOrder(order: Order) {
        let generatedId: string;
        return this.httpClient
            .post<Order>(`${this.orderUrl}/create`, order)
            .pipe(
                switchMap(resData => {
                    generatedId = resData._id;
                    return this.orders;
                }),
                take(1),
                tap(orders => {
                    order._id = generatedId;
                    this._orders.next(orders.concat(order));
                })
            );
    }
}
