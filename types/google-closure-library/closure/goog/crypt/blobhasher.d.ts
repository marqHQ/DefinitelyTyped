/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./hash.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.crypt.BlobHasher' {
    import alias = goog.crypt.BlobHasher;
    export default alias;
}

declare module 'goog:goog.crypt.BlobHasher.EventType' {
    import alias = goog.crypt.BlobHasher.EventType;
    export default alias;
}

declare namespace goog.crypt {
    /**
     * Construct the hash computer.
     *
     * @struct
     * @extends {goog.events.EventTarget}
     * @final
     */
    class BlobHasher extends __BlobHasher {}
    abstract class __BlobHasher extends goog.events.__EventTarget {
        /**
         * @param {!goog.crypt.Hash} hashFn The hash function to use.
         * @param {number=} opt_blockSize Processing block size.
         */
        constructor(hashFn: goog.crypt.Hash, opt_blockSize?: number);

        /**
         * The actual hash function.
         * @type {!goog.crypt.Hash}
         * @private
         */
        private hashFn_: goog.crypt.Hash;

        /**
         * The blob being processed or null if no blob is being processed.
         * @type {Blob}
         * @private
         */
        private blob_: Blob;

        /**
         * Computed hash value.
         * @type {Array<number>}
         * @private
         */
        private hashVal_: number[];

        /**
         * Number of bytes already processed.
         * @type {number}
         * @private
         */
        private bytesProcessed_: number;

        /**
         * The number of bytes to hash or Infinity for no limit.
         * @type {number}
         * @private
         */
        private hashingLimit_: number;

        /**
         * Processing block size.
         * @type {number}
         * @private
         */
        private blockSize_: number;

        /**
         * File reader object. Will be null if no chunk is currently being read.
         * @type {FileReader}
         * @private
         */
        private fileReader_: FileReader;

        /**
         * The logger used by this object.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Start the hash computation.
         * @param {!Blob} blob The blob of data to compute the hash for.
         */
        hash(blob: Blob): void;

        /**
         * Sets the maximum number of bytes to hash or Infinity for no limit. Can be
         * called before hash() to throttle the hash computation. The hash computation
         * can then be continued by repeatedly calling setHashingLimit() with greater
         * byte offsets. This is useful if you don't need the hash until some time in
         * the future, for example when uploading a file and you don't need the hash
         * until the transfer is complete.
         * @param {number} byteOffset The byte offset to compute the hash up to.
         *     Should be a non-negative integer or Infinity for no limit. Negative
         *     values are not allowed.
         */
        setHashingLimit(byteOffset: number): void;

        /**
         * Abort hash computation.
         */
        abort(): void;

        /**
         * @return {number} Number of bytes processed so far.
         */
        getBytesProcessed(): number;

        /**
         * @return {Array<number>} The computed hash value or null if not ready.
         */
        getHash(): number[];

        /**
         * Helper function setting up the processing for the next block, or finalizing
         * the computation if all blocks were processed.
         * @private
         */
        private processNextBlock_(): void;

        /**
         * Handle processing block loaded.
         * @private
         */
        private onLoad_(): void;

        /**
         * Handles error.
         * @private
         */
        private onError_(): void;
    }
}

declare namespace goog.crypt.BlobHasher {
    /**
     * Event names for hash computation events
     * @enum {string}
     */
    enum EventType { STARTED, PROGRESS, THROTTLED, COMPLETE, ABORT, ERROR }
}
