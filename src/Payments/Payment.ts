import { Currency } from "../enums/Currency";
import { KycLevel } from "../enums/KycLevel";

/**
 * Payment object
 *
 * @interface Payment
 */
export interface Payment {
    /**
     * Payment amount, precision must be 2 digits after the colon.
     *  
     * @example 0.01
     * @type {number}
     * @memberof Payment
     */
    amount: number;

    /**
     * Currency for the transaction
     *
     * @type {Currency}
     * @memberof Payment
     */
    currency: Currency;

    /**
     * Redirect urls
     *
     * @type {Redirect}
     * @memberof Payment
     */
    redirect?: Redirect;

    /**
     * Notification URL we will contact after the authorization has been successfully completed.
     * The placeholder `{payment_id}` in the URL is replaced with the actual ID of this payment.
     *
     * @example https://notification.com/{payment_id}
     * @type {string}
     * @memberof Payment
     */
    notification_url: string;

    /**
     * Customer object
     *
     * @type {Customer}
     * @memberof Payment
     */
    customer: Customer;

    /**
     * Also called ‘reporting criteria’, offers the possibility to classify sub-merchants. 
     * Agreement with paysafecard needed - not agreed values lead to a failed payment. max. 8 digits in alpha numeric code
     *
     * @example 1
     * @type {number}
     * @memberof Payment
     */
    submerchant_id: number;

    /**
     * Identification of the shop which is the originator of the request. 
     * This is most likely used by payment service providers who act as a proxy for other payment methods as well.
     *
     * @example shop1
     * @type {string}
     * @memberof Payment
     */
    shop_id: string;
}

/**
 * Represents a customer
 *
 * @export
 * @interface Customer
 */
export interface Customer {
    /**
     * Only the id is mandatory. It´s value uniquely identifies the customer and is provided by you. 
     * If any personal data e.g. customer´s user name, email address, is used here, it has to be encrypted or hashed for security reasons.
     *
     * @example merchantclientid5HzDvoZSodKDJ7X7VQKrtestAutomation
     * @type {string}
     * @memberof Customer
     */
    id: string;

    /**
     * Valid for my paysafecard payments. For additional information about my paysafecard, please see the section "my paysafecard". 
     * Restricts payments to my paysafecard customers only, who are equal to or older than the specified age. 
     * Please note: This means that it is required that the customer has a registered my paysafecard account to make the payment.
     * 
     * @example 18
     * @type {number}
     * @memberof Customer
     */
    min_age?: number;

    /**
     * Valid values SIMPLE or FULL. These values refer to the KYC level of the customer's my paysafecard account. 
     * Depending on the country, my paysafecard accounts are offered with SIMPLE and/or FULL customer identification.
     *
     * @example SIMPLE
     * @type {KycLevel}
     * @memberof Customer
     */
    kyc_level?: KycLevel;

    /**
     * ISO 3166-1 alpha-2 two-letter country code used to restrict payments to residents of a particular country.
     *
     * @example AT
     * @type {string}
     * @memberof Customer
     */
    country_restriction?: string;
}

/**
 * Redirect
 *
 * @export
 * @interface Redirect
 */
export interface Redirect {
    /**
     * URLs to redirect after successful or failed authorization. The placeholder `{payment_id}` in the URL is replaced with the actual ID of this payment.
     *
     * @example https://notification.com/{payment_id}
     * @type {string}
     * @memberof Redirect
     */
    success_url: string;

    /**
     * Notification URL we will contact after the authorization has been successfully completed. 
     * The placeholder `{payment_id}` in the URL is replaced with the actual ID of this payment.
     *
     * @example https://notification.com/{payment_id}
     * @type {string}
     * @memberof Redirect
     */
    failure_url: string;
}


