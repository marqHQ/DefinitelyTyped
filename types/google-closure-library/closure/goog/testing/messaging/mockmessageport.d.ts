/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../events/eventtarget.d.ts"/>
/// <reference path="../mockcontrol.d.ts"/>

declare module 'goog:goog.testing.messaging.MockMessagePort' {
    import alias = goog.testing.messaging.MockMessagePort;
    export default alias;
}

declare namespace goog.testing.messaging {
    /**
     * Class for unit-testing code that uses MessagePorts.
     * @extends {goog.events.EventTarget}
     * @final
     */
    class MockMessagePort extends __MockMessagePort {}
    abstract class __MockMessagePort extends goog.events.__EventTarget {
        /**
         * @param {*} id An opaque identifier, used because message ports otherwise have
         *     no distinguishing characteristics.
         * @param {goog.testing.MockControl} mockControl The mock control used to create
         *     the method mock for #postMessage.
         */
        constructor(id: any, mockControl: goog.testing.MockControl);

        /**
         * An opaque identifier, used because message ports otherwise have no
         * distinguishing characteristics.
         * @type {*}
         */
        id: any;

        /**
         * Whether or not the port has been started.
         * @type {boolean}
         */
        started: boolean;

        /**
         * Whether or not the port has been closed.
         * @type {boolean}
         */
        closed: boolean;

        /**
         * A mock postMessage funciton. Actually an instance of
         * {@link goog.testing.FunctionMock}.
         * @param {*} message The message to send.
         * @param {Array<MessagePort>=} opt_ports Ports to send with the message.
         */
        postMessage(message: any, opt_ports?: MessagePort[]): void;

        /**
         * Starts the port.
         */
        start(): void;

        /**
         * Closes the port.
         */
        close(): void;
    }
}
