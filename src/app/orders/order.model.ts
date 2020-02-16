export interface OrderList {
    quantity?: number;
    name?: string;
    price?: number;
}
export interface Order {
    _id?: string;
    user?: string;
    restaurant?: string;
    date?: string;
<<<<<<< HEAD
    shippingAddress?: string;
    orderItems?: Array<OrderList>;
    totalAmount?: number;
    statusOrder?: string;
    rating?: number;
=======
    shippingAddress: string;
    orderItems: Array<OrderList>;
    totalAmount: number;
    statusOrder: string;
    rating: number;
>>>>>>> 2d96c525b9ff2661e3c9812806177375793e5c42
}
