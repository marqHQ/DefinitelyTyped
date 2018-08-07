/// <reference path="../../../globals.d.ts"/>
/// <reference path="./hash.d.ts"/>

declare module 'goog:goog.crypt.Sha2' {
    import alias = goog.crypt.Sha2;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * SHA-2 cryptographic hash constructor.
     * This constructor should not be used directly to create the object. Rather,
     * one should use the constructor of the sub-classes.
     * @extends {goog.crypt.Hash}
     * @struct
     */
    class Sha2 extends __Sha2 {}
    abstract class __Sha2 extends goog.crypt.__Hash {
        /**
         * @param {number} numHashBlocks The size of output in 16-byte blocks.
         * @param {!Array<number>} initHashBlocks The hash-specific initialization
         */
        constructor(numHashBlocks: number, initHashBlocks: number[]);

        /**
         * A chunk holding the currently processed message bytes. Once the chunk has
         * 64 bytes, we feed it into computeChunk_ function and reset this.chunk_.
         * @private {!Array<number>|!Uint8Array}
         */
        private chunk_: any /*missing*/;

        /**
         * Current number of bytes in this.chunk_.
         * @private {number}
         */
        private inChunk_: any /*missing*/;

        /**
         * Total number of bytes in currently processed message.
         * @private {number}
         */
        private total_: any /*missing*/;

        /**
         * Holds the previous values of accumulated hash a-h in the computeChunk_
         * function.
         * @private {!Array<number>|!Int32Array}
         */
        private hash_: any /*missing*/;

        /**
         * The number of output hash blocks (each block is 4 bytes long).
         * @private {number}
         */
        private numHashBlocks_: any /*missing*/;

        /**
         * @private {!Array<number>} initHashBlocks
         */
        private initHashBlocks_: any /*missing*/;

        /**
         * Temporary array used in chunk computation.  Allocate here as a
         * member rather than as a local within computeChunk_() as a
         * performance optimization to reduce the number of allocations and
         * reduce garbage collection.
         * @private {!Int32Array|!Array<number>}
         */
        private w_: any /*missing*/;

        /**
         * Helper function to compute the hashes for a given 512-bit message chunk.
         * @private
         */
        private computeChunk_(): void;
    }
}

declare namespace goog.crypt.Sha2 {
}
