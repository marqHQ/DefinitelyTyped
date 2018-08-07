/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../net/xhriopool.d.ts"/>
/// <reference path="./xhrio.d.ts"/>

declare module 'goog:goog.testing.net.XhrIoPool' {
    import alias = goog.testing.net.XhrIoPool;
    export default alias;
}

declare namespace goog.testing.net {
    /**
     * A pool containing a single mock XhrIo object.
     *
     * @extends {goog.net.XhrIoPool}
     * @final
     */
    class XhrIoPool extends __XhrIoPool {}
    abstract class __XhrIoPool extends goog.net.__XhrIoPool {
        /**
         * @param {goog.testing.net.XhrIo=} opt_xhr The mock XhrIo object.
         */
        constructor(opt_xhr?: goog.testing.net.XhrIo);

        /**
         * The mock XhrIo object.
         * @type {!goog.testing.net.XhrIo}
         * @private
         */
        private xhr_: goog.testing.net.XhrIo;

        /**
         * Get the mock XhrIo used by this pool.
         *
         * @return {!goog.testing.net.XhrIo} The mock XhrIo.
         */
        getXhr(): goog.testing.net.XhrIo;
    }
}
