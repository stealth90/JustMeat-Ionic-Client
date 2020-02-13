export interface OrderList {
    quantity: number;
    name: string;
    price: number;
}
export interface Order {
    _id: string;
    user: string;
    restaurant: string;
    date: string;
    shippingAddress: string;
    orderItems: Array<OrderList>;
    totalAmount: number;
    statusOrder: string;
}
