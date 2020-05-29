import { CustomerResponse } from "./CustomerResponse";

/**
 * Payment created response object
 *
 * @export
 * @interface PaymentCreatedResponse
 */
export interface PaymentCreatedResponse {
    object: string;
    id: string;
    created: number;
    updated: number;
    amount: number;
    currency: string;
    status: string;
    redirect: RedirectResponse;
    customer?: CustomerResponse;
    notification_url: string;
}

/**
 * Redirect response from payment created
 *
 * @export
 * @interface RedirectResponse
 */
export interface RedirectResponse {
    success_url?: string;
    failure_url?: string;

    /**
     * Authentication url where customer needed to be redirect
     *
     * @type {string}
     * @memberof RedirectResponse
     */
    auth_url: string;
}
