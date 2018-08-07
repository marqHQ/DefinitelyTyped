/// <reference path="../../../globals.d.ts"/>
/// <reference path="./pool.d.ts"/>

declare module 'goog:goog.structs.PriorityPool' {
    import alias = goog.structs.PriorityPool;
    export default alias;
}

declare namespace goog.structs {
    /**
     * A generic pool class. If min is greater than max, an error is thrown.
     * @extends {goog.structs.Pool<VALUE>}
     * @template VALUE
     */
    class PriorityPool<VALUE> extends __PriorityPool<VALUE> {}
    abstract class __PriorityPool<VALUE> extends goog.structs.__Pool<VALUE> {
        /**
         * @param {number=} opt_minCount Min. number of objects (Default: 0).
         * @param {number=} opt_maxCount Max. number of objects (Default: 10).
         */
        constructor(opt_minCount?: number, opt_maxCount?: number);

        /**
         * The key for the most recent timeout created.
         * @private {number|undefined}
         */
        private delayTimeout_: any /*missing*/;

        /**
         * Queue of requests for pool objects.
         * @private {goog.structs.PriorityQueue<VALUE>}
         */
        private requestQueue_: any /*missing*/;

        /**
         * Handles the request queue. Tries to fires off as many queued requests as
         * possible.
         * @private
         */
        private handleQueueRequests_(): void;
    }
}

declare namespace goog.structs.PriorityPool {
}
