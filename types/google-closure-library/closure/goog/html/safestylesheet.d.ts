/// <reference path="../../../globals.d.ts"/>
/// <reference path="../string/typedstring.d.ts"/>
/// <reference path="./safestyle.d.ts"/>
/// <reference path="../string/const.d.ts"/>

declare module 'goog:goog.html.SafeStyleSheet' {
    import alias = goog.html.SafeStyleSheet;
    export default alias;
}

declare namespace goog.html {
    /**
     * A string-like object which represents a CSS style sheet and that carries the
     * security type contract that its value, as a string, will not cause untrusted
     * script execution (XSS) when evaluated as CSS in a browser.
     *
     * Instances of this type must be created via the factory method
     * `goog.html.SafeStyleSheet.fromConstant` and not by invoking its
     * constructor. The constructor intentionally takes no parameters and the type
     * is immutable; hence only a default instance corresponding to the empty string
     * can be obtained via constructor invocation.
     *
     * A SafeStyleSheet's string representation can safely be interpolated as the
     * content of a style element within HTML. The SafeStyleSheet string should
     * not be escaped before interpolation.
     *
     * Values of this type must be composable, i.e. for any two values
     * `styleSheet1` and `styleSheet2` of this type,
     * {@code goog.html.SafeStyleSheet.unwrap(styleSheet1) +
     * goog.html.SafeStyleSheet.unwrap(styleSheet2)} must itself be a value that
     * satisfies the SafeStyleSheet type constraint. This requirement implies that
     * for any value `styleSheet` of this type,
     * `goog.html.SafeStyleSheet.unwrap(styleSheet1)` must end in
     * "beginning of rule" context.

     * A SafeStyleSheet can be constructed via security-reviewed unchecked
     * conversions. In this case producers of SafeStyleSheet must ensure themselves
     * that the SafeStyleSheet does not contain unsafe script. Note in particular
     * that {@code &lt;} is dangerous, even when inside CSS strings, and so should
     * always be forbidden or CSS-escaped in user controlled input. For example, if
     * {@code &lt;/style&gt;&lt;script&gt;evil&lt;/script&gt;"} were interpolated
     * inside a CSS string, it would break out of the context of the original
     * style element and `evil` would execute. Also note that within an HTML
     * style (raw text) element, HTML character references, such as
     * {@code &amp;lt;}, are not allowed. See
     *
     http://www.w3.org/TR/html5/scripting-1.html#restrictions-for-contents-of-script-elements
     * (similar considerations apply to the style element).
     *
     * @see goog.html.SafeStyleSheet#fromConstant
     * @final
     * @struct
     * @implements {goog.string.TypedString}
     */
    class SafeStyleSheet extends __SafeStyleSheet {}
    abstract class __SafeStyleSheet implements goog.string.TypedString {
        /**
         */
        constructor();

        /**
         * The contained value of this SafeStyleSheet.  The field has a purposely
         * ugly name to make (non-compiled) code that attempts to directly access this
         * field stand out.
         * @private {string}
         */
        private privateDoNotAccessOrElseSafeStyleSheetWrappedValue_: any /*missing*/;

        /**
         * A type marker used to implement additional run-time type checking.
         * @see goog.html.SafeStyleSheet#unwrap
         * @const {!Object}
         * @private
         */
        private readonly SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_: any /*missing*/;

        /**
         * Called from createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(). This
         * method exists only so that the compiler can dead code eliminate static
         * fields (like EMPTY) when they're not accessed.
         * @param {string} styleSheet
         * @return {!goog.html.SafeStyleSheet}
         * @private
         */
        private initSecurityPrivateDoNotAccessOrElse_(styleSheet: string): goog.html.SafeStyleSheet;

        /**
         * Interface marker of the TypedString interface.
         *
         * This property can be used to determine at runtime whether or not an object
         * implements this interface.  All implementations of this interface set this
         * property to `true`.
         * @type {boolean}
         */
        implementsGoogStringTypedString: boolean;

        /**
         * Retrieves this wrapped string's value.
         * @return {string} The wrapped string's value.
         */
        getTypedStringValue(): string;
    }
}

declare namespace goog.html.SafeStyleSheet {
    /**
     * Creates a style sheet consisting of one selector and one style definition.
     * Use {@link goog.html.SafeStyleSheet.concat} to create longer style sheets.
     * This function doesn't support @import, @media and similar constructs.
     * @param {string} selector CSS selector, e.g. '#id' or 'tag .class, #id'. We
     *     support CSS3 selectors: https://w3.org/TR/css3-selectors/#selectors.
     * @param {!goog.html.SafeStyle.PropertyMap|!goog.html.SafeStyle} style Style
     *     definition associated with the selector.
     * @return {!goog.html.SafeStyleSheet}
     * @throws {Error} If invalid selector is provided.
     */
    function createRule(selector: string, style: goog.html.SafeStyle.PropertyMap|goog.html.SafeStyle):
        goog.html.SafeStyleSheet;

    /**
     * Creates a new SafeStyleSheet object by concatenating values.
     * @param {...(!goog.html.SafeStyleSheet|!Array<!goog.html.SafeStyleSheet>)}
     *     var_args Values to concatenate.
     * @return {!goog.html.SafeStyleSheet}
     */
    function concat(...var_args: (goog.html.SafeStyleSheet|goog.html.SafeStyleSheet[])[]): goog.html.SafeStyleSheet;

    /**
     * Creates a SafeStyleSheet object from a compile-time constant string.
     *
     * `styleSheet` must not have any &lt; characters in it, so that
     * the syntactic structure of the surrounding HTML is not affected.
     *
     * @param {!goog.string.Const} styleSheet A compile-time-constant string from
     *     which to create a SafeStyleSheet.
     * @return {!goog.html.SafeStyleSheet} A SafeStyleSheet object initialized to
     *     `styleSheet`.
     */
    function fromConstant(styleSheet: goog.string.Const): goog.html.SafeStyleSheet;

    /**
     * Performs a runtime check that the provided object is indeed a
     * SafeStyleSheet object, and returns its value.
     *
     * @param {!goog.html.SafeStyleSheet} safeStyleSheet The object to extract from.
     * @return {string} The safeStyleSheet object's contained string, unless
     *     the run-time type check fails. In that case, `unwrap` returns an
     *     innocuous string, or, if assertions are enabled, throws
     *     `goog.asserts.AssertionError`.
     */
    function unwrap(safeStyleSheet: goog.html.SafeStyleSheet): string;

    /**
     * Package-internal utility method to create SafeStyleSheet instances.
     *
     * @param {string} styleSheet The string to initialize the SafeStyleSheet
     *     object with.
     * @return {!goog.html.SafeStyleSheet} The initialized SafeStyleSheet object.
     * @package
     */
    function createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet: string): goog.html.SafeStyleSheet;

    /**
     * A SafeStyleSheet instance corresponding to the empty string.
     * @const {!goog.html.SafeStyleSheet}
     */
    const EMPTY: any /*missing*/;
}
