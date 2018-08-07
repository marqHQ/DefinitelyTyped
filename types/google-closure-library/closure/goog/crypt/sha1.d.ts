/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hash.d.ts"/>

declare module 'goog:goog.crypt.Sha1' {
    import alias = goog.crypt.Sha1;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * SHA-1 cryptographic hash constructor.
     *
     * The properties declared here are discussed in the above algorithm document.
     * @extends {goog.crypt.Hash}
     * @final
     * @struct
     */
    class Sha1 extends __Sha1 {}
    abstract class __Sha1 extends goog.crypt.__Hash {
        /**
         */
        constructor();

        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @type {!Array<number>}
         * @private
         */
        private chain_: number[];

        /**
         * A buffer holding the partially computed hash result.
         * @type {!Array<number>}
         * @private
         */
        private buf_: number[];

        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @type {!Array<number>}
         * @private
         */
        private W_: number[];

        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @type {!Array<number>}
         * @private
         */
        private pad_: number[];

        /**
         * @private {number}
         */
        private inbuf_: any /*missing*/;

        /**
         * @private {number}
         */
        private total_: any /*missing*/;

        /**
         * Internal compress helper function.
         * @param {!Array<number>|!Uint8Array|string} buf Block to compress.
         * @param {number=} opt_offset Offset of the block in the buffer.
         * @private
         */
        private compress_(buf: number[]|Uint8Array|string, opt_offset?: number): void;
    }
}
