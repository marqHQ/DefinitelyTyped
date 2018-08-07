/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../structs/map.d.ts"/>
/// <reference path="./xhriopool.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>
/// <reference path="./xhrio.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="./eventtype.d.ts"/>

declare module 'goog:goog.net.XhrManager' {
    import alias = goog.net.XhrManager;
    export default alias;
}

declare module 'goog:goog.net.XhrManager.Request' {
    import alias = goog.net.XhrManager.Request;
    export default alias;
}

declare module 'goog:goog.net.XhrManager.Event' {
    import alias = goog.net.XhrManager.Event;
    export default alias;
}

declare namespace goog.net {
    /**
     * A manager of an XhrIoPool.
     * @extends {goog.events.EventTarget}
     */
    class XhrManager extends __XhrManager {}
    abstract class __XhrManager extends goog.events.__EventTarget {
        /**
         * @param {number=} opt_maxRetries Max. number of retries (Default: 1).
         * @param {goog.structs.Map=} opt_headers Map of default headers to add to every
         *     request.
         * @param {number=} opt_minCount Min. number of objects (Default: 0).
         * @param {number=} opt_maxCount Max. number of objects (Default: 10).
         * @param {number=} opt_timeoutInterval Timeout (in ms) before aborting an
         *     attempt (Default: 0ms).
         * @param {boolean=} opt_withCredentials Add credentials to every request
         *     (Default: false).
         */
        constructor(
            opt_maxRetries?: number,
            opt_headers?: goog.structs.Map<any, any>,
            opt_minCount?: number,
            opt_maxCount?: number,
            opt_timeoutInterval?: number,
            opt_withCredentials?: boolean
        );

        /**
         * Maximum number of retries for a given request
         * @type {number}
         * @private
         */
        private maxRetries_: number;

        /**
         * Timeout interval for an attempt of a given request.
         * @type {number}
         * @private
         */
        private timeoutInterval_: number;

        /**
         * Add credentials to every request.
         * @private {boolean}
         */
        private withCredentials_: any /*missing*/;

        /**
         * The pool of XhrIo's to use.
         * @type {goog.net.XhrIoPool}
         * @private
         */
        private xhrPool_: goog.net.XhrIoPool;

        /**
         * Map of ID's to requests.
         * @type {goog.structs.Map<string, !goog.net.XhrManager.Request>}
         * @private
         */
        private requests_: goog.structs.Map<string, goog.net.XhrManager.Request>;

        /**
         * The event handler.
         * @type {goog.events.EventHandler<!goog.net.XhrManager>}
         * @private
         */
        private eventHandler_: goog.events.EventHandler<goog.net.XhrManager>;

        /**
         * Sets the number of milliseconds after which an incomplete request will be
         * aborted. Zero means no timeout is set.
         * @param {number} ms Timeout interval in milliseconds; 0 means none.
         */
        setTimeoutInterval(ms: number): void;

        /**
         * Returns the number of requests either in flight, or waiting to be sent.
         * The count will include the current request if used within a COMPLETE event
         * handler or callback.
         * @return {number} The number of requests in flight or pending send.
         */
        getOutstandingCount(): number;

        /**
         * Returns an array of request ids that are either in flight, or waiting to
         * be sent. The id of the current request will be included if used within a
         * COMPLETE event handler or callback.
         * @return {!Array<string>} Request ids in flight or pending send.
         */
        getOutstandingRequestIds(): string[];

        /**
         * Registers the given request to be sent. Throws an error if a request
         * already exists with the given ID.
         * NOTE: It is not sent immediately. It is buffered and will be sent when an
         * XhrIo object becomes available, taking into account the request's
         * priority. Note also that requests of equal priority are sent in an
         * implementation specific order - to get FIFO queue semantics use a
         * monotonically increasing priority for successive requests.
         * @param {string} id The id of the request.
         * @param {string} url Uri to make the request to.
         * @param {string=} opt_method Send method, default: GET.
         * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
         *     opt_content Post data.
         * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
         *     request.
         * @param {number=} opt_priority The priority of the request. A smaller value
         *     means a higher priority.
         * @param {Function=} opt_callback Callback function for when request is
         *     complete. The only param is the event object from the COMPLETE event.
         * @param {number=} opt_maxRetries The maximum number of times the request
         *     should be retried.
         * @param {goog.net.XhrIo.ResponseType=} opt_responseType The response type of
         *     this request; defaults to goog.net.XhrIo.ResponseType.DEFAULT.
         * @param {boolean=} opt_withCredentials Add credentials to this request,
         *     default: false.
         * @return {!goog.net.XhrManager.Request} The queued request object.
         */
        send(
            id: string,
            url: string,
            opt_method?: string,
            opt_content?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string,
            opt_headers?: Object|goog.structs.Map<any, any>,
            opt_priority?: number,
            opt_callback?: Function,
            opt_maxRetries?: number,
            opt_responseType?: goog.net.XhrIo.ResponseType,
            opt_withCredentials?: boolean
        ): goog.net.XhrManager.Request;

