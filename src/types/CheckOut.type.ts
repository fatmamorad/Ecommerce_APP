export interface CheckOut {
    status: string;
    data:   Data;
}

export interface Data {
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: string;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              string;
    cartItems:         CartItem[];
    shippingAddress:   ShippingAddress;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
}

export interface CartItem {
    count:   number;
    _id:     string;
    product: string;
    price:   number;
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}


export interface CheckOutCard {
    status:  string;
    session: Session;
}

export interface Session {
    url:         string;
    success_url: string;
    cancel_url:  string;
}
