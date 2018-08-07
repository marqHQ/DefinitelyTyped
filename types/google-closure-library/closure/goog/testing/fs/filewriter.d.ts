/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="./entry.d.ts"/>
/// <reference path="./file.d.ts"/>
/// <reference path="../../fs/filesaver.d.ts"/>
/// <reference path="../../fs/error.d.ts"/>
/// <reference path="./blob.d.ts"/>

declare module 'goog:goog.testing.fs.FileWriter' {
    import alias = goog.testing.fs.FileWriter;
    export default alias;
}

declare namespace goog.testing.fs {
    /**
     * A mock FileWriter object. This emits the same events as
     * {@link goog.fs.FileSaver} and {@link goog.fs.FileWriter}.
     *
     * @extends {goog.events.EventTarget}
     * @final
     */
    class FileWriter extends __FileWriter {}
    abstract class __FileWriter extends goog.events.__EventTarget {
        /**
         * @param {!goog.testing.fs.FileEntry} fileEntry The file entry to write to.
         */
        constructor(fileEntry: goog.testing.fs.FileEntry);

        /**
         * The file entry to which to write.
         * @type {!goog.testing.fs.FileEntry}
         * @private
         */
        private fileEntry_: goog.testing.fs.FileEntry;

        /**
         * The file blob to write to.
         * @type {!goog.testing.fs.File}
         * @private
         */
        private file_: goog.testing.fs.File;

        /**
         * The current state of the writer.
         * @type {goog.fs.FileSaver.ReadyState}
         * @private
         */
        private readyState_: goog.fs.FileSaver.ReadyState;

        /**
         * The most recent error experienced by this writer.
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
         * The current position in the file.
         * @type {number}
         * @private
         */
        private position_: number;

        /**
         * @see {goog.fs.FileSaver#getReadyState}
         * @return {goog.fs.FileSaver.ReadyState} The ready state.
         */
        getReadyState(): goog.fs.FileSaver.ReadyState;

        /**
         * @see {goog.fs.FileSaver#getError}
         * @return {goog.fs.Error} The error.
         */
        getError(): goog.fs.Error;

        /**
         * @see {goog.fs.FileWriter#getPosition}
         * @return {number} The position.
         */
        getPosition(): number;

        /**
         * @see {goog.fs.FileWriter#getLength}
         * @return {number} The length.
         */
        getLength(): number;

        /**
         * @see {goog.fs.FileSaver#abort}
         */
        abort(): void;

        /**
         * @see {goog.fs.FileWriter#write}
         * @param {!goog.testing.fs.Blob} blob The blob to write.
         */
        write(blob: goog.testing.fs.Blob): void;

        /**
         * @see {goog.fs.FileWriter#truncate}
         * @param {number} size The size to truncate to.
         */
        truncate(size: number): void;

        /**
         * @see {goog.fs.FileWriter#seek}
         * @param {number} offset The offset to seek to.
         */
        seek(offset: number): void;

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
         * @param {goog.fs.FileSaver.EventType} type The type of the event.
         * @param {number} loaded The number of bytes processed.
         * @param {number} total The total data that was to be processed, in bytes.
         * @private
         */
        private progressEvent_(type: goog.fs.FileSaver.EventType, loaded: number, total: number): void;
    }
}
