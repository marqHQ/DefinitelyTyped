/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./messagechannel.d.ts"/>
/// <reference path="./multichannel.d.ts"/>
/// <reference path="../log/log.d.ts"/>

declare module 'goog:goog.messaging.RespondingChannel' {
    import alias = goog.messaging.RespondingChannel;
    export default alias;
}

declare namespace goog.messaging {
    /**
     * Creates a new RespondingChannel wrapping a single MessageChannel.
     * @extends {goog.Disposable}
     */
    class RespondingChannel extends __RespondingChannel {}
    abstract class __RespondingChannel extends goog.__Disposable {
        /**
         * @param {goog.messaging.MessageChannel} messageChannel The messageChannel to
         *     to wrap and allow for responses. This channel must not have any existing
         *     services registered. All service registration must be done through the
         *     {@link RespondingChannel#registerService} api instead. The other end of
         *     channel must also be a RespondingChannel.
         */
        constructor(messageChannel: goog.messaging.MessageChannel);

        /**
         * The message channel wrapped in a MultiChannel so we can send private and
         * public messages on it.
         * @type {goog.messaging.MultiChannel}
         * @private
         */
        private messageChannel_: goog.messaging.MultiChannel;

        /**
         * Map of invocation signatures to function callbacks. These are used to keep
         * track of the asyncronous service invocations so the result of a service
         * call can be passed back to a callback in the calling frame.
         * @type {Object<number, function(Object)>}
         * @private
         */
        private sigCallbackMap_: {[key: number]: (_0: Object) => void};

        /**
         * The virtual channel to send private messages on.
         * @type {goog.messaging.MultiChannel.VirtualChannel}
         * @private
         */
        private privateChannel_: goog.messaging.MultiChannel.VirtualChannel;

        /**
         * The virtual channel to send public messages on.
         * @type {goog.messaging.MultiChannel.VirtualChannel}
         * @private
         */
        private publicChannel_: goog.messaging.MultiChannel.VirtualChannel;

        /**
         * The next signature index to save the callback against.
         * @type {number}
         * @private
         */
        private nextSignatureIndex_: number;

        /**
         * Logger object for goog.messaging.RespondingChannel.
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Gets a random number to use for method invocation results.
         * @return {number} A unique random signature.
         * @private
         */
        private getNextSignature_(): number;

        /**
         * Sends a message over the channel.
         * @param {string} serviceName The name of the service this message should be
         *     delivered to.
         * @param {string|!Object} payload The value of the message. If this is an
         *     Object, it is serialized to a string before sending if necessary.
         * @param {function(?Object)} callback The callback invoked with
         *     the result of the service call.
         */
        send(serviceName: string, payload: string|Object, callback: (_0: Object|null) => void): void;

        /**
         * Receives the results of the peer's service results.
         * @param {!Object|string} message The results from the remote service
         *     invocation.
         * @private
         */
        private callbackServiceHandler_(message: Object|string): void;

        /**
         * Registers a service to be called when a message is received.
         * @param {string} serviceName The name of the service.
         * @param {function(!Object)} callback The callback to process the
         *     incoming messages. Passed the payload.
         */
        registerService(serviceName: string, callback: (_0: Object) => void): void;

        /**
         * A intermediary proxy for service callbacks to be invoked and return their
         * their results to the remote caller's callback.
         * @param {function((string|!Object))} callback The callback to process the
         *     incoming messages. Passed the payload.
         * @param {!Object|string} message The message containing the signature and
         *     the data to invoke the service callback with.
         * @private
         */
        private callbackProxy_(callback: (_0: string|Object) => void, message: Object|string): void;

        /**
         * Sends the results of the service callback to the remote caller's callback.
         * @param {(string|!Object)} result The results of the service callback.
         * @param {string} signature The signature of the request to the service
         *     callback.
         * @private
         */
        private sendResponse_(result: string|Object, signature: string): void;
    }
}

declare namespace goog.messaging.RespondingChannel {
}
