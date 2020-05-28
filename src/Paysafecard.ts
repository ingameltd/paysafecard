import Axios, { AxiosInstance } from 'axios';
import { Payment } from './Payments/Payment';
import { PaymentCreatedResponse } from './Payments/PaymentCreatedResponse';
import { PaymentsEndpoint } from './endpoints';
import { PaysafecardErrorResponse } from './errors/PaysafecardErrorResponse';
import { PaysafecardError } from './errors/PaysafecardError';


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
            throw new PaysafecardError(response.code, response.message, response.number, response.param);
        }
    }
}
