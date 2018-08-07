/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../messaging/abstractchannel.d.ts"/>
/// <reference path="../mockcontrol.d.ts"/>

declare module 'goog:goog.testing.messaging.MockMessageChannel' {
    import alias = goog.testing.messaging.MockMessageChannel;
    export default alias;
}

declare namespace goog.testing.messaging {
    /**
     * Class for unit-testing code that communicates over a MessageChannel.
     * @extends {goog.messaging.AbstractChannel}
     * @final
     */
    class MockMessageChannel extends __MockMessageChannel {}
    abstract class __MockMessageChannel extends goog.messaging.__AbstractChannel {
        /**
         * @param {goog.testing.MockControl} mockControl The mock control used to create
         *   the method mock for #send.
         */
        constructor(mockControl: goog.testing.MockControl);

        /**
         * Whether the channel has been disposed.
         * @type {boolean}
         */
        disposed: boolean;

        /**
         * Mocks the receipt of a message. Passes the payload the appropriate service.
         * @param {string} serviceName The service to run.
         * @param {string|!Object} payload The argument to pass to the service.
         */
        receive(serviceName: string, payload: string|Object): void;
    }
}
