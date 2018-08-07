/// <reference path="../../../globals.d.ts"/>
/// <reference path="./eventid.d.ts"/>

declare module 'goog:goog.events.EventLike' {
    import alias = goog.events.EventLike;
    export default alias;
}

declare module 'goog:goog.events.Event' {
    import alias = goog.events.Event;
    export default alias;
}

declare namespace goog.events {
    /**
     * A base class for event objects, so that they can support preventDefault and
     * stopPropagation.
     *
     * @suppress {underscore} Several properties on this class are technically
     *     public, but referencing these properties outside this package is strongly
     *     discouraged.
     *
     */
    class Event extends __Event {}
    abstract class __Event {
        /**
         * @param {string|!goog.events.EventId} type Event Type.
         * @param {Object=} opt_target Reference to the object that is the target of
         *     this event. It has to implement the `EventTarget` interface
         *     declared at {@link http://developer.mozilla.org/en/DOM/EventTarget}.
         */
        constructor(type: string|goog.events.EventId<any>, opt_target?: Object);

        /**
         * Event type.
         * @type {string}
         */
        type: string;

        /**
         * TODO(tbreisacher): The type should probably be
         * EventTarget|goog.events.EventTarget.
         *
         * Target of the event.
         * @type {Object|undefined}
         */
        target: Object|undefined;

        /**
         * Object that had the listener attached.
         * @type {Object|undefined}
         */
        currentTarget: Object|undefined;

        /**
         * Whether to cancel the event in internal capture/bubble processing for IE.
         * @type {boolean}
         * @public
         */
        propagationStopped_: boolean;

        /**
         * Whether the default action has been prevented.
         * This is a property to match the W3C specification at
         * {@link http://www.w3.org/TR/DOM-Level-3-Events/
         * #events-event-type-defaultPrevented}.
         * Must be treated as read-only outside the class.
         * @type {boolean}
         */
        defaultPrevented: boolean;

        /**
         * Return value for in internal capture/bubble processing for IE.
         * @type {boolean}
         * @public
         */
        returnValue_: boolean;

        /**
         * Stops event propagation.
         */
        stopPropagation(): void;

        /**
         * Prevents the default action, for example a link redirecting to a url.
         */
        preventDefault(): void;
    }

    /**
     * A typedef for event like objects that are dispatchable via the
     * goog.events.dispatchEvent function. strings are treated as the type for a
     * goog.events.Event. Objects are treated as an extension of a new
     * goog.events.Event with the type property of the object being used as the type
     * of the Event.
     * @typedef {string|Object|goog.events.Event|goog.events.EventId}
     */
    type EventLike = string|Object|goog.events.Event|goog.events.EventId<any>;
}

declare namespace goog.events.Event {
    /**
     * Stops the propagation of the event. It is equivalent to
     * `e.stopPropagation()`, but can be used as the callback argument of
     * {@link goog.events.listen} without declaring another function.
     * @param {!goog.events.Event} e An event.
     */
    function stopPropagation(e: goog.events.Event): void;

    /**
     * Prevents the default action. It is equivalent to
     * `e.preventDefault()`, but can be used as the callback argument of
     * {@link goog.events.listen} without declaring another function.
     * @param {!goog.events.Event} e An event.
     */
    function preventDefault(e: goog.events.Event): void;
}
