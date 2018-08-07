/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="../log/log.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="./errorcode.d.ts"/>
/// <reference path="../structs/map.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.net.IframeIo' {
    import alias = goog.net.IframeIo;
    export default alias;
}

declare module 'goog:goog.net.IframeIo.IncrementalDataEvent' {
    import alias = goog.net.IframeIo.IncrementalDataEvent;
    export default alias;
}

declare namespace goog.net {
    /**
     * Class for managing requests via iFrames.
     * @extends {goog.events.EventTarget}
     */
    class IframeIo extends __IframeIo {}
    abstract class __IframeIo extends goog.events.__EventTarget {
        /**
         */
        constructor();

        /**
         * Name for this IframeIo and frame
         * @type {string}
         * @private
         */
        private name_: string;

        /**
         * An array of iframes that have been finished with.  We need them to be
         * disposed async, so we don't confuse the browser (see below).
         * @type {Array<Element>}
         * @private
         */
        private iframesForDisposal_: Element[];

        /**
         * Reference to a logger for the IframeIo objects
         * @type {goog.log.Logger}
         * @private
         */
        private logger_: goog.log.Logger;

        /**
         * Reference to form element that gets reused for requests to the iframe.
         * @type {HTMLFormElement}
         * @private
         */
        private form_: HTMLFormElement;

        /**
         * Reference to the iframe being used for the current request, or null if no
         * request is currently active.
         * @type {HTMLIFrameElement}
         * @private
         */
        private iframe_: HTMLIFrameElement;

        /**
         * Name of the iframe being used for the current request, or null if no
         * request is currently active.
         * @type {?string}
         * @private
         */
        private iframeName_: string|null;

        /**
         * Next id so that iframe names are unique.
         * @type {number}
         * @private
         */
        private nextIframeId_: number;

        /**
         * Whether the object is currently active with a request.
         * @type {boolean}
         * @private
         */
        private active_: boolean;

        /**
         * Whether the last request is complete.
         * @type {boolean}
         * @private
         */
        private complete_: boolean;

        /**
         * Whether the last request was a success.
         * @type {boolean}
         * @private
         */
        private success_: boolean;

        /**
         * The URI for the last request.
         * @type {goog.Uri}
         * @private
         */
        private lastUri_: goog.Uri;

        /**
         * The text content of the last request.
         * @type {?string}
         * @private
         */
        private lastContent_: string|null;

        /**
         * Last error code
         * @type {goog.net.ErrorCode}
         * @private
         */
        private lastErrorCode_: goog.net.ErrorCode;

        /**
         * Window timeout ID used to detect when firefox silently fails.
         * @type {?number}
         * @private
         */
        private firefoxSilentErrorTimeout_: number|null;

        /**
         * Window timeout ID used by the timer that disposes the iframes.
         * @type {?number}
         * @private
         */
        private iframeDisposalTimer_: number|null;

        /**
         * This is used to ensure that we don't handle errors twice for the same error.
         * We can reach the {@link #handleError_} method twice in IE if the form is
         * submitted while IE is offline and the URL is not available.
         * @type {boolean}
         * @private
         */
        private errorHandled_: boolean;

        /**
         * Whether to suppress the listeners that determine when the iframe loads.
         * @type {boolean}
         * @private
         */
        private ignoreResponse_: boolean;

        /** @private {Function} */
        private errorChecker_: any /*missing*/;

        /** @private {Object} */
        private lastCustomError_: any /*missing*/;

        /** @private {?string} */
        private lastContentHtml_: any /*missing*/;

        /**
         * Sends a request via an iframe.
         *
         * A HTML form is used and submitted to the iframe, this simplifies the
         * difference between GET and POST requests. The iframe needs to be created and
         * destroyed for each request otherwise the request will contribute to the
         * history stack.
         *
         * sendFromForm does some clever trickery (thanks jlim) in non-IE browsers to
         * stop a history entry being added for POST requests.
         *
         * @param {goog.Uri|string} uri Uri of the request.
         * @param {string=} opt_method Default is GET, POST uses a form to submit the
         *     request.
         * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
         *     caching.
         * @param {Object|goog.structs.Map=} opt_data Map of key-value pairs.
         */
        send(uri: goog.Uri|string, opt_method?: string, opt_noCache?: boolean, opt_data?: Object|goog.structs.Map<any, any>):
            void;

