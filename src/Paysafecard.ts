import https from 'https';
import Axios, { AxiosInstance } from 'axios';
import { Payment } from './Payments/Payment';
import { PaymentCreatedResponse } from './Payments/PaymentCreatedResponse';
import { PaymentsEndpoint } from './endpoints';
import { PaysafecardErrorResponse, getPaysafecardError } from './errors/PaysafecardErrorResponse';
import { PaymentRetriveResponse } from './Payments/PaymentRetriveResponse';
import { PaymentCaptureResponse } from './Payments/PaymentCaptureResponse';


const TEST_ENV = 'https://apitest.paysafecard.com/v1';
const PROD_ENV = 'https://api.paysafecard.com/v1';

const CLOUD_TEST_ENV = 'https://api-cg.test.paysafecard.com/v1';
const CLOUD_PROD_ENV = 'https://api-cg.paysafecard.com/v1';

/**
 * Paysafecard options
 *
 * @export
 * @interface PaysafecardOptions
 */
export interface PaysafecardOptions {
    /**
     * Whether to enable test mode
     *
     * @type {boolean}
     * @memberof PaysafecardOptions
     */
    testMode?: boolean;

    /**
     * Use this if you have enabled cloud mode with paysafecard support(if you cannot obtain a static ip)
     *
     * @type {boolean}
     * @memberof PaysafecardOptions
     */
    cloudMode?: boolean;

    /**
     * Provide your cloud certificates in a custom https agent
     * For example a .p12 file with passphrase
     *
     * @type {https.Agent}
     * @memberof PaysafecardOptions
     */
    httpsAgent?: https.Agent;
};

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
     * Creates an instance of Paysafecard.
     * @param {string} key - pasysafecard key
     * @param {PaysafecardOptions} [options={ testMode: false, cloudMode: false }] - options
     * @memberof Paysafecard
     */
    constructor(key: string, options: PaysafecardOptions = { testMode: false, cloudMode: false }) {
        this.key = key;
        this.authKey = `Basic ${Buffer.from(this.key).toString('base64')}`;
        this.baseEndpoint = !options.testMode ? PROD_ENV : TEST_ENV;

        if (options.cloudMode === true) {
            this.baseEndpoint = !options.testMode ? CLOUD_PROD_ENV : CLOUD_TEST_ENV;
            if (!options.httpsAgent) {
                throw new Error('Cloud mode requires a custom certificate chain for https')
            }
        }

        this.client = Axios.create({
            baseURL: this.baseEndpoint,
            headers: { 'Authorization': this.authKey },
            timeout: 60 * 1000,
            httpsAgent: options.httpsAgent
        });
    }

    /**
     * Initiate a payment
     *
     * @param {Payment} payment - Payment object
     * @param {string} correlationId - Use this for modify the ID given by paysafecard
     * @throws {PaysafecardError}
     * @returns {Promise<PaymentCreatedResponse>}
     * @memberof Paysafecard
     */
    public async initiatePayment (payment: Payment, correlationId: string = ''): Promise<PaymentCreatedResponse> {
        try {
            const data = {
                ...payment,
                type: 'PAYSAFECARD'
            };
            let headers: any = {}
            if (correlationId !== '') {
                headers['Correlation-ID'] = correlationId;
            }
            const response = await this.client.post(PaymentsEndpoint, data, { headers: headers });
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
