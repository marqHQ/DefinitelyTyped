/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hash.d.ts"/>
/// <reference path="../math/long.d.ts"/>

declare module 'goog:goog.crypt.Sha2_64bit' {
    import alias = goog.crypt.Sha2_64bit;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Constructs a SHA-2 64-bit cryptographic hash.
     * This class should not be used. Rather, one should use one of its
     * subclasses.
     * @extends {goog.crypt.Hash}
     * @struct
     */
    class Sha2_64bit extends __Sha2_64bit {}
    abstract class __Sha2_64bit extends goog.crypt.__Hash {
        /**
         * @param {number} numHashBlocks The size of the output in 16-byte blocks
         * @param {!Array<number>} initHashBlocks The hash-specific initialization
         *     vector, as a sequence of sixteen 32-bit numbers.
         */
        constructor(numHashBlocks: number, initHashBlocks: number[]);

        /**
         * The number of bytes that are digested in each pass of this hasher.
         * @const {number}
         */
        readonly blockSize: any /*missing*/;

        /**
         * A chunk holding the currently processed message bytes. Once the chunk has
         * `this.blocksize` bytes, we feed it into [@code computeChunk_}.
         * @private {!Uint8Array|!Array<number>}
         */
        private chunk_: any /*missing*/;

        /**
         * Current number of bytes in `this.chunk_`.
         * @private {number}
         */
        private chunkBytes_: any /*missing*/;

        /**
         * Total number of bytes in currently processed message.
         * @private {number}
         */
        private total_: any /*missing*/;

        /**
         * Holds the previous values of accumulated hash a-h in the
         * `computeChunk_` function.
         * @private {!Array<!goog.math.Long>}
         */
        private hash_: any /*missing*/;

        /**
         * The number of blocks of output produced by this hash function, where each
         * block is eight bytes long.
         * @private {number}
         */
        private numHashBlocks_: any /*missing*/;

        /**
         * Temporary array used in chunk computation.  Allocate here as a
         * member rather than as a local within computeChunk_() as a
         * performance optimization to reduce the number of allocations and
         * reduce garbage collection.
         * @type {!Array<!goog.math.Long>}
         * @private
         */
        private w_: goog.math.Long[];

        /**
         * The value to which `this.hash_` should be reset when this
         * Hasher is reset.
         * @private @const {!Array<!goog.math.Long>}
         */
        private initHashBlocks_: any /*missing*/;

        /**
         * If true, we have taken the digest from this hasher, but we have not
         * yet reset it.
         *
         * @private {boolean}
         */
        private needsReset_: any /*missing*/;

        /**
         * Updates this hash by processing the 1024-bit message chunk in this.chunk_.
         * @private
         */
        private computeChunk_(): void;

        /**
         * Calculates the SHA2 64-bit sigma0 function.
         * rotateRight(value, 1) ^ rotateRight(value, 8) ^ (value >>> 7)
         *
         * @private
         * @param {!goog.math.Long} value
         * @return {!goog.math.Long}
         */
        private sigma0_(value: goog.math.Long): goog.math.Long;

        /**
         * Calculates the SHA2 64-bit sigma1 function.
         * rotateRight(value, 19) ^ rotateRight(value, 61) ^ (value >>> 6)
         *
         * @private
         * @param {!goog.math.Long} value
         * @return {!goog.math.Long}
         */
        private sigma1_(value: goog.math.Long): goog.math.Long;

        /**
         * Calculates the SHA2 64-bit Sigma0 function.
         * rotateRight(value, 28) ^ rotateRight(value, 34) ^ rotateRight(value, 39)
         *
         * @private
         * @param {!goog.math.Long} value
         * @return {!goog.math.Long}
         */
        private Sigma0_(value: goog.math.Long): goog.math.Long;

        /**
         * Calculates the SHA2 64-bit Sigma1 function.
         * rotateRight(value, 14) ^ rotateRight(value, 18) ^ rotateRight(value, 41)
         *
         * @private
         * @param {!goog.math.Long} value
         * @return {!goog.math.Long}
         */
        private Sigma1_(value: goog.math.Long): goog.math.Long;

        /**
         * Calculates the SHA-2 64-bit choose function.
         *
         * This function uses `value` as a mask to choose bits from either
         * `one` if the bit is set or `two` if the bit is not set.
         *
         * @private
         * @param {!goog.math.Long} value
         * @param {!goog.math.Long} one
         * @param {!goog.math.Long} two
         * @return {!goog.math.Long}
         */
        private choose_(value: goog.math.Long, one: goog.math.Long, two: goog.math.Long): goog.math.Long;

        /**
         * Calculates the SHA-2 64-bit majority function.
         * This function returns, for each bit position, the bit held by the majority
         * of its three arguments.
         *
         * @private
         * @param {!goog.math.Long} one
         * @param {!goog.math.Long} two
         * @param {!goog.math.Long} three
         * @return {!goog.math.Long}
         */
        private majority_(one: goog.math.Long, two: goog.math.Long, three: goog.math.Long): goog.math.Long;

        /**
         * Adds two or more goog.math.Long values.
         *
         * @private
         * @param {!goog.math.Long} one first summand
         * @param {!goog.math.Long} two second summand
         * @param {...goog.math.Long} var_args more arguments to sum
         * @return {!goog.math.Long} The resulting sum.
         */
        private sum_(one: goog.math.Long, two: goog.math.Long, ...var_args: goog.math.Long[]): goog.math.Long;
    }
}

declare namespace goog.crypt.Sha2_64bit {
}
