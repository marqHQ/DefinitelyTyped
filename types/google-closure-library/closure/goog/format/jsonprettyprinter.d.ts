/// <reference path="../../../globals.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>

declare module 'goog:goog.format.JsonPrettyPrinter' {
    import alias = goog.format.JsonPrettyPrinter;
    export default alias;
}

declare module 'goog:goog.format.JsonPrettyPrinter.TextDelimiters' {
    import alias = goog.format.JsonPrettyPrinter.TextDelimiters;
    export default alias;
}

declare module 'goog:goog.format.JsonPrettyPrinter.SafeHtmlDelimiters' {
    import alias = goog.format.JsonPrettyPrinter.SafeHtmlDelimiters;
    export default alias;
}

declare namespace goog.format {
    /**
     * Formats a JSON object as a string, properly indented for display.  Supports
     * displaying the string as text or html.  Users can also specify their own
     * set of delimiters for different environments.  For example, the JSON object:
     *
     * <code>{"a": 1, "b": {"c": null, "d": true, "e": [1, 2]}}</code>
     *
     * Will be displayed like this:
     *
     * <code>{
     *   "a": 1,
     *   "b": {
     *     "c": null,
     *     "d": true,
     *     "e": [
     *       1,
     *       2
     *     ]
     *   }
     * }</code>
     */
    class JsonPrettyPrinter extends __JsonPrettyPrinter {}
    abstract class __JsonPrettyPrinter {
        /**
         * @param {?goog.format.JsonPrettyPrinter.TextDelimiters=} opt_delimiters
         *     Container for the various strings to use to delimit objects, arrays,
         *     newlines, and other pieces of the output.
         */
        constructor(opt_delimiters?: goog.format.JsonPrettyPrinter.TextDelimiters|null);

        /**
         * The set of characters to use as delimiters.
         * @private @const {!goog.format.JsonPrettyPrinter.TextDelimiters}
         */
        private delimiters_: any /*missing*/;

        /**
         * Used to serialize property names and values.
         * @private @const {!goog.json.Serializer}
         */
        private jsonSerializer_: any /*missing*/;

        /**
         * Formats a JSON object as a string, properly indented for display.
         * @param {*} json The object to pretty print. It could be a JSON object, a
         *     string representing a JSON object, or any other type.
         * @return {string} Returns a string of the JSON object, properly indented for
         *     display.
         */
        format(json: any): string;

        /**
         * Formats a JSON object as a SafeHtml, properly indented for display.
         * @param {*} json The object to pretty print. It could be a JSON object, a
         *     string representing a JSON object, or any other type.
         * @return {!goog.html.SafeHtml} A HTML code of the JSON object.
         */
        formatSafeHtml(json: any): goog.html.SafeHtml;

        /**
         * Formats a JSON object and returns an output buffer.
         * @param {*} json The object to pretty print.
         * @return {!Array<string|!goog.html.SafeHtml>}
         * @private
         */
        private format_(json: any): string|goog.html.SafeHtml[];

        /**
         * Formats a property value based on the type of the propery.
         * @param {*} val The object to format.
         * @param {!Array<string|!goog.html.SafeHtml>} outputBuffer The buffer to write
         *     the response to.
         * @param {number} indent The number of spaces to indent each line of the
         *     output.
         * @private
         */
        private printObject_(val: any, outputBuffer: string|goog.html.SafeHtml[], indent: number): void;

        /**
         * Prints a property name to the output.
         * @param {string} name The property name.
         * @param {!Array<string|!goog.html.SafeHtml>} outputBuffer The buffer to write
         *     the response to.
         * @private
         */
        private printName_(name: string, outputBuffer: string|goog.html.SafeHtml[]): void;

        /**
         * Prints a property name to the output.
         * @param {string|boolean|number|null} val The property value.
         * @param {string} typeOf The type of the value.  Used to customize
         *     value-specific css in the display.  This allows clients to distinguish
         *     between different types in css.  For example, the client may define two
         *     classes: "goog-jsonprettyprinter-propertyvalue-string" and
         *     "goog-jsonprettyprinter-propertyvalue-number" to assign a different color
         *     to string and number values.
         * @param {!Array<string|!goog.html.SafeHtml>} outputBuffer The buffer to write
         *     the response to.
         * @private
         */
        private printValue_(val: string|boolean|number|null, typeOf: string, outputBuffer: string|goog.html.SafeHtml[]):
            void;

