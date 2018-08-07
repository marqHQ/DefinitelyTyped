/// <reference path="../../../globals.d.ts"/>
/// <reference path="./logrecord.d.ts"/>
/// <reference path="./logger.d.ts"/>

declare module 'goog:goog.debug.LogBuffer' {
    import alias = goog.debug.LogBuffer;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Creates the log buffer.
     * @final
     */
    class LogBuffer extends __LogBuffer {}
    abstract class __LogBuffer {
        /**
         */
        constructor();

        /**
         * The array to store the records.
         * @type {!Array<!goog.debug.LogRecord|undefined>}
         * @private
         */
        private buffer_: goog.debug.LogRecord|undefined[];

        /**
         * The index of the most recently added record or -1 if there are no records.
         * @type {number}
         * @private
         */
        private curIndex_: number;

        /**
         * Whether the buffer is at capacity.
         * @type {boolean}
         * @private
         */
        private isFull_: boolean;

        /**
         * Adds a log record to the buffer, possibly overwriting the oldest record.
         * @param {goog.debug.Logger.Level} level One of the level identifiers.
         * @param {string} msg The string message.
         * @param {string} loggerName The name of the source logger.
         * @return {!goog.debug.LogRecord} The log record.
         */
        addRecord(level: goog.debug.Logger.Level, msg: string, loggerName: string): goog.debug.LogRecord;

        /**
         * Removes all buffered log records.
         */
        clear(): void;

        /**
         * Calls the given function for each buffered log record, starting with the
         * oldest one.
         * @param {function(!goog.debug.LogRecord)} func The function to call.
         */
        forEachRecord(func: (_0: goog.debug.LogRecord) => void): void;
    }
}

declare namespace goog.debug.LogBuffer {
    /**
     * A static method that always returns the same instance of LogBuffer.
     * @return {!goog.debug.LogBuffer} The LogBuffer singleton instance.
     */
    function getInstance(): goog.debug.LogBuffer;

    /**
     * @return {boolean} Whether the log buffer is enabled.
     */
    function isBufferingEnabled(): boolean;
}