        /**
         * Aborts the request associated with id.
         * @param {string} id The id of the request to abort.
         * @param {boolean=} opt_force If true, remove the id now so it can be reused.
         *     No events are fired and the callback is not called when forced.
         */
        abort(id: string, opt_force?: boolean): void;

        /**
         * Handles when an XhrIo object becomes available. Sets up the events, fires
         * the READY event, and starts the process to send the request.
         * @param {string} id The id of the request the XhrIo is for.
         * @param {goog.net.XhrIo} xhrIo The available XhrIo object.
         * @private
         */
        private handleAvailableXhr_(id: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Handles all events fired by the XhrIo object for a given request.
         * @param {string} id The id of the request.
         * @param {goog.events.Event} e The event.
         * @return {Object} The return value from the handler, if any.
         * @private
         */
        private handleEvent_(id: string, e: goog.events.Event): Object;

        /**
         * Attempts to retry the given request. If the request has already attempted
         * the maximum number of retries, then it removes the request and releases
         * the XhrIo object back into the pool.
         * @param {string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object.
         * @private
         */
        private retry_(id: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Handles the complete of a request. Dispatches the COMPLETE event and sets the
         * the request as completed if the request has succeeded, or is done retrying.
         * @param {string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object.
         * @param {goog.events.Event} e The original event.
         * @return {Object} The return value from the callback, if any.
         * @private
         */
        private handleComplete_(id: string, xhrIo: goog.net.XhrIo, e: goog.events.Event): Object;

        /**
         * Handles the abort of an underlying XhrIo object.
         * @param {string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object.
         * @private
         */
        private handleAbort_(id: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Handles the success of a request. Dispatches the SUCCESS event and sets the
         * the request as completed.
         * @param {string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object.
         * @private
         */
        private handleSuccess_(id: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Handles the error of a request. If the request has not reach its maximum
         * number of retries, then it lets the request retry naturally (will let the
         * request hit the READY state). Else, it dispatches the ERROR event.
         * @param {string} id The id of the request.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object.
         * @private
         */
        private handleError_(id: string, xhrIo: goog.net.XhrIo): void;

        /**
         * Remove listeners for XHR events on an XhrIo object.
         * @param {goog.net.XhrIo} xhrIo The object to stop listenening to events on.
         * @param {Function} func The callback to remove from event handling.
         * @param {string|Array<string>=} opt_types Event types to remove listeners
         *     for. Defaults to XHR_EVENT_TYPES_.
         * @private
         */
        private removeXhrListener_(xhrIo: goog.net.XhrIo, func: Function, opt_types?: string|string[]): void;

        /**
         * Adds a listener for XHR events on an XhrIo object.
         * @param {goog.net.XhrIo} xhrIo The object listen to events on.
         * @param {Function} func The callback when the event occurs.
         * @param {string|Array<string>=} opt_types Event types to attach listeners to.
         *     Defaults to XHR_EVENT_TYPES_.
         * @private
         */
        private addXhrListener_(xhrIo: goog.net.XhrIo, func: Function, opt_types?: string|string[]): void;
    }
}

declare namespace goog.net.XhrManager {
    /**
     * An event dispatched by XhrManager.
     *
     * @extends {goog.events.Event}
     * @final
     */
    class Event extends __Event {}
    abstract class __Event extends goog.events.__Event {
        /**
         * @param {goog.net.EventType} type Event Type.
         * @param {goog.net.XhrManager} target Reference to the object that is the
         *     target of this event.
         * @param {string} id The id of the request this event is for.
         * @param {goog.net.XhrIo} xhrIo The XhrIo object of the request.
         */
        constructor(type: goog.net.EventType, target: goog.net.XhrManager, id: string, xhrIo: goog.net.XhrIo);

        /**
         * The id of the request this event is for.
         * @type {string}
         */
        id: string;

        /**
         * The XhrIo object of the request.
         * @type {goog.net.XhrIo}
         */
        xhrIo: goog.net.XhrIo;
    }

    /**
     * An encapsulation of everything needed to make a Xhr request.
     * NOTE: This is used internal to the XhrManager.
     *
     * @final
     */
    class Request extends __Request {}
    abstract class __Request {
        /**
         * @param {string} url Uri to make the request too.
         * @param {Function} xhrEventCallback Callback attached to the events of the
         *     XhrIo object of the request.
         * @param {string=} opt_method Send method, default: GET.
         * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=}
         *     opt_content Post data.
         * @param {Object|goog.structs.Map=} opt_headers Map of headers to add to the
         *     request.
         * @param {Function=} opt_callback Callback function for when request is
         *     complete. NOTE: Only 1 callback supported across all events.
         * @param {number=} opt_maxRetries The maximum number of times the request
         *     should be retried (Default: 1).
         * @param {goog.net.XhrIo.ResponseType=} opt_responseType The response type of
         *     this request; defaults to goog.net.XhrIo.ResponseType.DEFAULT.
         * @param {boolean=} opt_withCredentials Add credentials to this request,
         *     default: false.
         *
         */
        constructor(
            url: string,
            xhrEventCallback: Function,
            opt_method?: string,
            opt_content?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string,
            opt_headers?: Object|goog.structs.Map<any, any>,
            opt_callback?: Function,
            opt_maxRetries?: number,
            opt_responseType?: goog.net.XhrIo.ResponseType,
            opt_withCredentials?: boolean
        );

        /**
         * Uri to make the request too.
         * @type {string}
         * @private
         */
        private url_: string;

        /**
         * Send method.
         * @type {string}
         * @private
         */
        private method_: string;

        /**
         * Post data.
         * @type {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined}
         * @private
         */
        private content_: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined;

        /**
         *  Map of headers
         * @type {Object|goog.structs.Map|null}
         * @private
         */
        private headers_: Object|goog.structs.Map<any, any>|null;

        /**
         * The maximum number of times the request should be retried.
         * @type {number}
         * @private
         */
        private maxRetries_: number;

        /**
         * The number of attempts  so far.
         * @type {number}
         * @private
         */
        private attemptCount_: number;

        /**
         * Whether the request has been completed.
         * @type {boolean}
         * @private
         */
        private completed_: boolean;

        /**
         * Whether the request has been aborted.
         * @type {boolean}
         * @private
         */
        private aborted_: boolean;

        /**
         * Callback attached to the events of the XhrIo object.
         * @type {Function}
         * @private
         */
        private xhrEventCallback_: Function;

        /**
         * Callback function called when request is complete.
         * @type {Function|undefined}
         * @private
         */
        private completeCallback_: Function|undefined;

        /**
         * A response type to set on this.xhrIo when it's populated.
         * @type {!goog.net.XhrIo.ResponseType}
         * @private
         */
        private responseType_: goog.net.XhrIo.ResponseType;

        /**
         * Send credentials with this request, or not.
         * @private {boolean}
         */
        private withCredentials_: any /*missing*/;

        /**
         * The XhrIo instance handling this request. Set in handleAvailableXhr.
         * @type {goog.net.XhrIo}
         */
        xhrIo: goog.net.XhrIo;

        /**
         * Gets the uri.
         * @return {string} The uri to make the request to.
         */
        getUrl(): string;

        /**
         * Gets the send method.
         * @return {string} The send method.
         */
        getMethod(): string;

        /**
         * Gets the post data.
         * @return {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined}
         *     The post data.
         */
        getContent(): ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string|undefined;

        /**
         * Gets the map of headers.
         * @return {Object|goog.structs.Map} The map of headers.
         */
        getHeaders(): Object|goog.structs.Map<any, any>;

        /**
         * Gets the withCredentials flag.
         * @return {boolean} Add credentials, or not.
         */
        getWithCredentials(): boolean;

        /**
         * Gets the maximum number of times the request should be retried.
         * @return {number} The maximum number of times the request should be retried.
         */
        getMaxRetries(): number;

        /**
         * Gets the number of attempts so far.
         * @return {number} The number of attempts so far.
         */
        getAttemptCount(): number;

        /**
         * Increases the number of attempts so far.
         */
        increaseAttemptCount(): void;

        /**
         * Returns whether the request has reached the maximum number of retries.
         * @return {boolean} Whether the request has reached the maximum number of
         *     retries.
         */
        hasReachedMaxRetries(): boolean;

        /**
         * Sets the completed status.
         * @param {boolean} complete The completed status.
         */
        setCompleted(complete: boolean): void;

        /**
         * Gets the completed status.
         * @return {boolean} The completed status.
         */
        getCompleted(): boolean;

        /**
         * Sets the aborted status.
         * @param {boolean} aborted True if the request was aborted, otherwise False.
         */
        setAborted(aborted: boolean): void;

        /**
         * Gets the aborted status.
         * @return {boolean} True if request was aborted, otherwise False.
         */
        getAborted(): boolean;

        /**
         * Gets the callback attached to the events of the XhrIo object.
         * @return {Function} The callback attached to the events of the
         *     XhrIo object.
         */
        getXhrEventCallback(): Function;

        /**
         * Gets the callback for when the request is complete.
         * @return {Function|undefined} The callback for when the request is complete.
         */
        getCompleteCallback(): Function|undefined;

        /**
         * Gets the response type that will be set on this request's XhrIo when it's
         * available.
         * @return {!goog.net.XhrIo.ResponseType} The response type to be set
         *     when an XhrIo becomes available to this request.
         */
        getResponseType(): goog.net.XhrIo.ResponseType;
    }
}