        /**
         * Print a number of space characters to the output.
         * @param {number} indent The number of spaces to indent the line.
         * @param {!Array<string|!goog.html.SafeHtml>} outputBuffer The buffer to write
         *     the response to.
         * @private
         */
        private printSpaces_(indent: number, outputBuffer: string|goog.html.SafeHtml[]): void;
    }
}

declare namespace goog.format.JsonPrettyPrinter {
    /**
     * A container for the delimiting characters used to display the JSON string
     * to a text display.  Each delimiter is a publicly accessible property of
     * the object, which makes it easy to tweak delimiters to specific environments.
     */
    class TextDelimiters extends __TextDelimiters {}
    abstract class __TextDelimiters {
        /**
         */
        constructor();

        /**
         * Represents a space character in the output.  Used to indent properties a
         * certain number of spaces, and to separate property names from property
         * values.
         * @type {string}
         */
        space: string;

        /**
         * Represents a newline character in the output.  Used to begin a new line.
         * @type {string|!goog.html.SafeHtml}
         */
        lineBreak: string|goog.html.SafeHtml;

        /**
         * Represents the start of an object in the output.
         * @type {string}
         */
        objectStart: string;

        /**
         * Represents the end of an object in the output.
         * @type {string}
         */
        objectEnd: string;

        /**
         * Represents the start of an array in the output.
         * @type {string}
         */
        arrayStart: string;

        /**
         * Represents the end of an array in the output.
         * @type {string}
         */
        arrayEnd: string;

        /**
         * Represents the string used to separate properties in the output.
         * @type {string}
         */
        propertySeparator: string;

        /**
         * Represents the string used to separate property names from property values in
         * the output.
         * @type {string|!goog.html.SafeHtml}
         */
        nameValueSeparator: string|goog.html.SafeHtml;

        /**
         * A string that's placed before a property name in the output.  Useful for
         * wrapping a property name in an html tag.
         * @type {string}
         */
        preName: string;

        /**
         * A string that's placed after a property name in the output.  Useful for
         * wrapping a property name in an html tag.
         * @type {string}
         */
        postName: string;

        /**
         * Formats a property name before adding it to the output.
         * @param {string} name The property name.
         * @return {string|!goog.html.SafeHtml}
         */
        formatName(name: string): string|goog.html.SafeHtml;

        /**
         * A string that's placed before a property value in the output.  Useful for
         * wrapping a property value in an html tag.
         * @type {string}
         */
        preValue: string;

        /**
         * A string that's placed after a property value in the output.  Useful for
         * wrapping a property value in an html tag.
         * @type {string}
         */
        postValue: string;

        /**
         * Formats a value before adding it to the output.
         * @param {string} value The value.
         * @param {string} typeOf The type of the value obtained by goog.typeOf.
         * @return {string|!goog.html.SafeHtml}
         */
        formatValue(value: string, typeOf: string): string|goog.html.SafeHtml;

        /**
         * Represents the number of spaces to indent each sub-property of the JSON.
         * @type {number}
         */
        indent: number;
    }

    /**
     * A container for the delimiting characters used to display the JSON string
     * to an HTML <code>&lt;pre&gt;</code> or <code>&lt;code&gt;</code> element.
     * It escapes the names and values before they are added to the output.
     * Use this class together with goog.format.JsonPrettyPrinter#formatSafeHtml.
     * @extends {goog.format.JsonPrettyPrinter.TextDelimiters}
     */
    class SafeHtmlDelimiters extends __SafeHtmlDelimiters {}
    abstract class __SafeHtmlDelimiters extends goog.format.JsonPrettyPrinter.__TextDelimiters {
        /**
         */
        constructor();

        /**
         * Return a class name for the given type.
         * @param {string} typeOf The type of the value.
         * @return {string}
         * @protected
         */
        protected getValueCssName(typeOf: string): string;
    }
}
