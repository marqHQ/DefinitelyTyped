/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./portnetwork.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.messaging.PortCaller' {
    import alias = goog.messaging.PortCaller;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * The leaf node of a network.
     *
     * @extends {goog.Disposable}
     * @implements {goog.messaging.PortNetwork}
     * @final
     */
    class PortCaller extends __PortCaller {}
    abstract class __PortCaller extends goog.__Disposable implements goog.messaging.PortNetwork {
        /**
         * @param {!goog.messaging.MessageChannel} operatorPort The channel for
         *     communicating with the operator. The other side of this channel should be
         *     passed to {@link goog.messaging.PortOperator#addPort}. Must be either a
         *     {@link goog.messaging.PortChannel} or a decorator wrapping a PortChannel;
         *     in particular, it must be able to send and receive {@link MessagePort}s.
         */
        constructor(operatorPort: goog.messaging.MessageChannel);

        /**
         * The channel to the {@link goog.messaging.PortOperator} for this network.
         *
         * @type {!goog.messaging.MessageChannel}
         * @private
         */
        private operatorPort_: goog.messaging.MessageChannel;

        /**
         * The collection of channels for communicating with other contexts in the
         * network. Each value can contain a {@link goog.aync.Deferred} and/or a
         * {@link goog.messaging.MessageChannel}.
         *
         * If the value contains a Deferred, then the channel is a
         * {@link goog.messaging.DeferredChannel} wrapping that Deferred. The Deferred
         * will be resolved with a {@link goog.messaging.PortChannel} once we receive
         * the appropriate port from the operator. This is the situation when this
         * caller requests a connection to another context; the DeferredChannel is
         * used to queue up messages until we receive the port from the operator.
         *
         * If the value does not contain a Deferred, then the channel is simply a
         * {@link goog.messaging.PortChannel} communicating with the given context.
         * This is the situation when this context received a port for the other
         * context before it was requested.
         *
         * If a value exists for a given key, it must contain a channel, but it
         * doesn't necessarily contain a Deferred.
         *
         * @type {!Object<{deferred: goog.async.Deferred,
         *                  channel: !goog.messaging.MessageChannel}>}
         * @private
         */
        private connections_:
            {[key: string]: {deferred: goog.async.Deferred<any>; channel: goog.messaging.MessageChannel}};

        /**
         * Registers a connection to another context in the network. This is called when
         * the operator sends us one end of a {@link MessageChannel}, either because
         * this caller requested a connection with another context, or because that
         * context requested a connection with this caller.
         *
         * It's possible that the remote context and this one request each other roughly
         * concurrently. The operator doesn't keep track of which contexts have been
         * connected, so it will create two separate {@link MessageChannel}s in this
         * case. However, the first channel created will reach both contexts first, so
         * we simply ignore all connections with a given context after the first.
         *
         * @param {!Object|string} message The name of the context
         *     being connected and the port connecting the context.
         * @private
         */
        private connectionGranted_(message: Object|string): void;

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