        /**
         * Sends the data stored in an existing form to the server. The HTTP method
         * should be specified on the form, the action can also be specified but can
         * be overridden by the optional URI param.
         *
         * This can be used in conjunction will a file-upload input to upload a file in
         * the background without affecting history.
         *
         * Example form:
         * <pre>
         *   &lt;form action="/server/" enctype="multipart/form-data" method="POST"&gt;
         *     &lt;input name="userfile" type="file"&gt;
         *   &lt;/form&gt;
         * </pre>
         *
         * @param {HTMLFormElement} form Form element used to send the request to the
         *     server.
         * @param {string=} opt_uri Uri to set for the destination of the request, by
         *     default the uri will come from the form.
         * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
         *     caching.
         */
        sendFromForm(form: HTMLFormElement, opt_uri?: string, opt_noCache?: boolean): void;

        /**
         * Abort the current Iframe request
         * @param {goog.net.ErrorCode=} opt_failureCode Optional error code to use -
         *     defaults to ABORT.
         */
        abort(opt_failureCode?: goog.net.ErrorCode): void;

        /**
         * @return {boolean} True if transfer is complete.
         */
        isComplete(): boolean;

        /**
         * @return {boolean} True if transfer was successful.
         */
        isSuccess(): boolean;

        /**
         * @return {boolean} True if a transfer is in progress.
         */
        isActive(): boolean;

        /**
         * Returns the last response text (i.e. the text content of the iframe).
         * Assumes plain text!
         * @return {?string} Result from the server.
         */
        getResponseText(): string|null;

        /**
         * Returns the last response html (i.e. the innerHtml of the iframe).
         * @return {?string} Result from the server.
         */
        getResponseHtml(): string|null;

        /**
         * Parses the content as JSON. This is a legacy method for browsers without
         * JSON.parse or for responses that are not valid JSON (e.g. containing NaN).
         * Use JSON.parse(this.getResponseText()) in the other cases.
         * @return {Object} The parsed content.
         */
        getResponseJson(): Object;

        /**
         * Returns the document object from the last request.  Not truly XML, but
         * used to mirror the XhrIo interface.
         * @return {HTMLDocument} The document object from the last request.
         */
        getResponseXml(): HTMLDocument;

        /**
         * Get the uri of the last request.
         * @return {goog.Uri} Uri of last request.
         */
        getLastUri(): goog.Uri;

        /**
         * Gets the last error code.
         * @return {goog.net.ErrorCode} Last error code.
         */
        getLastErrorCode(): goog.net.ErrorCode;

        /**
         * Gets the last error message.
         * @return {string} Last error message.
         */
        getLastError(): string;

        /**
         * Gets the last custom error.
         * @return {Object} Last custom error.
         */
        getLastCustomError(): Object;

        /**
         * Sets the callback function used to check if a loaded IFrame is in an error
         * state.
         * @param {Function} fn Callback that expects a document object as it's single
         *     argument.
         */
        setErrorChecker(fn: Function): void;

        /**
         * Gets the callback function used to check if a loaded IFrame is in an error
         * state.
         * @return {Function} A callback that expects a document object as it's single
         *     argument.
         */
        getErrorChecker(): Function;

        /**
         * @return {boolean} Whether the server response is being ignored.
         */
        isIgnoringResponse(): boolean;

        /**
         * Sets whether to ignore the response from the server by not adding any event
         * handlers to fire when the iframe loads. This is necessary when using IframeIo
         * to submit to a server on another domain, to avoid same-origin violations when
         * trying to access the response. If this is set to true, the IframeIo instance
         * will be a single-use instance that is only usable for one request.  It will
         * only clean up its resources (iframes and forms) when it is disposed.
         * @param {boolean} ignore Whether to ignore the server response.
         */
        setIgnoreResponse(ignore: boolean): void;

        /**
         * Submits the internal form to the iframe.
         * @private
         */
        private sendFormInternal_(): void;

        /**
         * Handles the load event of the iframe for IE, determines if the request was
         * successful or not, handles clean up and dispatching of appropriate events.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onIeReadyStateChange_(e: goog.events.BrowserEvent): void;

        /**
         * Handles the load event of the iframe for non-IE browsers.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onIframeLoaded_(e: goog.events.BrowserEvent): void;

        /**
         * Handles generic post-load
         * @param {HTMLDocument} contentDocument The frame's document.
         * @private
         */
        private handleLoad_(contentDocument: HTMLDocument): void;

        /**
         * Handles errors.
         * @param {goog.net.ErrorCode} errorCode Error code.
         * @param {Object=} opt_customError If error is CUSTOM_ERROR, this is the
         *     client-provided custom error.
         * @private
         */
        private handleError_(errorCode: goog.net.ErrorCode, opt_customError?: Object): void;

