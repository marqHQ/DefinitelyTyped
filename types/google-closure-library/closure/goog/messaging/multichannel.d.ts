/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.messaging.MultiChannel' {
    import alias = goog.messaging.MultiChannel;
    export default alias;
}

declare module 'goog:goog.messaging.MultiChannel.VirtualChannel' {
    import alias = goog.messaging.MultiChannel.VirtualChannel;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * Creates a new MultiChannel wrapping a single MessageChannel. The
     * underlying channel shouldn't have any other listeners registered, but it
     * should be connected.
     *
     * Note that the other side of the channel should also be connected to a
     * MultiChannel with the same number of virtual channels.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class MultiChannel extends __MultiChannel {}
    abstract class __MultiChannel extends goog.__Disposable {
        /**
         * @param {goog.messaging.MessageChannel} underlyingChannel The underlying
         *     channel to use as transport for the virtual channels.
         */
        constructor(underlyingChannel: goog.messaging.MessageChannel);

        /**
         * The underlying channel across which all requests are sent.
         * @type {goog.messaging.MessageChannel}
         * @private
         */
        private underlyingChannel_: goog.messaging.MessageChannel;

        /**
         * All the virtual channels that are registered for this MultiChannel.
         * These are null if they've been disposed.
         * @type {Object<?goog.messaging.MultiChannel.VirtualChannel>}
         * @private
         */
        private virtualChannels_: {[key: string]: goog.messaging.MultiChannel.VirtualChannel|null};

        /**
         * Logger object for goog.messaging.MultiChannel.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Creates a new virtual channel that will communicate across the underlying
         * channel.
         * @param {string} name The name of the virtual channel. Must be unique for this
         *     MultiChannel. Cannot contain colons.
         * @return {!goog.messaging.MultiChannel.VirtualChannel} The new virtual
         *     channel.
         */
        createVirtualChannel(name: string): goog.messaging.MultiChannel.VirtualChannel;

        /**
         * Handles the default service for the underlying channel. This dispatches any
         * unrecognized services to the appropriate virtual channel.
         *
         * @param {string} serviceName The name of the service being called.
         * @param {string|!Object} payload The message payload.
         * @private
         */
        private handleDefault_(serviceName: string, payload: string|Object): void;
    }
}

declare namespace goog.messaging.MultiChannel {
    /**
     * A message channel that proxies its messages over another underlying channel.
     *
     * @implements {goog.messaging.MessageChannel}
     * @extends {goog.Disposable}
     * @final
     */
    class VirtualChannel extends __VirtualChannel {}
    abstract class __VirtualChannel extends goog.__Disposable implements goog.messaging.MessageChannel {
        /**
         * @param {goog.messaging.MultiChannel} parent The MultiChannel
         *     which created this channel, and which contains the underlying
         *     MessageChannel that's used as the transport.
         * @param {string} name The name of this virtual channel. Unique among the
         *     virtual channels in parent.
         */
        constructor(parent: goog.messaging.MultiChannel, name: string);

        /**
         * The MultiChannel containing the underlying transport channel.
         * @type {goog.messaging.MultiChannel}
         * @private
         */
        private parent_: goog.messaging.MultiChannel;

        /**
         * The name of this virtual channel.
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * The default service to run if no other services match.
         * @type {?function(string, (string|!Object))}
         * @private
         */
        private defaultService_: ((_0: string, _1: string|Object) => void)|null;

        /**
         * Logger object for goog.messaging.MultiChannel.VirtualChannel.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Wraps a callback with a function that will log a warning and abort if it's
         * called when this channel is disposed.
         *
         * @param {!Function} callback The callback to wrap.
         * @param {...*} var_args Other arguments, passed to the callback.
         * @private
         */
        private doCallback_(callback: Function, ...var_args: any[]): void;

        /**
         * Initiates the channel connection. When this method is called, all the
         * information needed to connect the channel has to be available.
         *
         * Implementers should only require this method to be called if the channel
         * needs to be configured in some way between when it's created and when it
         * becomes active. Otherwise, the channel should be immediately active and this
         * method should do nothing but immediately call opt_connectCb.
         *
         * @param {Function=} opt_connectCb Called when the channel has been connected
         *     and is ready to use.
         */
        connect(opt_connectCb?: Function): void;

        /**
         * Gets whether the channel is connected.
         *
         * If {@link #connect} is not required for this class, this should always return
         * true. Otherwise, this should return true by the time the callback passed to
         * {@link #connect} has been called and always after that.
         *
         * @return {boolean} Whether the channel is connected.
         */
        isConnected(): boolean;

        /**
         * Registers a service to be called when a message is received.
         *
         * Implementers shouldn't impose any restrictions on the service names that may
         * be registered. If some services are needed as control codes,
         * {@link goog.messaging.MultiMessageChannel} can be used to safely split the
         * channel into "public" and "control" virtual channels.
         *
         * @param {string} serviceName The name of the service.
         * @param {function((string|!Object))} callback The callback to process the
         *     incoming messages. Passed the payload. If opt_objectPayload is set, the
         *     payload is decoded and passed as an object.
         * @param {boolean=} opt_objectPayload If true, incoming messages for this
         *     service are expected to contain an object, and will be deserialized from
         *     a string automatically if necessary. It's the responsibility of
         *     implementors of this class to perform the deserialization.
         */
        registerService(serviceName: string, callback: (_0: string|Object) => void, opt_objectPayload?: boolean): void;

        /**
         * Registers a service to be called when a message is received that doesn't
         * match any other services.
         *
         * @param {function(string, (string|!Object))} callback The callback to process
         *     the incoming messages. Passed the service name and the payload. Since
         *     some channels can pass objects natively, the payload may be either an
         *     object or a string.
         */
        registerDefaultService(callback: (_0: string, _1: string|Object) => void): void;

        /**
         * Sends a message over the channel.
         *
         * @param {string} serviceName The name of the service this message should be
         *     delivered to.
         * @param {string|!Object} payload The value of the message. If this is an
         *     Object, it is serialized to a string before sending if necessary. It's
         *     the responsibility of implementors of this class to perform the
         *     serialization.
         */
        send(serviceName: string, payload: string|Object): void;
    }
}
