/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="./multichannel.d.ts"/>
/// <reference path="../timer/timer.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.messaging.BufferedChannel' {
    import alias = goog.messaging.BufferedChannel;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * Creates a new BufferedChannel, which operates like its underlying channel
     * except that it buffers calls to send until it receives a message from its
     * peer claiming that the peer is ready to receive.  The peer is also expected
     * to be a BufferedChannel, though this is not enforced.
     *
     * @extends {goog.Disposable}
     * @implements {goog.messaging.MessageChannel};
     * @final
     */
    class BufferedChannel extends __BufferedChannel {}
    abstract class __BufferedChannel extends goog.__Disposable implements goog.messaging.MessageChannel {
        /**
         * @param {!goog.messaging.MessageChannel} messageChannel The MessageChannel
         *     we're wrapping.
         * @param {number=} opt_interval Polling interval for sending ready
         *     notifications to peer, in ms.  Default is 50.
         */
        constructor(messageChannel: goog.messaging.MessageChannel, opt_interval?: number);

        /**
         * Buffer of messages to be sent when the channel's peer is ready.
         *
         * @type {Array<Object>}
         * @private
         */
        private buffer_: Object[];

        /**
         * Channel dispatcher wrapping the underlying delegate channel.
         *
         * @type {!goog.messaging.MultiChannel}
         * @private
         */
        private multiChannel_: goog.messaging.MultiChannel;

        /**
         * Virtual channel for carrying the user's messages.
         *
         * @type {!goog.messaging.MessageChannel}
         * @private
         */
        private userChannel_: goog.messaging.MessageChannel;

        /**
         * Virtual channel for carrying control messages for BufferedChannel.
         *
         * @type {!goog.messaging.MessageChannel}
         * @private
         */
        private controlChannel_: goog.messaging.MessageChannel;

        /**
         * Timer for the peer ready ping loop.
         *
         * @type {goog.Timer}
         * @private
         */
        private timer_: goog.Timer;

        /**
         * @return {boolean} Whether the channel's peer is ready.
         */
        isPeerReady(): boolean;

        /**
         * Logger.
         *
         * @type {goog.log.Logger}
         * @const
         * @private
         */
        private readonly logger_: goog.log.Logger;

        /**
         * Handles one tick of our peer ready notification loop.  This entails sending a
         * ready ping to the peer and shutting down the loop if we've received a ping
         * ourselves.
         *
         * @private
         */
        private sendReadyPing_(): void;

        /**
         * Whether or not the peer channel is ready to receive messages.
         *
         * @type {boolean}
         * @private
         */
        private peerReady_: boolean;

        /**
         * Marks the channel's peer as ready, then sends buffered messages and nulls the
         * buffer.  Subsequent calls to setPeerReady_ have no effect.
         *
         * @param {(!Object|string)} peerKnowsWeKnowItsReady Passed by the peer to
         *     indicate whether it knows that we've received its ping and that it's
         *     ready.  Non-empty if true, empty if false.
         * @private
         */
        private setPeerReady_(peerKnowsWeKnowItsReady: Object|string): void;

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

declare namespace goog.messaging.BufferedChannel {
}
