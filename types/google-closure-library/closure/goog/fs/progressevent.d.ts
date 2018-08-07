/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.fs.ProgressEvent' {
    import alias = goog.fs.ProgressEvent;
    export default alias;
}

declare namespace goog.fs {
    /**
     * A wrapper for the progress events emitted by the File APIs.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class ProgressEvent extends __ProgressEvent {}
    abstract class __ProgressEvent extends goog.events.__Event {
        /**
         * @param {!ProgressEvent} event The underlying event object.
         * @param {!Object} target The file access object emitting the event.
         */
        constructor(event: ProgressEvent, target: Object);

        /**
         * The underlying event object.
         * @type {!ProgressEvent}
         * @private
         */
        private event_: ProgressEvent;

        /**
         * @return {boolean} Whether or not the total size of the of the file being
         *     saved is known.
         */
        isLengthComputable(): boolean;

        /**
         * @return {number} The number of bytes saved so far.
         */
        getLoaded(): number;

        /**
         * @return {number} The total number of bytes in the file being saved.
         */
        getTotal(): number;
    }
}
