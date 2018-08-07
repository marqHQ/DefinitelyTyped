/// <reference path="../../../globals.d.ts"/>
/// <reference path="./xmlhttpfactory.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>

declare module 'goog:goog.net.FetchXmlHttpFactory' {
    import alias = goog.net.FetchXmlHttpFactory;
    export default alias;
}

declare module 'goog:goog.net.FetchXmlHttp' {
    import alias = goog.net.FetchXmlHttp;
    export default alias;
}

declare namespace goog.net {
    /**
     * Factory for creating Xhr objects that uses the native fetch() method.
     * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     * Note that this factory is intended for use in Service Worker only.
     * @extends {goog.net.XmlHttpFactory}
     * @struct
     */
    class FetchXmlHttpFactory extends __FetchXmlHttpFactory {}
    abstract class __FetchXmlHttpFactory extends goog.net.__XmlHttpFactory {
        /**
         * @param {!WorkerGlobalScope} worker The Service Worker global scope.
         */
        constructor(worker: WorkerGlobalScope);

        /** @private @final {!WorkerGlobalScope} */
        private worker_: any /*missing*/;

        /** @private {!RequestCredentials|undefined} */
        private credentialsMode_: any /*missing*/;

        /** @private {!RequestCache|undefined} */
        private cacheMode_: any /*missing*/;

        /**
         * @param {!RequestCredentials} credentialsMode The credentials mode of the
         *     Service Worker fetch.
         */
        setCredentialsMode(credentialsMode: RequestCredentials): void;

        /**
         * @param {!RequestCache} cacheMode The cache mode of the Service Worker fetch.
         */
        setCacheMode(cacheMode: RequestCache): void;
    }

    /**
     * FetchXmlHttp object constructor.
     * @extends {goog.events.EventTarget}
     * @implements {goog.net.XhrLike}
     * @struct
     */
    class FetchXmlHttp extends __FetchXmlHttp {}
    abstract class __FetchXmlHttp extends goog.events.__EventTarget implements goog.net.XhrLike {
        /**
         * @param {!WorkerGlobalScope} worker
         */
        constructor(worker: WorkerGlobalScope);

        /** @private @final {!WorkerGlobalScope} */
        private worker_: any /*missing*/;

        /** @private {RequestCredentials|undefined} */
        private credentialsMode_: any /*missing*/;

        /** @private {RequestCache|undefined} */
        private cacheMode_: any /*missing*/;

        /**
         * Request method (GET or POST).
         * @private {string}
         */
        private method_: any /*missing*/;

        /**
         * Request URL.
         * @private {string}
         */
        private url_: any /*missing*/;

        /**
         * Whether the request is in progress.
         * @private {boolean}
         */
        private inProgress_: any /*missing*/;

        /** @private @final {?goog.log.Logger} */
        private logger_: any /*missing*/;

        /**
         * Handles the fetch response.
         * @param {!Response} response
         * @private
         */
        private handleResponse_(response: Response): void;

        /**
         * Handles the response text.
         * @param {!Response} response
         * @param {string} responseText
         * @private
         */
        private handleResponseText_(response: Response, responseText: string): void;

        /**
         * Handles the send failure.
         * @param {*} error
         * @private
         */
        private handleSendFailure_(error: any): void;

        /**
         * @param {!RequestCredentials} credentialsMode The credentials mode of the
         *     Service Worker fetch.
         */
        setCredentialsMode(credentialsMode: RequestCredentials): void;

        /**
         * @param {!RequestCache} cacheMode The cache mode of the Service Worker fetch.
         */
        setCacheMode(cacheMode: RequestCache): void;

        /**
         * Dispatches the callback, if the callback attribute is defined.
         * @private
         */
        private dispatchCallback_(): void;

        /**
         * @type {function()|null|undefined}
         * @see http://www.w3.org/TR/XMLHttpRequest/#handler-xhr-onreadystatechange
         */
        onreadystatechange: (() => void)|null|undefined;

        /**
         * @type {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute
         */
        responseText: string;

        /**
         * @type {Document}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-responsexml-attribute
         */
        responseXML: Document;

        /**
         * @type {number}
         * @see http://www.w3.org/TR/XMLHttpRequest/#readystate
         */
        readyState: number;

        /**
         * @type {number}
         * @see http://www.w3.org/TR/XMLHttpRequest/#status
         */
        status: number;

        /**
         * @type {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#statustext
         */
        statusText: string;

        /**
         * @param {string} method
         * @param {string} url
         * @param {?boolean=} opt_async
         * @param {?string=} opt_user
         * @param {?string=} opt_password
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
         */
        open(method: string, url: string, opt_async?: boolean|null, opt_user?: string|null, opt_password?: string|null):
            void;

        /**
         * @param {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string=} opt_data
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
         */
        send(opt_data?: ArrayBuffer|ArrayBufferView|Blob|Document|FormData|string): void;

        /**
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
         */
        abort(): void;

        /**
         * @param {string} header
         * @param {string} value
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
         */
        setRequestHeader(header: string, value: string): void;

        /**
         * @param {string} header
         * @return {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
         */
        getResponseHeader(header: string): string;

        /**
         * @return {string}
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
         */
        getAllResponseHeaders(): string;
    }
}

declare namespace goog.net.FetchXmlHttp {
    /**
     * State of the requests.
     * @enum {number}
     */
    enum RequestState { UNSENT, OPENED, HEADER_RECEIVED, LOADING, DONE }
}
