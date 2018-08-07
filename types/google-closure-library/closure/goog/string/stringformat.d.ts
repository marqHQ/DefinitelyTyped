/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.string.format' {
    import alias = goog.string.format;
    export default alias;
}

declare namespace goog.string {
    /**
     * Performs sprintf-like conversion, i.e. puts the values in a template.
     * DO NOT use it instead of built-in conversions in simple cases such as
     * 'Cost: %.2f' as it would introduce unnecessary latency opposed to
     * 'Cost: ' + cost.toFixed(2).
     * @param {string} formatString Template string containing % specifiers.
     * @param {...string|number} var_args Values formatString is to be filled with.
     * @return {string} Formatted string.
     */
    function format(formatString: string, ...var_args: (string|number)[]): string;
}

declare namespace goog._string.format {
}
