import { Key } from "react";

export type PaymentMethodType = 'card' | 'cash' | 'mobile' | 'banktransfer';

export type ImageType = {
    src: string;
    title: string;
};

export interface IRestaurant {
    name: string;
    address: string;
    phone: string;
    email: string;
    closingTime: string;
    openingTime: string;
    paymentMethods: PaymentMethodType[];
}

export interface ICategory {
    id: string;
    createdate: string;
    lastupdate: string;
    createby: string;
    image: ImageType;
    title: string;
    description: string;
}

export interface IItem {
    id: string;
    createdate: string;
    lastupdate: string;
    createby: string;
    image: ImageType;
    description: string;
    price: number;
    label: string;
    category: string;
    variants: IVariant[];
}

export interface IVariant {
    isRequired: boolean;
    allowMultiple: boolean;
    type: string;
    choices: IChoice[];
}

export interface IChoice {
    price: number;
    label: string;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface IOrder {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    line: ILine[];
    comments?: string;
    reason?: string;
    pickupTime: string;
    paymentMethod: PaymentMethodType[];
    status?: OrderStatus[];
    subTotal: number;
    total: number;
}

export interface ILine {
    id: Key | null | undefined;
    label: string;
    price: number;
    quantity: number;
    instructions?: string;
    value: ILineValue[];
}

export interface ILineValue {
    variant: string;
    price: number;
    value: string;
}