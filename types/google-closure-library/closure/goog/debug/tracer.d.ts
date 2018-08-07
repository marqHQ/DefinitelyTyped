/// <reference path="../../../globals.d.ts"/>
/// <reference path="./debug.d.ts"/>

declare module 'goog:goog.debug.Trace' {
    import alias = goog.debug.Trace;
    export default alias;
}

declare module 'goog:goog.debug.StopTraceDetail' {
    import alias = goog.debug.StopTraceDetail;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Class used for singleton goog.debug.Trace.  Used for timing slow points in
     * the code. Based on the java Tracer class but optimized for javascript.
     * See com.google.common.tracing.Tracer.
     * It is also possible to bridge from this class to other tracer classes via
     * adding listeners.
     * @private
     */
    class Trace_ extends __Trace_ {}
    abstract class __Trace_ {
        /**
         */
        constructor();

        /**
         * Events in order.
         * @private {!Array<!goog.debug.Trace_.Event_>}
         */
        private events_: any /*missing*/;

        /**
         * Outstanding events that have started but haven't yet ended. The keys are
         * numeric ids and the values are goog.debug.Trace_.Event_ objects.
         * @private {!goog.structs.Map<number, !goog.debug.Trace_.Event_>}
         */
        private outstandingEvents_: any /*missing*/;

        /**
         * Start time of the event trace
         * @private {number}
         */
        private startTime_: any /*missing*/;

        /**
         * Cummulative overhead of calls to startTracer
         * @private {number}
         */
        private tracerOverheadStart_: any /*missing*/;

        /**
         * Cummulative overhead of calls to endTracer
         * @private {number}
         */
        private tracerOverheadEnd_: any /*missing*/;

        /**
         * Cummulative overhead of calls to addComment
         * @private {number}
         */
        private tracerOverheadComment_: any /*missing*/;

        /**
         * Keeps stats on different types of tracers. The keys are strings and the
         * values are goog.debug.Stat
         * @private {!goog.structs.Map}
         */
        private stats_: any /*missing*/;

        /**
         * Total number of traces created in the trace.
         * @private {number}
         */
        private tracerCount_: any /*missing*/;

        /**
         * Total number of comments created in the trace.
         * @private {number}
         */
        private commentCount_: any /*missing*/;

        /**
         * Next id to use for the trace.
         * @private {number}
         */
        private nextId_: any /*missing*/;

        /**
         * A pool for goog.debug.Trace_.Event_ objects so we don't keep creating and
         * garbage collecting these (which is very expensive in IE6).
         * @private {!goog.structs.SimplePool}
         */
        private eventPool_: any /*missing*/;

        /**
         * A pool for goog.debug.Trace_.Stat_ objects so we don't keep creating and
         * garbage collecting these (which is very expensive in IE6).
         * @private {!goog.structs.SimplePool}
         */
        private statPool_: any /*missing*/;

        /** @private {!goog.structs.SimplePool} */
        private idPool_: any /*missing*/;

        /**
         * Default threshold below which a tracer shouldn't be reported
         * @private {number}
         */
        private defaultThreshold_: any /*missing*/;

        /**
         * An object containing three callback functions to be called when starting or
         * stopping a trace, or creating a comment trace.
         * @private {!goog.debug.Trace_.TracerCallbacks}
         */
        private traceCallbacks_: any /*missing*/;

        /**
         * Logger for the tracer
         * @private @const {?goog.log.Logger}
         */
        private logger_: any /*missing*/;

        /**
         * Maximum size of the trace before we discard events
         * @type {number}
         */
        MAX_TRACE_SIZE: number;

        /**
         * Removes all registered callback functions. Mainly used for testing.
         */
        removeAllListeners(): void;

        /**
         * Adds up to three callback functions which are called on `startTracer`,
         * `stopTracer`, `clearOutstandingEvents_` and `addComment` in
         * order to bridge from the Closure tracer singleton object to any tracer class.
         * @param {!goog.debug.Trace_.TracerCallbacks} callbacks An object literal
         *   containing the callback functions.
         */
        addTraceCallbacks(callbacks: any): void;

        /**
         * Add the ability to explicitly set the start time. This is useful for example
         * for measuring initial load time where you can set a variable as soon as the
         * main page of the app is loaded and then later call this function when the
         * Tracer code has been loaded.
         * @param {number} startTime The start time to set.
         */
        setStartTime(startTime: number): void;

        /**
         * Initializes and resets the current trace
         * @param {number} defaultThreshold The default threshold below which the
         * tracer output will be suppressed. Can be overridden on a per-Tracer basis.
         */
        initCurrentTrace(defaultThreshold: number): void;

        /**
         * Clears the current trace
         */
        clearCurrentTrace(): void;

        /**
         * Clears the open traces and calls stop callback for them.
         * @private
         */
        private clearOutstandingEvents_(): void;

        /**
         * Resets the trace.
         * @param {number} defaultThreshold The default threshold below which the
         * tracer output will be suppressed. Can be overridden on a per-Tracer basis.
         */
        reset(defaultThreshold: number): void;

        /**
         * @private
         */
        private releaseEvents_(): void;

