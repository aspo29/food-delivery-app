import { RiBankCardFill, RiMoneyDollarCircleFill, RiSmartphoneFill, RiBankFill } from "react-icons/ri";
import { IconType } from "react-icons";

export type PaymentMethodType = 'card' | 'cash' | 'mobile' | 'banktransfer';

export interface IPaymentMethod {
    id: PaymentMethodType;
    name: string;
    }
export const PAYMENT_METHODS : IPaymentMethod[] = [
    { id: 'card', name: 'Card' },
    { id: 'cash', name: 'Cash at Delivery' },
    { id: 'mobile', name: 'Call for Payment Information' },
    { id: 'banktransfer', name: 'Bank Transfer' },
];

export const PaymentIcons: Record<PaymentMethodType, IconType> = {
  card: RiBankCardFill,
  cash: RiMoneyDollarCircleFill,
  mobile: RiSmartphoneFill,
  banktransfer: RiBankFill,
};

export type OrderStatusType = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" ;

export interface IOrderStatus {
    id: OrderStatusType;
    name: string;
    }
export const ORDER_STATUS : IOrderStatus[] = [
    { id: 'PENDING', name: 'Pending' },
    { id: 'CONFIRMED', name: 'Confirmed' },
    { id: 'CANCELLED', name: 'Cancelled' },
    { id: 'COMPLETED', name: 'Completed' },
];