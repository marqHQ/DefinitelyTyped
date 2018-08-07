/// <reference path="../../../globals.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>

declare module 'goog:goog.net.NetworkTester' {
    import alias = goog.net.NetworkTester;
    export default alias;
}

declare namespace goog.net {
    /**
     * Creates an instance of goog.net.NetworkTester which can be used to test
     * for internet connectivity by seeing if an image can be loaded from
     * google.com. It can also be tested with other URLs.
     * @param {Function} callback Callback that is called when the test completes.
     *     The callback takes a single boolean parameter. True indicates the URL
     *     was reachable, false indicates it wasn't.
     * @param {Object=} opt_handler Handler object for the callback.
     * @param {goog.Uri=} opt_uri URI to use for testing.
     * @constructor @struct
     * @final
     */
    function NetworkTester(callback: Function, opt_handler?: Object, opt_uri?: goog.Uri): void;
}

declare namespace goog.net.NetworkTester {
    /**
     * Default timeout
     * @type {number}
     */
    let DEFAULT_TIMEOUT_MS: number;
}