        /**
         * Starts a tracer
         * @param {string} comment A comment used to identify the tracer. Does not
         *     need to be unique.
         * @param {string=} opt_type Type used to identify the tracer. If a Trace is
         *     given a type (the first argument to the constructor) and multiple Traces
         *     are done on that type then a "TOTAL line will be produced showing the
         *     total number of traces and the sum of the time
         *     ("TOTAL Database 2 (37 ms)" in our example). These traces should be
         *     mutually exclusive or else the sum won't make sense (the time will
         *     be double counted if the second starts before the first ends).
         * @return {number} The identifier for the tracer that should be passed to the
         *     the stopTracer method.
         */
        startTracer(comment: string, opt_type?: string): number;

        /**
         * Stops a tracer
         * @param {number|undefined|null} id The id of the tracer that is ending.
         * @param {number=} opt_silenceThreshold Threshold below which the tracer is
         *    silenced.
         * @return {?number} The elapsed time for the tracer or null if the tracer
         *    identitifer was not recognized.
         */
        stopTracer(id: number|undefined|null, opt_silenceThreshold?: number): number|null;

        /**
         * Sets the ActiveX object that can be used to get GC tracing in IE6.
         * @param {Object} gcTracer GCTracer ActiveX object.
         */
        setGcTracer(gcTracer: Object): void;

        /**
         * Returns the total number of allocations since the GC stats were reset. Only
         * works in IE.
         * @return {number} The number of allocaitons or -1 if not supported.
         */
        getTotalVarAlloc(): number;

        /**
         * Adds a comment to the trace. Makes it possible to see when a specific event
         * happened in relation to the traces.
         * @param {string} comment A comment that is inserted into the trace.
         * @param {?string=} opt_type Type used to identify the tracer. If a comment is
         *     given a type and multiple comments are done on that type then a "TOTAL
         *     line will be produced showing the total number of comments of that type.
         * @param {?number=} opt_timeStamp The timestamp to insert the comment. If not
         *    specified, the current time wil be used.
         */
        addComment(comment: string, opt_type?: string|null, opt_timeStamp?: number|null): void;

        /**
         * Gets a stat object for a particular type. The stat object is created if it
         * hasn't yet been.
         * @param {string} type The type of stat.
         * @return {goog.debug.Trace_.Stat_} The stat object.
         * @private
         */
        private getStat_(type: string): any;

        /**
         * Returns a formatted string for the current trace
         * @return {string} A formatted string that shows the timings of the current
         *     trace.
         */
        getFormattedTrace(): string;
    }

    /**
     * Singleton trace object
     * @type {goog.debug.Trace_}
     */
    let Trace: any;

    /**
     * The detail of calling the stop callback for a trace.
     * @record
     */
    interface StopTraceDetail {}
}

declare namespace goog.debug.Trace_ {
    /**
     * Class to keep track of a stat of a single tracer type. Stores the count
     * and cumulative time.
     * @private
     */
    class Stat_ extends __Stat_ {}
    abstract class __Stat_ {
        /**
         */
        constructor();

        /**
         * Number of tracers
         * @type {number}
         */
        count: number;

        /**
         * Cumulative time of traces
         * @type {number}
         */
        time: number;

        /**
         * Total number of allocations for this tracer type
         * @type {number}
         */
        varAlloc: number;

        /**
         * @type {string|null|undefined}
         */
        type: string|null|undefined;
    }

    /**
     * Private class used to encapsulate a single event, either the start or stop
     * of a tracer.
     * @private
     */
    class Event_ extends __Event_ {}
    abstract class __Event_ {
        /**
         */
        constructor();

        /**
         * @type {string|null|undefined}
         */
        type: string|null|undefined;

        /**
         * Returns a formatted string for the event.
         * @param {number} startTime The start time of the trace to generate relative
         * times.
         * @param {number} prevTime The completion time of the previous event or -1.
         * @param {string} indent Extra indent for the message
         *     if there was no previous event.
         * @return {string} The formatted tracer string.
         */
        toTraceString(startTime: number, prevTime: number, indent: string): string;

        /**
         * A callback function to be called at `startTrace` with two parameters:
         * a number as the started trace id and a string as the comment on the trace.
         * @type {function(number, string)|undefined}
         */
        start: ((_0: number, _1: string) => void)|undefined;

        /**
         * A callback function to be called when a trace should be stopped either at
         * `startTrace` or `clearOutstandingEvents_` with two parameters:
         * a number as the id of the trace being stopped and an object containing
         * extra information about stopping the trace (e.g. if it is cancelled).
         * @type {function(number, !goog.debug.StopTraceDetail)|undefined}
         */
        stop: ((_0: number, _1: goog.debug.StopTraceDetail) => void)|undefined;

        /**
         * A callback function to be called at `addComment` with two parameters:
         * a string as the comment on the trace and an optional time stamp number (in
         * milliseconds since epoch) when the comment should be added as a trace.
         * @type {function(string, number=)|undefined}
         */
        comment: ((_0: string, _1: number) => void)|undefined;

        /**
         * The trace should be stopped since it has been cancelled. Note that this
         * field is optional so, not-specifying it is like setting it to false.
         * @type {boolean|undefined}
         */
        wasCancelled: boolean|undefined;
    }

    /**
     * Event type supported by tracer
     * @enum {number}
     */
    enum EventType { START, STOP, COMMENT }

    /**
     * A class to specify the types of the callback functions used by
     * `addTraceCallbacks`.
     * @record
     */
    function TracerCallbacks(): void;

    /**
     * Returns the current time. Done through a wrapper function so it can be
     * overridden by application code. Gmail has an ActiveX extension that provides
     * higher precision timing info.
     * @return {number} The current time in milliseconds.
     */
    function now(): number;
}

declare namespace goog.debug.Trace_.TracerCallbacks {
}
