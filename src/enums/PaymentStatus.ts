/**
 * Status of payment
 *
 * @export
 * @enum {string}
 */
export enum PaymentStatus {
    /**
     * The initial state of a payment after it has been successfully created.
     */
    Initiated = "INITIATED",

    /**
     * The customer has been redirected to paysafecard's payment panel to authorize the payment.
     */
    Redirected = "REDIRECTED",

    /**
     * The customer has authorized the payment.
     */
    Authorized = "AUTHORIZED",

    /**
     * The payment has been completed successfully completed.
     */
    Success = "SUCCESS",

    /**
     * You, as the business partner, have cancelled the payment.
     */
    CanceledMerchant = "CANCELED_MERCHANT",

    /**
     * The customer has cancelled the payment on the payment panel.
     */
    CanceledCustomer = "CANCELED_CUSTOMER",

    /**
     * The customer has not authorized the payment during the disposition time window or you, 
     * the business partner, have not captured the authorized amount during the disposition time window.
     */
    Expired = "EXPIRED"
}
