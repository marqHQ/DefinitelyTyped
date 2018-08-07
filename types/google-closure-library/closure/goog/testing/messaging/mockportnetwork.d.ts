/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../messaging/portnetwork.d.ts"/>
/// <reference path="../mockcontrol.d.ts"/>
/// <reference path="./mockmessagechannel.d.ts"/>
/// <reference path="../../messaging/messagechannel.d.ts"/>

declare module 'goog:goog.testing.messaging.MockPortNetwork' {
    import alias = goog.testing.messaging.MockPortNetwork;
    export default alias;
}

declare namespace goog.testing.messaging {
    /**
     * The fake PortNetwork.
     *
     * @implements {goog.messaging.PortNetwork}
     * @final
     */
    class MockPortNetwork extends __MockPortNetwork {}
    abstract class __MockPortNetwork implements goog.messaging.PortNetwork {
        /**
         * @param {!goog.testing.MockControl} mockControl The mock control for creating
         *     the mock message channels.
         */
        constructor(mockControl: goog.testing.MockControl);

        /**
         * The mock control for creating mock message channels.
         * @type {!goog.testing.MockControl}
         * @private
         */
        private mockControl_: goog.testing.MockControl;

        /**
         * The mock ports that have been created.
         * @type {!Object<!goog.testing.messaging.MockMessageChannel>}
         * @private
         */
        private ports_: {[key: string]: goog.testing.messaging.MockMessageChannel};

        /**
         * Returns a message channel that communicates with the named context. If no
         * such port exists, an error will either be thrown immediately or after a round
         * trip with the operator, depending on whether this pool is the operator or a
         * caller.
         *
         * If context A calls dial('B') and context B calls dial('A'), the two
         * ports returned will be connected to one another.
         *
         * @param {string} name The name of the context to get.
         * @return {goog.messaging.MessageChannel} The channel communicating with the
         *     given context. This is either a {@link goog.messaging.PortChannel} or a
         *     decorator around a PortChannel, so it's safe to send {@link MessagePorts}
         *     across it. This will be disposed along with the PortNetwork.
         */
        dial(name: string): goog.messaging.MessageChannel;
    }
}
