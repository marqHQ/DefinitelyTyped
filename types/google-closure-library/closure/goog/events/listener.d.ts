/// <reference path="../../../globals.d.ts"/>
/// <reference path="./listenable.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>

declare module 'goog:goog.events.Listener' {
    import alias = goog.events.Listener;
    export default alias;
}

declare namespace goog.events {
    /**
     * Simple class that stores information about a listener
     * @implements {goog.events.ListenableKey}
     */
    class Listener extends __Listener {}
    abstract class __Listener implements goog.events.ListenableKey {
        /**
         * @param {function(?):?} listener Callback function.
         * @param {Function} proxy Wrapper for the listener that patches the event.
         * @param {EventTarget|goog.events.Listenable} src Source object for
         *     the event.
         * @param {string} type Event type.
         * @param {boolean} capture Whether in capture or bubble phase.
         * @param {Object=} opt_handler Object in whose context to execute the callback.
         */
        constructor(
            listener: (_0: any) => any,
            proxy: Function,
            src: EventTarget|goog.events.Listenable,
            type: string,
            capture: boolean,
            opt_handler?: Object
        );

        /**
         * A wrapper over the original listener. This is used solely to
         * handle native browser events (it is used to simulate the capture
         * phase and to patch the event object).
         * @type {Function}
         */
        proxy: Function;

        /**
         * Object or node that callback is listening to
         * @type {EventTarget|goog.events.Listenable}
         */
        src: EventTarget|goog.events.Listenable;

        /**
         * The event type.
         * @const {string}
         */
        readonly type: string;

        /**
         * Whether the listener is being called in the capture or bubble phase
         * @const {boolean}
         */
        readonly capture: boolean;

        /**
         * Optional object whose context to execute the listener in
         * @type {Object|undefined}
         */
        handler: Object|undefined;

        /**
         * Whether to remove the listener after it has been called.
         * @type {boolean}
         */
        callOnce: boolean;

        /**
         * Whether the listener has been removed.
         * @type {boolean}
         */
        removed: boolean;

        /**
         * If monitoring the goog.events.Listener instances is enabled, stores the
         * creation stack trace of the Disposable instance.
         * @type {string}
         */
        creationStack: string;

        /**
         * Marks this listener as removed. This also remove references held by
         * this listener object (such as listener and event source).
         */
        markAsRemoved(): void;

        /**
         * The listener function.
         * @type {function(?):?|{handleEvent:function(?):?}|null}
         */
        listener: ((_0: any) => any)|({handleEvent: (_0: any) => any})|null;

        /**
         * A globally unique number to identify the key.
         * @type {number}
         */
        key: number;
    }
}
