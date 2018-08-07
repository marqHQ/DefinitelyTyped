/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.async.WorkQueue' {
    import alias = goog.async.WorkQueue;
    export default alias;
}

declare module 'goog:goog.async.WorkItem' {
    import alias = goog.async.WorkItem;
    export default alias;
}

declare namespace goog.async {
    /**
     * A low GC workqueue. The key elements of this design:
     *   - avoids the need for goog.bind or equivalent by carrying scope
     *   - avoids the need for array reallocation by using a linked list
     *   - minimizes work entry objects allocation by recycling objects
     * @final
     * @struct
     */
    class WorkQueue extends __WorkQueue {}
    abstract class __WorkQueue {
        /**
         */
        constructor();

        /**
         * @param {function()} fn
         * @param {Object|null|undefined} scope
         */
        add(fn: () => void, scope: Object|null|undefined): void;

        /**
         * @return {goog.async.WorkItem}
         */
        remove(): goog.async.WorkItem;

        /**
         * @param {goog.async.WorkItem} item
         */
        returnUnused(item: goog.async.WorkItem): void;

        /**
         * @return {goog.async.WorkItem}
         * @private
         */
        private getUnusedItem_(): goog.async.WorkItem;
    }

    /**
     * @final
     * @struct
     */
    class WorkItem extends __WorkItem {}
    abstract class __WorkItem {
        /**
         */
        constructor();

        /** @type {?function()} */
        fn: (() => void)|null;

        /** @type {Object|null|undefined} */
        scope: Object|null|undefined;

        /** @type {?goog.async.WorkItem} */
        next: goog.async.WorkItem|null;

        /**
         * @param {function()} fn
         * @param {Object|null|undefined} scope
         */
        set(fn: () => void, scope: Object|null|undefined): void;

        /** Reset the work item so they don't prevent GC before reuse */
        reset(): void;
    }
}

declare namespace goog.async.WorkQueue {
    /** @const @private {goog.async.FreeList<goog.async.WorkItem>} */
    const freelist_: any /*missing*/;
}
