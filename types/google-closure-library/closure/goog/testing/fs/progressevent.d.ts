/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/event.d.ts"/>
/// <reference path="../../fs/filesaver.d.ts"/>
/// <reference path="../../fs/filereader.d.ts"/>

declare module 'goog:goog.testing.fs.ProgressEvent' {
    import alias = goog.testing.fs.ProgressEvent;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock progress event.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class ProgressEvent extends __ProgressEvent {}
    abstract class __ProgressEvent extends goog.events.__Event {
        /**
         * @param {!goog.fs.FileSaver.EventType|!goog.fs.FileReader.EventType} type
         *     Event type.
         * @param {number} loaded The number of bytes processed.
         * @param {number} total The total data that was to be processed, in bytes.
         */
        constructor(type: goog.fs.FileSaver.EventType|goog.fs.FileReader.EventType, loaded: number, total: number);

        /**
         * The number of bytes processed.
         * @type {number}
         * @private
         */
        private loaded_: number;

        /**
         * The total data that was to be procesed, in bytes.
         * @type {number}
         * @private
         */
        private total_: number;

        /**
         * @see {goog.fs.ProgressEvent#isLengthComputable}
         * @return {boolean} True if the length is known.
         */
        isLengthComputable(): boolean;

        /**
         * @see {goog.fs.ProgressEvent#getLoaded}
         * @return {number} The number of bytes loaded or written.
         */
        getLoaded(): number;

        /**
         * @see {goog.fs.ProgressEvent#getTotal}
         * @return {number} The total bytes to load or write.
         */
        getTotal(): number;
    }
}
