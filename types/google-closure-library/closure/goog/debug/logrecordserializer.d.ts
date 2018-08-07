/// <reference path="../../../globals.d.ts"/>
/// <reference path="./logrecord.d.ts"/>

declare module 'goog:goog.debug.logRecordSerializer' {
    import alias = goog.debug.logRecordSerializer;
    export default alias;
}

declare namespace goog.debug.logRecordSerializer {
    /**
     * Serializes a LogRecord to a JSON string.  Note that any associated
     * exception is likely to be lost.
     * @param {goog.debug.LogRecord} record The record to serialize.
     * @return {string} Serialized JSON string of the log message.
     * @suppress {strictMissingProperties} message is not defined on Object
     */
    function serialize(record: goog.debug.LogRecord): string;

    /**
     * Deserializes a JSON-serialized LogRecord.
     * @param {string} s The JSON serialized record.
     * @return {!goog.debug.LogRecord} The deserialized record.
     */
    function parse(s: string): goog.debug.LogRecord;
}
