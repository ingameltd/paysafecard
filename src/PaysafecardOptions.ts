import https from 'https';

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
}
