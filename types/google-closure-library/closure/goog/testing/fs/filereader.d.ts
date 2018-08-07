/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../../fs/filereader.d.ts"/>
/// <reference path="../../fs/error.d.ts"/>
/// <reference path="./blob.d.ts"/>

declare module 'goog:goog.testing.fs.FileReader' {
    import alias = goog.testing.fs.FileReader;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock FileReader object. This emits the same events as
     * {@link goog.fs.FileReader}.
     *
     * @extends {goog.events.EventTarget}
     */
    class FileReader extends __FileReader {}
    abstract class __FileReader extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * The current state of the reader.
         * @type {goog.fs.FileReader.ReadyState}
         * @private
         */
        private readyState_: goog.fs.FileReader.ReadyState;

        /**
         * The most recent error experienced by this reader.
         * @type {goog.fs.Error}
         * @private
         */
        private error_: goog.fs.Error;

        /**
         * Whether the current operation has been aborted.
         * @type {boolean}
         * @private
         */
        private aborted_: boolean;

        /**
         * The blob this reader is reading from.
         * @type {goog.testing.fs.Blob}
         * @private
         */
        private blob_: goog.testing.fs.Blob;

        /**
         * @see {goog.fs.FileReader#getReadyState}
         * @return {goog.fs.FileReader.ReadyState} The current ready state.
         */
        getReadyState(): goog.fs.FileReader.ReadyState;

        /**
         * @see {goog.fs.FileReader#getError}
         * @return {goog.fs.Error} The current error.
         */
        getError(): goog.fs.Error;

        /**
         * @see {goog.fs.FileReader#abort}
         */
        abort(): void;

        /**
         * @see {goog.fs.FileReader#getResult}
         * @return {*} The result of the file read.
         */
        getResult(): any;

        /**
         * Fires the read events.
         * @param {!goog.testing.fs.Blob} blob The blob to read from.
         * @private
         */
        private read_(blob: goog.testing.fs.Blob): void;

        /**
         * @see {goog.fs.FileReader#readAsBinaryString}
         * @param {!goog.testing.fs.Blob} blob The blob to read.
         */
        readAsBinaryString(blob: goog.testing.fs.Blob): void;

        /**
         * @see {goog.fs.FileReader#readAsArrayBuffer}
         * @param {!goog.testing.fs.Blob} blob The blob to read.
         */
        readAsArrayBuffer(blob: goog.testing.fs.Blob): void;

        /**
         * @see {goog.fs.FileReader#readAsText}
         * @param {!goog.testing.fs.Blob} blob The blob to read.
         * @param {string=} opt_encoding The name of the encoding to use.
         */
        readAsText(blob: goog.testing.fs.Blob, opt_encoding?: string): void;

        /**
         * @see {goog.fs.FileReader#readAsDataUrl}
         * @param {!goog.testing.fs.Blob} blob The blob to read.
         */
        readAsDataUrl(blob: goog.testing.fs.Blob): void;

        /**
         * Abort the current action and emit appropriate events.
         *
         * @param {number} total The total data that was to be processed, in bytes.
         * @private
         */
        private abort_(total: number): void;

        /**
         * Dispatch a progress event.
         *
         * @param {goog.fs.FileReader.EventType} type The event type.
         * @param {number} loaded The number of bytes processed.
         * @param {number} total The total data that was to be processed, in bytes.
         * @private
         */
        private progressEvent_(type: goog.fs.FileReader.EventType, loaded: number, total: number): void;
    }
}

declare namespace goog.testing.fs.FileReader {
    /**
     * The possible return types.
     * @enum {number}
     */
    enum ReturnType { TEXT, BINARY_STRING, ARRAY_BUFFER, DATA_URL }
}
