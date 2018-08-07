/// <reference path="../../../globals.d.ts"/>
/// <reference path="../../../third_party/closure/goog/mochikit/async/deferred.d.ts"/>
/// <reference path="./result_interface.d.ts"/>

declare module 'goog:goog.result.DeferredAdaptor' {
    import alias = goog.result.DeferredAdaptor;
    export default alias;
}

declare namespace goog.result {
    /**
     * An adaptor from Result to a Deferred, for use with existing Deferred chains.
     *
     * @extends {goog.async.Deferred}
     * @final
     * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration
     */
    class DeferredAdaptor extends __DeferredAdaptor {}
    abstract class __DeferredAdaptor extends goog.async.__Deferred<any> {
        /**
         * @param {!goog.result.Result} result A result.
         */
        constructor(result: goog.result.Result);
    }
}
