
import { FieldValue, Timestamp } from "firebase/firestore";
import { Key } from "react";

// This file contains the models for the restaurant application.
export type PaymentMethodType = 'card' | 'cash' | 'mobile' | 'banktransfer';

export type ImageType ={
    src : string;
    title : string;
}

export interface IRestaurant {
    name: string;
    address: string;
    phone: string;
    email: string;
    closingTime: Timestamp;
    openingTime: Timestamp;
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

export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" ;
export interface IOrder{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    lines: ILine[];
    comments?: string;
    reason?: string;
    pickupTime: string | FieldValue;
    paymentMethod: PaymentMethodType[];
    status?: OrderStatus;
    subTotal: number;
    total: number;
}
export interface ILine{
    id: Key | null | undefined;
    label: string;
    price: number;
    quantity: number;
    instructions?: string;
    value: ILineValue[];
}
export interface ILineValue{
    variant: string;
    price: number;
    value: string;
}

 // option + arrow key up with shift the code up
 // return (
    //     <Box>
    //    <p>Menu page</p>
    //    {categories?.map((category) => (
    //     <div key={category.id}>
    //         <h2>{category.title}</h2>
    //     </div>
    //     ))}
    //     {items?.map((item) => ( 
    //         <div key={item.id}>
    //             <h3>{item.label}</h3>
    //             <p>{item.description}</p>
    //             <p>{item.price}</p>
    //         </div>
    //     ))}
    //     </Box>
    //     );