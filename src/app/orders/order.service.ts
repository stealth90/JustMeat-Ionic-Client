import { Injectable } from '@angular/core';
import { Order, OrderList } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrderService {
    newOrder: Order = {} ;
    private orderUrl = 'http://localhost:3006/orders';

    constructor(private httpClient: HttpClient) {}

    public getOrders(): Promise<Order[]> {
        return this.httpClient.get<Order[]>(`${this.orderUrl}`).toPromise();
    }

    public async createOrder(order: Order): Promise<Order> {
        return await this.httpClient.post<Order>(`${this.orderUrl}/create`, order).toPromise();
    }
}