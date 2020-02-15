import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})

export class OrderService {
    newOrder: Order ;
    userId: string;
    private orderUrl = 'http://localhost:3006/orders';
    private getUserOrderUrl = 'http://localhost:3006/users';
    private getRestaurantOrderUrl = 'http://localhost:3006/restaurants';
    // tslint:disable-next-line: variable-name
    private _orders = new BehaviorSubject<Order[]>([]);

    get orders() {
        return this._orders.asObservable();
    }


    constructor(
        private authService: AuthService,
        private httpClient: HttpClient) {}

        fetchOrders() {
            const token = this.authService.getToken();
            const decoded = jwt_decode(token) as any;
            this.userId = decoded.subject;
            if (this.authService.isRestaurant()) {
                return this.httpClient.get<Order[]>(`${this.getRestaurantOrderUrl}/orders`)
                .pipe(
                    map(resData => {
                        const orders = [];
                        resData.forEach(element => {
                            orders.push(element);
                        });
                        return orders;
                    }),
                    tap(orders => {
                        this._orders.next(orders);
                    })
                );
            } else {
                return this.httpClient.get<Order[]>(`${this.getUserOrderUrl}/${this.userId}/orders`)
                .pipe(
                    map(resData => {
                        const orders = [];
                        resData.forEach(element => {
                            orders.push(element);
                        });
                        return orders;
                    }),
                    tap(orders => {
                        this._orders.next(orders);
                    })
                );
            }
        }

    getOrder(id: string) {
        return this.orders.pipe(
            take(1),
            map(orders => {
                return {...orders.find(o => o._id === id)};
            })
        );
    }

    createOrder(order: Order) {
        let generatedId: string;
        return this.httpClient
            .post<Order>(`${this.orderUrl}`, order)
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
    updateStatusOrder(orderId: string, statusOrder: string) {
        let updatedOrders: Order[];
        return this.orders
        .pipe(
            take(1),
            switchMap( orders => {
                const updatedOrderIndex = orders.findIndex(o => o._id === orderId);
                updatedOrders = [...orders];
                const oldOrder = updatedOrders[updatedOrderIndex];
                updatedOrders[updatedOrderIndex] = {
                    _id: oldOrder._id,
                    user: oldOrder.user,
                    restaurant: oldOrder.restaurant,
                    totalAmount: oldOrder.totalAmount,
                    date: oldOrder.date,
                    shippingAddress: oldOrder.shippingAddress,
                    orderItems : oldOrder.orderItems,
                    rating: oldOrder.rating,
                    statusOrder
                };
                return this.httpClient
                    .put(`${this.orderUrl}/${orderId}`,
                    {...updatedOrders[updatedOrderIndex]}
                    );
            }),
            tap(() => {
                this._orders.next(updatedOrders);
            })
        );
    }
    updateRatingOrder(orderId: string, rating: number) {
        let updatedOrders: Order[];
        return this.orders
        .pipe(
            take(1),
            switchMap( orders => {
                const updatedOrderIndex = orders.findIndex(o => o._id === orderId);
                updatedOrders = [...orders];
                const oldOrder = updatedOrders[updatedOrderIndex];
                updatedOrders[updatedOrderIndex] = {
                    _id: oldOrder._id,
                    user: oldOrder.user,
                    restaurant: oldOrder.restaurant,
                    totalAmount: oldOrder.totalAmount,
                    date: oldOrder.date,
                    shippingAddress: oldOrder.shippingAddress,
                    orderItems : oldOrder.orderItems,
                    rating,
                    statusOrder: oldOrder.statusOrder
                };
                return this.httpClient
                    .put(`${this.orderUrl}/${orderId}`,
                    {...updatedOrders[updatedOrderIndex]}
                    );
            }),
            tap(() => {
                this._orders.next(updatedOrders);
            })
        );
    }
}
