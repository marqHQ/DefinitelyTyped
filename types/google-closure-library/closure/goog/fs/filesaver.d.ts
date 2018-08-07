/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./error.d.ts"/>

declare module 'goog:goog.fs.FileSaver' {
    import alias = goog.fs.FileSaver;
    export default alias;
}

declare module 'goog:goog.fs.FileSaver.ReadyState' {
    import alias = goog.fs.FileSaver.ReadyState;
    export default alias;
}

declare module 'goog:goog.fs.FileSaver.EventType' {
    import alias = goog.fs.FileSaver.EventType;
    export default alias;
}

declare namespace goog.fs {
    /**
     * An object for monitoring the saving of files. This emits ProgressEvents of
     * the types listed in {@link goog.fs.FileSaver.EventType}.
     *
     * This should not be instantiated directly. Instead, its subclass
     * {@link goog.fs.FileWriter} should be accessed via
     * {@link goog.fs.FileEntry#createWriter}.
     *
     * @extends {goog.events.EventTarget}
     */
    class FileSaver extends __FileSaver {}
    abstract class __FileSaver extends goog.events.__EventTarget {
        /**
         * @param {!FileSaver} fileSaver The underlying FileSaver object.
         */
        constructor(fileSaver: FileSaver);

        /**
         * The underlying FileSaver object.
         *
         * @type {!FileSaver}
         * @private
         */
        private saver_: FileSaver;

        /**
         * Abort the writing of the file.
         */
        abort(): void;

        /**
         * @return {goog.fs.FileSaver.ReadyState} The current state of the FileSaver.
         */
        getReadyState(): goog.fs.FileSaver.ReadyState;

        /**
         * @return {goog.fs.Error} The error encountered while writing, if any.
         */
        getError(): goog.fs.Error;

        /**
         * Wrap a progress event emitted by the underlying file saver and re-emit it.
         *
         * @param {!ProgressEvent} event The underlying event.
         * @private
         */
        private dispatchProgressEvent_(event: ProgressEvent): void;
    }
}

declare namespace goog.fs.FileSaver {
    /**
     * Possible states for a FileSaver.
     *
     * @enum {number}
     */
    enum ReadyState { INIT, WRITING, DONE }

    /**
     * Events emitted by a FileSaver.
     *
     * @enum {string}
     */
    enum EventType { WRITE_START, PROGRESS, WRITE, ABORT, ERROR, WRITE_END }
}
