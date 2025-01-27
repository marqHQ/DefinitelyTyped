/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./events.d.ts"/>
/// <reference path="./eventid.d.ts"/>
/// <reference path="./eventtarget.d.ts"/>
/// <reference path="./eventwrapper.d.ts"/>
/// <reference path="./event.d.ts"/>

declare module 'goog:goog.events.EventHandler' {
    import alias = goog.events.EventHandler;
    export default alias;
}

declare namespace goog.events {
    /**
     * Super class for objects that want to easily manage a number of event
     * listeners.  It allows a short cut to listen and also provides a quick way
     * to remove all events listeners belonging to this object.
     * @extends {goog.Disposable}
     * @template SCOPE
     */
    class EventHandler<SCOPE> extends __EventHandler<SCOPE> {}
    abstract class __EventHandler<SCOPE> extends goog.__Disposable {
        /**
         * @param {SCOPE=} opt_scope Object in whose scope to call the listeners.
         */
        constructor(opt_scope?: SCOPE);

        /**
         * Keys for events that are being listened to.
         * @type {!Object<!goog.events.Key>}
         * @private
         */
        private keys_: {[key: string]: goog.events.Key};

        /**
         * Listen to an event on a Listenable.  If the function is omitted then the
         * EventHandler's handleEvent method will be used.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(this:SCOPE, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
         *     opt_fn Optional callback function to be used as the listener or an object
         *     with handleEvent function.
         * @param {(boolean|!AddEventListenerOptions)=} opt_options
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template EVENTOBJ, THIS
         */
        listen<EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            opt_fn?: ((this: SCOPE, _0: EVENTOBJ) => any)|({handleEvent: (_0: any) => any})|null,
            opt_options?: boolean|AddEventListenerOptions
        ): this;

