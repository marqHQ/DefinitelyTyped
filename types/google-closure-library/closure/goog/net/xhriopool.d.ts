/// <reference path="../../../globals.d.ts"/>
/// <reference path="../structs/prioritypool.d.ts"/>
/// <reference path="../structs/map.d.ts"/>

declare module 'goog:goog.net.XhrIoPool' {
    import alias = goog.net.XhrIoPool;
    export default alias;
}

declare namespace goog.net {
    /**
     * A pool of XhrIo objects.
     * @extends {goog.structs.PriorityPool}
     */
    class XhrIoPool extends __XhrIoPool {}
    abstract class __XhrIoPool extends goog.structs.__PriorityPool<any> {
        /**
         * @param {goog.structs.Map=} opt_headers Map of default headers to add to every
         *     request.
         * @param {number=} opt_minCount Minimum number of objects (Default: 0).
         * @param {number=} opt_maxCount Maximum number of objects (Default: 10).
         * @param {boolean=} opt_withCredentials Add credentials to every request
         *     (Default: false).
         */
        constructor(
            opt_headers?: goog.structs.Map<any, any>,
            opt_minCount?: number,
            opt_maxCount?: number,
            opt_withCredentials?: boolean
        );

        /**
         * Map of default headers to add to every request.
         * @type {goog.structs.Map|undefined}
         * @private
         */
        private headers_: goog.structs.Map<any, any>|undefined;

        /**
         * Whether a "credentialed" requests are to be sent (ones that is aware of
         * cookies and authentication). This is applicable only for cross-domain
         * requests and more recent browsers that support this part of the HTTP Access
         * Control standard.
         *
         * @see http://www.w3.org/TR/XMLHttpRequest/#the-withcredentials-attribute
         *
         * @private {boolean}
         */
        private withCredentials_: any /*missing*/;
    }
}
