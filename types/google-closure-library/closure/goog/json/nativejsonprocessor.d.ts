/// <reference path="../../../globals.d.ts"/>
/// <reference path="./processor.d.ts"/>
/// <reference path="./json.d.ts"/>

declare module 'goog:goog.json.NativeJsonProcessor' {
    import alias = goog.json.NativeJsonProcessor;
    export default alias;
}

declare namespace goog.json {
    /**
     * A class that parses and stringifies JSON using the browser's built-in JSON
     * library, if it is available.
     *
     * Note that the native JSON api has subtle differences across browsers, so
     * use this implementation with care.  See json_test#assertSerialize
     * for details on the differences from goog.json.
     *
     * This implementation is signficantly faster than goog.json, at least on
     * Chrome.  See json_perf.html for a perf test showing the difference.
     *
     * @implements {goog.json.Processor}
     * @final
     */
    class NativeJsonProcessor extends __NativeJsonProcessor {}
    abstract class __NativeJsonProcessor implements goog.json.Processor {
        /**
         * @param {?goog.json.Replacer=} opt_replacer An optional replacer to use during
         *     serialization.
         * @param {?goog.json.Reviver=} opt_reviver An optional reviver to use during
         *     parsing.
         */
        constructor(opt_replacer?: goog.json.Replacer|null, opt_reviver?: goog.json.Reviver|null);

        /**
         * @type {goog.json.Replacer|null|undefined}
         * @private
         */
        private replacer_: goog.json.Replacer|null|undefined;

        /**
         * @type {goog.json.Reviver|null|undefined}
         * @private
         */
        private reviver_: goog.json.Reviver|null|undefined;

        parse: any;

        stringify: any;
    }
}