        /**
         * Listen to an event on a Listenable.  If the function is omitted then the
         * EventHandler's handleEvent method will be used.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(this:T, EVENTOBJ):?|{handleEvent:function(this:T, ?):?}|
         *     null|undefined} fn Optional callback function to be used as the
         *     listener or an object with handleEvent function.
         * @param {boolean|!AddEventListenerOptions|undefined} options
         * @param {T} scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template T, EVENTOBJ, THIS
         */
        listenWithScope<T, EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            fn: ((this: T, _0: EVENTOBJ) => any)|({handleEvent: (this: T, _0: any) => any})|null|undefined,
            options: boolean|AddEventListenerOptions|undefined,
            scope: T
        ): this;

        /**
         * Listen to an event on a Listenable.  If the function is omitted then the
         * EventHandler's handleEvent method will be used.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(EVENTOBJ):?|{handleEvent:function(?):?}|null=} opt_fn
         *     Optional callback function to be used as the listener or an object with
         *     handleEvent function.
         * @param {(boolean|!AddEventListenerOptions)=} opt_options
         * @param {Object=} opt_scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template EVENTOBJ, THIS
         * @private
         */
        private listen_<EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            opt_fn?: ((_0: EVENTOBJ) => any)|({handleEvent: (_0: any) => any})|null,
            opt_options?: boolean|AddEventListenerOptions,
            opt_scope?: Object
        ): this;

        /**
         * Listen to an event on a Listenable.  If the function is omitted, then the
         * EventHandler's handleEvent method will be used. After the event has fired the
         * event listener is removed from the target. If an array of event types is
         * provided, each event type will be listened to once.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(this:SCOPE, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
         * opt_fn
         *    Optional callback function to be used as the listener or an object with
         *    handleEvent function.
         * @param {(boolean|!AddEventListenerOptions)=} opt_options
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template EVENTOBJ, THIS
         */
        listenOnce<EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            opt_fn?: ((this: SCOPE, _0: EVENTOBJ) => any)|({handleEvent: (_0: any) => any})|null,
            opt_options?: boolean|AddEventListenerOptions
        ): this;

        /**
         * Listen to an event on a Listenable.  If the function is omitted, then the
         * EventHandler's handleEvent method will be used. After the event has fired the
         * event listener is removed from the target. If an array of event types is
         * provided, each event type will be listened to once.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(this:T, EVENTOBJ):?|{handleEvent:function(this:T, ?):?}|
         *     null|undefined} fn Optional callback function to be used as the
         *     listener or an object with handleEvent function.
         * @param {boolean|undefined} capture Optional whether to use capture phase.
         * @param {T} scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template T, EVENTOBJ, THIS
         */
        listenOnceWithScope<T, EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            fn: ((this: T, _0: EVENTOBJ) => any)|({handleEvent: (this: T, _0: any) => any})|null|undefined,
            capture: boolean|undefined,
            scope: T
        ): this;

        /**
         * Listen to an event on a Listenable.  If the function is omitted, then the
         * EventHandler's handleEvent method will be used. After the event has fired
         * the event listener is removed from the target. If an array of event types is
         * provided, each event type will be listened to once.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type to listen for or array of event types.
         * @param {function(EVENTOBJ):?|{handleEvent:function(?):?}|null=} opt_fn
         *    Optional callback function to be used as the listener or an object with
         *    handleEvent function.
         * @param {(boolean|!AddEventListenerOptions)=} opt_options
         * @param {Object=} opt_scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template EVENTOBJ, THIS
         * @private
         */
        private listenOnce_<EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            opt_fn?: ((_0: EVENTOBJ) => any)|({handleEvent: (_0: any) => any})|null,
            opt_options?: boolean|AddEventListenerOptions,
            opt_scope?: Object
        ): this;

        /**
         * Adds an event listener with a specific event wrapper on a DOM Node or an
         * object that has implemented {@link goog.events.EventTarget}. A listener can
         * only be added once to an object.
         *
         * @param {EventTarget|goog.events.EventTarget} src The node to listen to
         *     events on.
         * @param {goog.events.EventWrapper} wrapper Event wrapper to use.
         * @param {function(this:SCOPE, ?):?|{handleEvent:function(?):?}|null} listener
         *     Callback method, or an object with a handleEvent function.
         * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
         *     false).
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template THIS
         */
        listenWithWrapper(
            src: EventTarget|goog.events.EventTarget,
            wrapper: goog.events.EventWrapper,
            listener: ((this: SCOPE, _0: any) => any)|({handleEvent: (_0: any) => any})|null,
            opt_capt?: boolean
        ): this;

        /**
         * Adds an event listener with a specific event wrapper on a DOM Node or an
         * object that has implemented {@link goog.events.EventTarget}. A listener can
         * only be added once to an object.
         *
         * @param {EventTarget|goog.events.EventTarget} src The node to listen to
         *     events on.
         * @param {goog.events.EventWrapper} wrapper Event wrapper to use.
         * @param {function(this:T, ?):?|{handleEvent:function(this:T, ?):?}|null}
         *     listener Optional callback function to be used as the
         *     listener or an object with handleEvent function.
         * @param {boolean|undefined} capture Optional whether to use capture phase.
         * @param {T} scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template T, THIS
         */
        listenWithWrapperAndScope<T>(
            src: EventTarget|goog.events.EventTarget,
            wrapper: goog.events.EventWrapper,
            listener: ((this: T, _0: any) => any)|({handleEvent: (this: T, _0: any) => any})|null,
            capture: boolean|undefined,
            scope: T
        ): this;

        /**
         * Adds an event listener with a specific event wrapper on a DOM Node or an
         * object that has implemented {@link goog.events.EventTarget}. A listener can
         * only be added once to an object.
         *
         * @param {EventTarget|goog.events.EventTarget} src The node to listen to
         *     events on.
         * @param {goog.events.EventWrapper} wrapper Event wrapper to use.
         * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
         *     method, or an object with a handleEvent function.
         * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
         *     false).
         * @param {Object=} opt_scope Element in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template THIS
         * @private
         */
        private listenWithWrapper_(
            src: EventTarget|goog.events.EventTarget,
            wrapper: goog.events.EventWrapper,
            listener: ((_0: any) => any)|({handleEvent: (_0: any) => any})|null,
            opt_capt?: boolean,
            opt_scope?: Object
        ): this;

        /**
         * @return {number} Number of listeners registered by this handler.
         */
        getListenerCount(): number;

        /**
         * Unlistens on an event.
         * @param {goog.events.ListenableType} src Event source.
         * @param {string|Array<string>|
         *     !goog.events.EventId<EVENTOBJ>|!Array<!goog.events.EventId<EVENTOBJ>>}
         *     type Event type or array of event types to unlisten to.
         * @param {function(this:?, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
         *     opt_fn Optional callback function to be used as the listener or an object
         *     with handleEvent function.
         * @param {(boolean|!EventListenerOptions)=} opt_options
         * @param {Object=} opt_scope Object in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template EVENTOBJ, THIS
         */
        unlisten<EVENTOBJ>(
            src: goog.events.ListenableType,
            type: string|string[]|goog.events.EventId<EVENTOBJ>|goog.events.EventId<EVENTOBJ>[],
            opt_fn?: any /* jsdoc error */,
            opt_options?: any /* jsdoc error */,
            opt_scope?: any /* jsdoc error */
        ): void;

        /**
         * Removes an event listener which was added with listenWithWrapper().
         *
         * @param {EventTarget|goog.events.EventTarget} src The target to stop
         *     listening to events on.
         * @param {goog.events.EventWrapper} wrapper Event wrapper to use.
         * @param {function(?):?|{handleEvent:function(?):?}|null} listener The
         *     listener function to remove.
         * @param {boolean=} opt_capt In DOM-compliant browsers, this determines
         *     whether the listener is fired during the capture or bubble phase of the
         *     event.
         * @param {Object=} opt_scope Element in whose scope to call the listener.
         * @return {THIS} This object, allowing for chaining of calls.
         * @this {THIS}
         * @template THIS
         */
        unlistenWithWrapper(
            src: EventTarget|goog.events.EventTarget,
            wrapper: goog.events.EventWrapper,
            listener: ((_0: any) => any)|({handleEvent: (_0: any) => any})|null,
            opt_capt?: boolean,
            opt_scope?: Object
        ): this;

        /**
         * Unlistens to all events.
         */
        removeAll(): void;

        /**
         * Default event handler
         * @param {goog.events.Event} e Event object.
         */
        handleEvent(e: goog.events.Event): void;
    }
}

declare namespace goog.events.EventHandler {
}
