import Axios, { AxiosInstance } from 'axios';
import { Payment } from './Payments/Payment';
import { PaymentCreatedResponse } from './Payments/PaymentCreatedResponse';
import { PaymentsEndpoint } from './endpoints';
import { PaysafecardErrorResponse, getPaysafecardError } from './errors/PaysafecardErrorResponse';
import { PaysafecardError } from './errors/PaysafecardError';
import { PaymentRetriveResponse } from './Payments/PaymentRetriveResponse';
import { PaymentCaptureResponse } from './Payments/PaymentCaptureResponse';


const TEST_ENV = 'https://apitest.paysafecard.com/v1';
const PROD_ENV = 'https://api.paysafecard.com/v1/'

/**
 * Paysafecard 
 *
 * @export
 * @class Paysafecard
 */
export class Paysafecard {
    private key: string;
    private authKey: string;
    private baseEndpoint: string;
    private client: AxiosInstance;

    /**
     *Creates an instance of Paysafecard.
     * @param {string} key - Key from Paysafecard panel
     * @param {boolean} [testMode=false] - Use test endpoints or production endpoints
     * @memberof Paysafecard
     */
    constructor(key: string, testMode: boolean = false) {
        this.key = key;
        this.authKey = `Basic ${Buffer.from(this.key).toString('base64')}`;
        this.baseEndpoint = !testMode ? PROD_ENV : TEST_ENV;

        this.client = Axios.create({
            baseURL: this.baseEndpoint,
            headers: { 'Authorization': this.authKey },
            timeout: 60 * 1000
        });
    }

    /**
     * Initiate a payment
     *
     * @param {Payment} payment - Payment object
     * @throws {PaysafecardError}
     * @returns {Promise<PaymentCreatedResponse>}
     * @memberof Paysafecard
     */
    public async initiatePayment (payment: Payment): Promise<PaymentCreatedResponse> {
        try {
            const data = {
                ...payment,
                type: 'PAYSAFECARD'
            };
            const response = await this.client.post(PaymentsEndpoint, data);
            return <PaymentCreatedResponse>response.data;
        } catch (error) {
            const response = <PaysafecardErrorResponse>error.response.data;
            throw getPaysafecardError(error.response.status, response);
        }
    }

    /**
     * Retrive a payment
     *
     * @param {string} paymentId - payment id
     * @returns {Promise<PaymentRetriveResponse>}
     * @memberof Paysafecard
     */
    public async retrievePayment (paymentId: string): Promise<PaymentRetriveResponse> {
        try {
            const resp = await this.client.get(`${PaymentsEndpoint}/${paymentId}`);
            return <PaymentRetriveResponse>resp.data;
        } catch (error) {
            const response = <PaysafecardErrorResponse>error.response.data;
            throw getPaysafecardError(error.response.status, response);
        }
    }

    /**
     * Capture payment to accept it
     *
     * @param {string} paymentId - payment id
     * @returns {Promise<PaymentRetriveResponse>}
     * @memberof Paysafecard
     */
    public async capturePayment (paymentId: string): Promise<PaymentCaptureResponse> {
        try {
            const resp = await this.client.post(`${PaymentsEndpoint}/${paymentId}/capture`, {});
            return <PaymentCaptureResponse>resp.data;
        } catch (error) {
            const response = <PaysafecardErrorResponse>error.response.data;
            throw getPaysafecardError(error.response.status, response);
        }
    }
}
