/// <reference path="../../../globals.d.ts"/>
/// <reference path="./processor.d.ts"/>
/// <reference path="./json.d.ts"/>

declare module 'goog:goog.json.EvalJsonProcessor' {
    import alias = goog.json.EvalJsonProcessor;
    export default alias;
}

declare namespace goog.json {
    /**
     * A class that parses and stringifies JSON using eval (as implemented in
     * goog.json).
     * Adapts `goog.json` to the `goog.json.Processor` interface.
     *
     * @implements {goog.json.Processor}
     * @final
     * @deprecated Use goog.json.NativeJsonProcessor.
     */
    class EvalJsonProcessor extends __EvalJsonProcessor {}
    abstract class __EvalJsonProcessor implements goog.json.Processor {
        /**
         * @param {?goog.json.Replacer=} opt_replacer An optional replacer to use during
         *     serialization.
         * @param {?boolean=} opt_useUnsafeParsing Whether to skip validation before
         *     evaluating. Safe parsing is very slow on large strings. On the other
         *     hand, unsafe parsing uses eval() without checking whether the string is
         *     valid, so it should only be used if you trust the source of the string.
         */
        constructor(opt_replacer?: goog.json.Replacer|null, opt_useUnsafeParsing?: boolean|null);

        /**
         * @type {goog.json.Serializer}
         * @private
         */
        private serializer_: goog.json.Serializer;

        /** @private {boolean} */
        private useUnsafeParsing_: any /*missing*/;

        parse(s: string): any;

        stringify(s: string): any;
    }
}
