/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./portnetwork.d.ts"/>
/// <reference path="./portchannel.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.messaging.PortOperator' {
    import alias = goog.messaging.PortOperator;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * The central node of a PortNetwork.
     *
     * @extends {goog.Disposable}
     * @implements {goog.messaging.PortNetwork}
     * @final
     */
    class PortOperator extends __PortOperator {}
    abstract class __PortOperator extends goog.__Disposable implements goog.messaging.PortNetwork {
        /**
         * @param {string} name The name of this node.
         */
        constructor(name: string);

        /**
         * The collection of channels for communicating with other contexts in the
         * network. These are the channels that are returned to the user, as opposed
         * to the channels used for internal network communication. This is lazily
         * populated as the user requests communication with other contexts, or other
         * contexts request communication with the operator.
         *
         * @type {!Object<!goog.messaging.PortChannel>}
         * @private
         */
        private connections_: {[key: string]: goog.messaging.PortChannel};

        /**
         * The collection of channels for internal network communication with other
         * contexts. This is not lazily populated, and always contains entries for
         * each member of the network.
         *
         * @type {!Object<!goog.messaging.MessageChannel>}
         * @private
         */
        private switchboard_: {[key: string]: goog.messaging.MessageChannel};

        /**
         * The name of the operator context.
         *
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * The logger for PortOperator.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Adds a caller to the network with the given name. This port should have no
         * services registered on it. It will be disposed along with the PortOperator.
         *
         * @param {string} name The name of the port to add.
         * @param {!goog.messaging.MessageChannel} port The port to add. Must be either
         *     a {@link goog.messaging.PortChannel} or a decorator wrapping a
         *     PortChannel; in particular, it must be able to send and receive
         *     {@link MessagePort}s.
         */
        addPort(name: string, port: goog.messaging.MessageChannel): void;

        /**
         * Connects two contexts by creating a {@link MessageChannel} and sending one
         * end to one context and the other end to the other. Called when we receive a
         * request from a caller to connect it to another context (including potentially
         * the operator).
         *
         * @param {string} sourceName The name of the context requesting the connection.
         * @param {!Object|string} message The name of the context to which
         *     the connection is requested.
         * @private
         */
        private requestConnection_(sourceName: string, message: Object|string): void;

        /**
         * Connects together the operator and a caller by creating a
         * {@link MessageChannel} and sending one end to the remote context.
         *
         * @param {string} contextName The name of the context to which to connect the
         *     operator.
         * @private
         */
        private connectSelfToPort_(contextName: string): void;

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
