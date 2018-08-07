/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hash.d.ts"/>

declare module 'goog:goog.crypt.Hmac' {
    import alias = goog.crypt.Hmac;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * @extends {goog.crypt.Hash}
     * @final
     * @struct
     */
    class Hmac extends __Hmac {}
    abstract class __Hmac extends goog.crypt.__Hash {
        /**
         * @param {!goog.crypt.Hash} hasher An object to serve as a hash function.
         * @param {Array<number>} key The secret key to use to calculate the hmac.
         *     Should be an array of not more than `blockSize` integers in
               {0, 255}.
         * @param {number=} opt_blockSize Optional. The block size `hasher` uses.
         *     If not specified, uses the block size from the hasher, or 16 if it is
         *     not specified.
         */
        constructor(hasher: goog.crypt.Hash, key: number[], opt_blockSize?: number);

        /**
         * The underlying hasher to calculate hash.
         *
         * @type {!goog.crypt.Hash}
         * @private
         */
        private hasher_: goog.crypt.Hash;

        /**
         * The outer padding array of hmac
         *
         * @type {!Array<number>}
         * @private
         */
        private keyO_: number[];

        /**
         * The inner padding array of hmac
         *
         * @type {!Array<number>}
         * @private
         */
        private keyI_: number[];

        /**
         * Initializes Hmac by precalculating the inner and outer paddings.
         *
         * @param {Array<number>} key The secret key to use to calculate the hmac.
         *     Should be an array of not more than `blockSize` integers in
               {0, 255}.
         * @private
         */
        private initialize_(key: number[]): void;

        /**
         * Calculates an HMAC for a given message.
         *
         * @param {Array<number>|Uint8Array|string} message  Data to Hmac.
         * @return {!Array<number>} the digest of the given message.
         */
        getHmac(message: number[]|Uint8Array|string): number[];
    }
}

declare namespace goog.crypt.Hmac {
}
