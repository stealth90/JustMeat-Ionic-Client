export interface Restaurant {
    _id: string;
    name: string;
    address: string;
    city: string;
    email: string;
    plates: Plate[];
    rating: number;
    typology: string;
    avatar?: string;
}

export interface Plate {
    _id: string;
    namePlate: string;
    pricePlate: number;
}
