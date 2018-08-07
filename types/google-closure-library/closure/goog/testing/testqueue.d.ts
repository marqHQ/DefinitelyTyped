/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.testing.TestQueue' {
    import alias = goog.testing.TestQueue;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Generic queue for writing unit tests
     */
    class TestQueue extends __TestQueue {}
    abstract class __TestQueue {
        /**
         */
        constructor();

        /**
         * Events that have accumulated
         * @type {Array<Object>}
         * @private
         */
        private events_: Object[];

        /**
         * Adds a new event onto the queue.
         * @param {Object} event The event to queue.
         */
        enqueue(event: Object): void;

        /**
         * Returns whether the queue is empty.
         * @return {boolean} Whether the queue is empty.
         */
        isEmpty(): boolean;

        /**
         * Gets the next event from the queue. Throws an exception if the queue is
         * empty.
         * @param {string=} opt_comment Comment if the queue is empty.
         * @return {Object} The next event from the queue.
         */
        dequeue(opt_comment?: string): Object;
    }
}
