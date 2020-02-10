export interface OrderList {
    quantity: number;
    namePlate: string;
    pricePlate: number;
}
export interface Order {
    _id?: string;
    userId?: string;
    restaurantId?: string;
    date?: string;
    address?: string;
    orderItems?: Array<OrderList>;
    totalAmount?: number;
    rating?: number;
    statusOrder?: boolean;
}
