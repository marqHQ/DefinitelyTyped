/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../events/events.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>

declare module 'goog:goog.testing.messaging.MockMessageEvent' {
    import alias = goog.testing.messaging.MockMessageEvent;
    export default alias;
}

declare namespace goog.testing.messaging {
    /**
     * Creates a new fake MessageEvent.
     *
     * @extends {goog.testing.events.Event}
     * @final
     */
    class MockMessageEvent extends __MockMessageEvent {}
    abstract class __MockMessageEvent extends goog.testing.events.__Event {
        /**
         * @param {*} data The data of the message.
         * @param {string=} opt_origin The origin of the message, for server-sent and
         *     cross-document events.
         * @param {string=} opt_lastEventId The last event ID, for server-sent events.
         * @param {Window=} opt_source The proxy for the source window, for
         *     cross-document events.
         * @param {Array<MessagePort>=} opt_ports The Array of ports sent with the
         *     message, for cross-document and channel events.
         */
        constructor(
            data: any, opt_origin?: string, opt_lastEventId?: string, opt_source?: Window, opt_ports?: MessagePort[]
        );

        /**
         * The data of the message.
         * @type {*}
         */
        data: any;

        /**
         * The origin of the message, for server-sent and cross-document events.
         * @type {?string}
         */
        origin: string|null;

        /**
         * The last event ID, for server-sent events.
         * @type {?string}
         */
        lastEventId: string|null;

        /**
         * The proxy for the source window, for cross-document events.
         * @type {Window}
         */
        source: Window;

        /**
         * The Array of ports sent with the message, for cross-document and channel
         * events.
         * @type {Array<!MessagePort>}
         */
        ports: MessagePort[];
    }
}

declare namespace goog.testing.messaging.MockMessageEvent {
    /**
     * Wraps a new fake MessageEvent in a BrowserEvent, like how a real MessageEvent
     * would be wrapped.
     *
     * @param {*} data The data of the message.
     * @param {string=} opt_origin The origin of the message, for server-sent and
     *     cross-document events.
     * @param {string=} opt_lastEventId The last event ID, for server-sent events.
     * @param {Window=} opt_source The proxy for the source window, for
     *     cross-document events.
     * @param {Array<MessagePort>=} opt_ports The Array of ports sent with the
     *     message, for cross-document and channel events.
     * @return {!goog.events.BrowserEvent} The wrapping event.
     */
    function wrap(
        data: any, opt_origin?: string, opt_lastEventId?: string, opt_source?: Window, opt_ports?: MessagePort[]
    ): goog.events.BrowserEvent;
}
