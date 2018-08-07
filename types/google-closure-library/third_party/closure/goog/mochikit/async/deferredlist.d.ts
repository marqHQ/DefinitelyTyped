/// <reference path="../../../../../globals.d.ts"/>
/// <reference path="./deferred.d.ts"/>

declare module 'goog:goog.async.DeferredList' {
    import alias = goog.async.DeferredList;
    export default alias;
}

declare namespace goog.async {
    /**
     * Constructs an object that waits on the results of multiple asynchronous
     * operations and marshals the results. It is itself a <code>Deferred</code>,
     * and may have an execution sequence of callback functions added to it. Each
     * <code>DeferredList</code> instance is single use and may be fired only once.
     *
     * The default behavior of a <code>DeferredList</code> is to wait for a success
     * or error result from every <code>Deferred</code> in its input list. Once
     * every result is available, the <code>DeferredList</code>'s execution sequence
     * is fired with a list of <code>[success, result]</code> array pairs, where
     * <code>success</code> is a boolean indicating whether <code>result</code> was
     * the product of a callback or errback. The list's completion criteria and
     * result list may be modified by setting one or more of the boolean options
     * documented below.
     *
     * <code>Deferred</code> instances passed into a <code>DeferredList</code> are
     * independent, and may have additional callbacks and errbacks added to their
     * execution sequences after they are passed as inputs to the list.
     *
     * @extends {goog.async.Deferred}
     */
    class DeferredList extends __DeferredList {}
    abstract class __DeferredList extends goog.async.__Deferred<any> {
        /**
         * @param {!Array<!goog.async.Deferred>} list An array of deferred results to
         *     wait for.
         * @param {boolean=} opt_fireOnOneCallback Whether to stop waiting as soon as
         *     one input completes successfully. In this case, the
         *     <code>DeferredList</code>'s callback chain will be called with a two
         *     element array, <code>[index, result]</code>, where <code>index</code>
         *     identifies which input <code>Deferred</code> produced the successful
         *     <code>result</code>.
         * @param {boolean=} opt_fireOnOneErrback Whether to stop waiting as soon as one
         *     input reports an error. The failing result is passed to the
         *     <code>DeferredList</code>'s errback sequence.
         * @param {boolean=} opt_consumeErrors When true, any errors fired by a
         *     <code>Deferred</code> in the input list will be captured and replaced
         *     with a succeeding null result. Any callbacks added to the
         *     <code>Deferred</code> after its use in the <code>DeferredList</code> will
         *     receive null instead of the error.
         * @param {Function=} opt_canceler A function that will be called if the
         *     <code>DeferredList</code> is canceled. @see goog.async.Deferred#cancel
         * @param {Object=} opt_defaultScope The default scope to invoke callbacks or
         *     errbacks in.
         */
        constructor(
            list: goog.async.Deferred<any>[],
            opt_fireOnOneCallback?: boolean,
            opt_fireOnOneErrback?: boolean,
            opt_consumeErrors?: boolean,
            opt_canceler?: Function,
            opt_defaultScope?: Object
        );

        /**
         * The list of Deferred objects to wait for.
         * @const {!Array<!goog.async.Deferred>}
         * @private
         */
        private readonly list_: any /*missing*/;

        /**
         * The stored return values of the Deferred objects.
         * @const {!Array}
         * @private
         */
        private readonly deferredResults_: any /*missing*/;

        /**
         * Whether to fire on the first successful callback instead of waiting for
         * every Deferred to complete.
         * @const {boolean}
         * @private
         */
        private readonly fireOnOneCallback_: any /*missing*/;

        /**
         * Whether to fire on the first error result received instead of waiting for
         * every Deferred to complete.
         * @const {boolean}
         * @private
         */
        private readonly fireOnOneErrback_: any /*missing*/;

        /**
         * Whether to stop error propagation on the input Deferred objects. If the
         * DeferredList sees an error from one of the Deferred inputs, the error will
         * be captured, and the Deferred will be returned to success state with a null
         * return value.
         * @const {boolean}
         * @private
         */
        private readonly consumeErrors_: any /*missing*/;

        /**
         * The number of input deferred objects that have fired.
         * @private {number}
         */
        private numFinished_: any /*missing*/;

        /**
         * Registers the result from an input deferred callback or errback. The result
         * is returned and may be passed to additional handlers in the callback chain.
         *
         * @param {number} index The index of the firing deferred object in the input
         *     list.
         * @param {boolean} success Whether the result is from a callback or errback.
         * @param {*} result The result of the callback or errback.
         * @return {*} The result, to be handled by the next handler in the deferred's
         *     callback chain (if any). If consumeErrors is set, an error result is
         *     replaced with null.
         * @private
         */
        private handleCallback_(index: number, success: boolean, result: any): any;
    }
}

declare namespace goog.async.DeferredList {
    /**
     * Creates a <code>DeferredList</code> that gathers results from multiple
     * <code>Deferred</code> inputs. If all inputs succeed, the callback is fired
     * with the list of results as a flat array. If any input fails, the list's
     * errback is fired immediately with the offending error, and all other pending
     * inputs are canceled.
     *
     * @param {!Array<!goog.async.Deferred>} list The list of <code>Deferred</code>
     *     inputs to wait for.
     * @return {!goog.async.Deferred} The deferred list of results from the inputs
     *     if they all succeed, or the error result of the first input to fail.
     */
    function gatherResults(list: goog.async.Deferred<any>[]): goog.async.Deferred<any>;
}
