/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hash.d.ts"/>

declare module 'goog:goog.crypt.Md5' {
    import alias = goog.crypt.Md5;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * MD5 cryptographic hash constructor.
     * @extends {goog.crypt.Hash}
     * @final
     * @struct
     */
    class Md5 extends __Md5 {}
    abstract class __Md5 extends goog.crypt.__Hash {
        /**
         */
        constructor();

        /**
         * Holds the current values of accumulated A-D variables (MD buffer).
         * @type {!Array<number>}
         * @private
         */
        private chain_: number[];

        /**
         * A buffer holding the data until the whole block can be processed.
         * @type {!Array<number>}
         * @private
         */
        private block_: number[];

        /**
         * The length of yet-unprocessed data as collected in the block.
         * @type {number}
         * @private
         */
        private blockLength_: number;

        /**
         * The total length of the message so far.
         * @type {number}
         * @private
         */
        private totalLength_: number;

        /**
         * Internal compress helper function. It takes a block of data (64 bytes)
         * and updates the accumulator.
         * @param {Array<number>|Uint8Array|string} buf The block to compress.
         * @param {number=} opt_offset Offset of the block in the buffer.
         * @private
         */
        private compress_(buf: number[]|Uint8Array|string, opt_offset?: number): void;
    }
}
