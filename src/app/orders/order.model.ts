export interface OrderList {
    quantity: number;
    name: string;
    price: number;
}
export interface Order {
    _id: string;
    userId: string;
    restaurantId: string;
    date: string;
    shippingAddress: string;
    orderItems: Array<OrderList>;
    totalAmount: number;
    rating: number;
    statusOrder: boolean;
}
