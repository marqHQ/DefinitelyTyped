/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/event.d.ts"/>

declare module 'goog:goog.testing.events.EventObserver' {
    import alias = goog.testing.events.EventObserver;
    export default alias;
}

declare namespace goog.testing.events {
    /**
     * Event observer.  Implements a handleEvent interface so it may be used as
     * a listener in listening functions and methods.
     * @see goog.events.listen
     * @see goog.events.EventHandler
     * @final
     */
    class EventObserver extends __EventObserver {}
    abstract class __EventObserver {
        /**
         */
        constructor();

        /**
         * A list of events handled by the observer in order of handling, oldest to
         * newest.
         * @type {!Array<!goog.events.Event>}
         * @private
         */
        private events_: goog.events.Event[];

        /**
         * Handles an event and remembers it.  Event listening functions and methods
         * will call this method when this observer is used as a listener.
         * @see goog.events.listen
         * @see goog.events.EventHandler
         * @param {!goog.events.Event} e Event to handle.
         */
        handleEvent(e: goog.events.Event): void;

        /**
         * @param {string=} opt_type If given, only return events of this type.
         * @return {!Array<!goog.events.Event>} The events handled, oldest to newest.
         */
        getEvents(opt_type?: string): goog.events.Event[];

        /** Clears the list of events seen by this observer. */
        clear(): void;
    }
}