        /**
         * Dispatches an event indicating that the IframeIo instance has received a data
         * packet via incremental loading.  The event object has a 'data' member.
         * @param {Object} data Data.
         * @private
         */
        private handleIncrementalData_(data: Object): void;

        /**
         * Finalizes the request, schedules the iframe for disposal, and maybe disposes
         * the form.
         * @private
         */
        private makeReady_(): void;

        /**
         * Creates an iframe to be used with a request.  We use a new iframe for each
         * request so that requests don't create history entries.
         * @private
         */
        private createIframe_(): void;

        /**
         * Appends the Iframe to the document body.
         * @private
         */
        private appendIframe_(): void;

        /**
         * Schedules an iframe for disposal, async.  We can't remove the iframes in the
         * same execution context as the response, otherwise some versions of Firefox
         * will not detect that the response has correctly finished and the loading bar
         * will stay active forever.
         * @private
         */
        private scheduleIframeDisposal_(): void;

        /**
         * Disposes any iframes.
         * @private
         */
        private disposeIframes_(): void;

        /**
         * Removes all the child nodes from the static form so it can be reused again.
         * This should happen right after sending a request. Otherwise, there can be
         * issues when another iframe uses this form right after the first iframe.
         * @private
         */
        private clearForm_(): void;

        /**
         * Disposes of the Form.  Since IE6 leaks form nodes, this just cleans up the
         * DOM and nullifies the instances reference so the form can be used for another
         * request.
         * @private
         */
        private disposeForm_(): void;

        /**
         * @return {HTMLDocument} The appropriate content document.
         * @private
         */
        private getContentDocument_(): HTMLDocument;

        /**
         * @return {HTMLIFrameElement} The appropriate iframe to use for requests
         *     (created in sendForm_).
         */
        getRequestIframe(): HTMLIFrameElement;

        /**
         * Tests for a silent failure by firefox that can occur when the connection is
         * reset by the server or is made to an illegal URL.
         * @private
         */
        private testForFirefoxSilentError_(): void;
    }
}

declare namespace goog.net.IframeIo {
    /**
     * Class for representing incremental data events.
     * @extends {goog.events.Event}
     * @final
     */
    class IncrementalDataEvent extends __IncrementalDataEvent {}
    abstract class __IncrementalDataEvent extends goog.events.__Event {
        /**
         * @param {Object} data The data associated with the event.
         */
        constructor(data: Object);

        /**
         * The data associated with the event.
         * @type {Object}
         */
        data: Object;
    }

    /**
     * Prefix for frame names
     * @type {string}
     */
    let FRAME_NAME_PREFIX: string;

    /**
     * Suffix that is added to inner frames used for sending requests in non-IE
     * browsers
     * @type {string}
     */
    let INNER_FRAME_SUFFIX: string;

    /**
     * The number of milliseconds after a request is completed to dispose the
     * iframes.  This can be done lazily so we wait long enough for any processing
     * that occurred as a result of the response to finish.
     * @type {number}
     */
    let IFRAME_DISPOSE_DELAY_MS: number;

    /**
     * Static send that creates a short lived instance of IframeIo to send the
     * request.
     * @param {goog.Uri|string} uri Uri of the request, it is up the caller to
     *     manage query string params.
     * @param {Function=} opt_callback Event handler for when request is completed.
     * @param {string=} opt_method Default is GET, POST uses a form to submit the
     *     request.
     * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
     *     caching.
     * @param {Object|goog.structs.Map=} opt_data Map of key-value pairs that
     *     will be posted to the server via the iframe's form.
     */
    function send(uri: goog.Uri|string, opt_callback?: Function, opt_method?: string, opt_noCache?: boolean, opt_data?: Object|goog.structs.Map<any, any>): void;

    /**
     * Find an iframe by name (assumes the context is goog.global since that is
     * where IframeIo's iframes are kept).
     * @param {string} fname The name to find.
     * @return {HTMLIFrameElement} The iframe element with that name.
     */
    function getIframeByName(fname: string): HTMLIFrameElement;

    /**
     * Find an instance of the IframeIo object by name.
     * @param {string} fname The name to find.
     * @return {goog.net.IframeIo} The instance of IframeIo.
     */
    function getInstanceByName(fname: string): goog.net.IframeIo;

    /**
     * Handles incremental data and routes it to the correct iframeIo instance.
     * The HTML page requested by the IframeIo instance should contain script blocks
     * that call an externed reference to this method.
     * @param {Window} win The window object.
     * @param {Object} data The data object.
     */
    function handleIncrementalData(win: Window, data: Object): void;
}
