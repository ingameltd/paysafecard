import { Currency } from "../enums/Currency";
import { PaymentStatus } from "../enums/PaymentStatus";
import { CardDetail } from "./CardDetail";

/**
 * Payment retrive response from the system
 *
 * @export
 * @interface PaymentRetriveResponse
 */
export interface PaymentRetriveResponse {
    type: string;
    id: string;
    created: number;
    updated: number;
    amount: number;
    currency: Currency;
    status: PaymentStatus;
    redirect: PaymentRetriveRedirect;
    notification_url: string;
    customer?: PaymentRetriveCustomer;
    card_details?: CardDetail[];
}

/**
 * Customer response associated with payment retrive 
 *
 * @export
 * @interface PaymentRetriveCustomer
 */
export interface PaymentRetriveCustomer {
    id: string;
    ip?: string;
    psc_id?: number;
    first_name?: string;
    Last_name?: string;
    date_of_birth?: string;
    account_created?: string;
}

/**
 * Redirect response in payment retrival
 *
 * @export
 * @interface PaymentRetriveRedirect
 */
export interface PaymentRetriveRedirect {
    success_url?: string;
    failure_url?: string;
}
