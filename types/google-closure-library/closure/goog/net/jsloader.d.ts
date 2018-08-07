/// <reference path="../../../globals.d.ts"/>
/// <reference path="../debug/error.d.ts"/>
/// <reference path="../html/trustedresourceurl.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>

declare module 'goog:goog.net.jsloader' {
    export = goog.net.jsloader;
}

declare module 'goog:goog.net.jsloader.Options' {
    import alias = goog.net.jsloader.Options;
    export default alias;
}

declare module 'goog:goog.net.jsloader.ErrorCode' {
    import alias = goog.net.jsloader.ErrorCode;
    export default alias;
}

declare module 'goog:goog.net.jsloader.Error' {
    import alias = goog.net.jsloader.Error;
    export default alias;
}

declare namespace goog.net.jsloader {
    /**
     * A jsloader error.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class Error extends __Error {}
    abstract class __Error extends goog.debug.__Error {
        /**
         * @param {goog.net.jsloader.ErrorCode} code The error code.
         * @param {string=} opt_message Additional message.
         */
        constructor(code: goog.net.jsloader.ErrorCode, opt_message?: string);

        /**
         * The code for this error.
         *
         * @type {goog.net.jsloader.ErrorCode}
         */
        code: goog.net.jsloader.ErrorCode;
    }

    /**
     * The default length of time, in milliseconds, we are prepared to wait for a
     * load request to complete.
     * @type {number}
     */
    let DEFAULT_TIMEOUT: number;

    /**
     * Optional parameters for goog.net.jsloader.send.
     * timeout: The length of time, in milliseconds, we are prepared to wait
     *     for a load request to complete, or 0 or negative for no timeout. Default
     *     is 5 seconds.
     * document: The HTML document under which to load the JavaScript. Default is
     *     the current document.
     * cleanupWhenDone: If true clean up the script tag after script completes to
     *     load. This is important if you just want to read data from the JavaScript
     *     and then throw it away. Default is false.
     * attributes: Additional attributes to set on the script tag.
     *
     * @typedef {{
     *   timeout: (number|undefined),
     *   document: (HTMLDocument|undefined),
     *   cleanupWhenDone: (boolean|undefined),
     *   attributes: (!Object<string, string>|undefined)
     * }}
     */
    interface Options {
        timeout: number|undefined;
        document: HTMLDocument|undefined;
        cleanupWhenDone: boolean|undefined;
        attributes: {[key: string]: string}|undefined;
    }

    /**
     * Loads and evaluates the JavaScript files at the specified URIs, guaranteeing
     * the order of script loads.
     *
     * Because we have to load the scripts in serial (load script 1, exec script 1,
     * load script 2, exec script 2, and so on), this will be slower than doing
     * the network fetches in parallel.
     *
     * If you need to load a large number of scripts but dependency order doesn't
     * matter, you should just call goog.net.jsloader.safeLoad N times.
     *
     * If you need to load a large number of scripts on the same domain,
     * you may want to use goog.module.ModuleLoader.
     *
     * @param {Array<!goog.html.TrustedResourceUrl>} trustedUris The URIs to load.
     * @param {goog.net.jsloader.Options=} opt_options Optional parameters. See
     *     goog.net.jsloader.options documentation for details.
     * @return {!goog.async.Deferred} The deferred result, that may be used to add
     *     callbacks
     */
    function safeLoadMany(trustedUris: goog.html.TrustedResourceUrl[], opt_options?: goog.net.jsloader.Options):
        goog.async.Deferred<any>;

    /**
     * Loads and evaluates a JavaScript file.
     * When the script loads, a user callback is called.
     * It is the client's responsibility to verify that the script ran successfully.
     *
     * @param {!goog.html.TrustedResourceUrl} trustedUri The URI of the JavaScript.
     * @param {goog.net.jsloader.Options=} opt_options Optional parameters. See
     *     goog.net.jsloader.Options documentation for details.
     * @return {!goog.async.Deferred} The deferred result, that may be used to add
     *     callbacks and/or cancel the transmission.
     *     The error callback will be called with a single goog.net.jsloader.Error
     *     parameter.
     */
    function safeLoad(trustedUri: goog.html.TrustedResourceUrl, opt_options?: goog.net.jsloader.Options):
        goog.async.Deferred<any>;

    /**
     * Loads a JavaScript file and verifies it was evaluated successfully, using a
     * verification object.
     * The verification object is set by the loaded JavaScript at the end of the
     * script.
     * We verify this object was set and return its value in the success callback.
     * If the object is not defined we trigger an error callback.
     *
     * @param {!goog.html.TrustedResourceUrl} trustedUri The URI of the JavaScript.
     * @param {string} verificationObjName The name of the verification object that
     *     the loaded script should set.
     * @param {goog.net.jsloader.Options} options Optional parameters. See
     *     goog.net.jsloader.Options documentation for details.
     * @return {!goog.async.Deferred} The deferred result, that may be used to add
     *     callbacks and/or cancel the transmission.
     *     The success callback will be called with a single parameter containing
     *     the value of the verification object.
     *     The error callback will be called with a single goog.net.jsloader.Error
     *     parameter.
     */
    function safeLoadAndVerify(
        trustedUri: goog.html.TrustedResourceUrl, verificationObjName: string, options: goog.net.jsloader.Options
    ): goog.async.Deferred<any>;

    /**
     * Cancels a given request.
     * @this {{script_: Element, timeout_: number}} The request context.
     * @private
     */
    function cancel_(): void;

    /**
     * Possible error codes for jsloader.
     * @enum {number}
     */
    enum ErrorCode { LOAD_ERROR, TIMEOUT, VERIFY_ERROR, VERIFY_OBJECT_ALREADY_EXISTS }
}
