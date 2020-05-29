import { CardDetail } from "./CardDetail";
import { CustomerResponse } from "./CustomerResponse";
import { PaymentStatus } from "../enums/PaymentStatus";
import { Currency } from "../enums/Currency";

/**
 * Payment capture response
 *
 * @export
 * @interface PaymentCaptureResponse
 */
export interface PaymentCaptureResponse {
    object: string;
    id: string;
    created: number;
    updated: number;
    amount: number;
    currency: Currency;
    status: PaymentStatus;
    type: string;
    customer?: CustomerResponse;
    notification_url: string;
    card_details?: CardDetail[];
}
