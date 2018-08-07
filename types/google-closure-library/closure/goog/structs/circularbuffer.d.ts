/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.structs.CircularBuffer' {
    import alias = goog.structs.CircularBuffer;
    export default alias;
}

declare namespace goog.structs {
    /**
     * Class for CircularBuffer.
     * @template T
     */
    class CircularBuffer<T> extends __CircularBuffer<T> {}
    abstract class __CircularBuffer<T> {
        /**
         * @param {number=} opt_maxSize The maximum size of the buffer.
         */
        constructor(opt_maxSize?: number);

        /**
         * Index of the next element in the circular array structure.
         * @private {number}
         */
        private nextPtr_: any /*missing*/;

        /**
         * Maximum size of the the circular array structure.
         * @private {number}
         */
        private maxSize_: any /*missing*/;

        /**
         * Underlying array for the CircularBuffer.
         * @private {!Array<T>}
         */
        private buff_: any /*missing*/;

        /**
         * Adds an item to the buffer. May remove the oldest item if the buffer is at
         * max size.
         * @param {T} item The item to add.
         * @return {T|undefined} The removed old item, if the buffer is at max size.
         *     Return undefined, otherwise.
         */
        add(item: T): T|undefined;

        /**
         * Returns the item at the specified index.
         * @param {number} index The index of the item. The index of an item can change
         *     after calls to `add()` if the buffer is at maximum size.
         * @return {T} The item at the specified index.
         */
        get(index: number): T;

        /**
         * Sets the item at the specified index.
         * @param {number} index The index of the item. The index of an item can change
         *     after calls to `add()` if the buffer is at maximum size.
         * @param {T} item The item to add.
         */
        set(index: number, item: T): void;

        /**
         * Returns the current number of items in the buffer.
         * @return {number} The current number of items in the buffer.
         */
        getCount(): number;

        /**
         * @return {boolean} Whether the buffer is empty.
         */
        isEmpty(): boolean;

        /**
         * Empties the current buffer.
         */
        clear(): void;

        /**
         * @return {!Array<T>} The values in the buffer ordered from oldest to newest.
         */
        getValues(): T[];

        /**
         * Returns the newest values in the buffer up to `count`.
         * @param {number} maxCount The maximum number of values to get. Should be a
         *     positive number.
         * @return {!Array<T>} The newest values in the buffer up to `count`. The
         *     values are ordered from oldest to newest.
         */
        getNewestValues(maxCount: number): T[];

        /** @return {!Array<number>} The indexes in the buffer. */
        getKeys(): number[];

        /**
         * Whether the buffer contains the key/index.
         * @param {number} key The key/index to check for.
         * @return {boolean} Whether the buffer contains the key/index.
         */
        containsKey(key: number): boolean;

        /**
         * Whether the buffer contains the given value.
         * @param {T} value The value to check for.
         * @return {boolean} Whether the buffer contains the given value.
         */
        containsValue(value: T): boolean;

        /**
         * Returns the last item inserted into the buffer.
         * @return {T|null} The last item inserted into the buffer,
         *     or null if the buffer is empty.
         */
        getLast(): T|null;

        /**
         * Helper function to convert an index in the number space of oldest to
         * newest items in the array to the position that the element will be at in the
         * underlying array.
         * @param {number} index The index of the item in a list ordered from oldest to
         *     newest.
         * @return {number} The index of the item in the CircularBuffer's underlying
         *     array.
         * @private
         */
        private normalizeIndex_(index: number): number;
    }
}
