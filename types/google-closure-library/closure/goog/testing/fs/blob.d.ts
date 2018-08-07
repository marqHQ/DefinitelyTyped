/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.testing.fs.Blob' {
    import alias = goog.testing.fs.Blob;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock Blob object. The data is stored as an Array of bytes, a "byte" being a
     * JS number in the range 0-255.
     *
     * This blob simplifies writing test code because it has the toString() method
     * that returns immediately, while the File API only provides asynchronous
     * reads.
     * @see https://www.w3.org/TR/FileAPI/#constructorBlob
     *
     */
    class Blob extends __Blob {}
    abstract class __Blob {
        /**
         * @param {(string|Array<(string|number|!Uint8Array)>)=} opt_data The data
         *     encapsulated by the blob.
         * @param {string=} opt_type The mime type of the blob.
         */
        constructor(opt_data?: string|string|number|Uint8Array[], opt_type?: string);

        /**
         * @see http://www.w3.org/TR/FileAPI/#dfn-type
         * @type {string}
         */
        type: string;

        /**
         * The data encapsulated by the blob as an Array of bytes, a "byte" being a
         * JS number in the range 0-255.
         * @private {!Array<number>}
         */
        private data_: number[];

        /**
         * @see http://www.w3.org/TR/FileAPI/#dfn-size
         * @type {number}
         */
        size: number;

        /**
         * Creates a blob with bytes of a blob ranging from the optional start
         * parameter up to but not including the optional end parameter, and with a type
         * attribute that is the value of the optional contentType parameter.
         * @see http://www.w3.org/TR/FileAPI/#dfn-slice
         * @param {number=} opt_start The start byte offset.
         * @param {number=} opt_end The end point of a slice.
         * @param {string=} opt_contentType The type of the resulting Blob.
         * @return {!goog.testing.fs.Blob} The result blob of the slice operation.
         */
        slice(opt_start?: number, opt_end?: number, opt_contentType?: string): goog.testing.fs.Blob;

        /**
         * @return {!ArrayBuffer} The data encapsulated by the blob as an
         *     ArrayBuffer.
         */
        toArrayBuffer(): ArrayBuffer;

        /**
         * @return {string} The string data encapsulated by the blob as a data: URI.
         */
        toDataUrl(): string;

        /**
         * Sets the internal contents of the blob to an Array of bytes. This should
         *     only be called by other functions inside the `goog.testing.fs`
         *     namespace.
         * @param {string|Array<string|number|!Uint8Array>} data The data to write
         *     into the blob.
         * @package
         */
        setDataInternal(data: string|string|number|Uint8Array[]): void;

        /**
         * Converts the data from string to Array of bytes and appends to the blob
         *     content.
         * @param {string} data The string to append to the blob content.
         * @private
         */
        private appendString_(data: string): void;

        /**
         * Appends a byte (as a number between 0 to 255) to the blob content.
         * @param {number} data The byte to append.
         * @private
         */
        private appendByte_(data: number): void;

        /**
         * Converts the data from Uint8Array to Array of bytes and appends it to the
         *     blob content.
         * @param {!Uint8Array} data The array to append to the blob content.
         * @private
         */
        private appendUint8_(data: Uint8Array): void;
    }
}
