/// <reference path="../../../globals.d.ts"/>
/// <reference path="../i18n/bidi.d.ts"/>
/// <reference path="../string/typedstring.d.ts"/>
/// <reference path="../string/const.d.ts"/>

declare module 'goog:goog.html.TrustedResourceUrl' {
    import alias = goog.html.TrustedResourceUrl;
    export default alias;
}

declare namespace goog.html {
    /**
     * A URL which is under application control and from which script, CSS, and
     * other resources that represent executable code, can be fetched.
     *
     * Given that the URL can only be constructed from strings under application
     * control and is used to load resources, bugs resulting in a malformed URL
     * should not have a security impact and are likely to be easily detectable
     * during testing. Given the wide number of non-RFC compliant URLs in use,
     * stricter validation could prevent some applications from being able to use
     * this type.
     *
     * Instances of this type must be created via the factory method,
     * (`fromConstant`, `fromConstants`, `format` or
     * `formatWithParams`), and not by invoking its constructor. The constructor
     * intentionally takes no parameters and the type is immutable; hence only a
     * default instance corresponding to the empty string can be obtained via
     * constructor invocation.
     *
     * @see goog.html.TrustedResourceUrl#fromConstant
     * @final
     * @struct
     * @implements {goog.i18n.bidi.DirectionalString}
     * @implements {goog.string.TypedString}
     */
    class TrustedResourceUrl extends __TrustedResourceUrl {}
    abstract class __TrustedResourceUrl implements goog.i18n.bidi.DirectionalString, goog.string.TypedString {
        /**
         */
        constructor();

        /**
         * The contained value of this TrustedResourceUrl.  The field has a purposely
         * ugly name to make (non-compiled) code that attempts to directly access this
         * field stand out.
         * @private {string}
         */
        private privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_: any /*missing*/;

        /**
         * A type marker used to implement additional run-time type checking.
         * @see goog.html.TrustedResourceUrl#unwrap
         * @const {!Object}
         * @private
         */
        private readonly TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_: any /*missing*/;

        /**
         * Creates a new TrustedResourceUrl with params added to URL.
         * @param {!Object<string, *>} params Parameters to add to URL. Parameters with
         *     value `null` or `undefined` are skipped. Both keys and values
         *     are encoded. If the value is an array then the same parameter is added
         *     for every element in the array. Note that JavaScript doesn't guarantee
         *     the order of values in an object which might result in non-deterministic
         *     order of the parameters. However, browsers currently preserve the order.
         * @return {!goog.html.TrustedResourceUrl} New TrustedResourceUrl with params.
         */
        cloneWithParams(params: {[key: string]: any}): goog.html.TrustedResourceUrl;

        /**
         * Interface marker of the DirectionalString interface.
         *
         * This property can be used to determine at runtime whether or not an object
         * implements this interface.  All implementations of this interface set this
         * property to `true`.
         * @type {boolean}
         */
        implementsGoogI18nBidiDirectionalString: boolean;

        /**
         * Retrieves this object's known direction (if any).
         * @return {?goog.i18n.bidi.Dir} The known direction. Null if unknown.
         */
        getDirection(): goog.i18n.bidi.Dir|null;

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

declare namespace goog.html.TrustedResourceUrl {
    /**
     * Performs a runtime check that the provided object is indeed a
     * TrustedResourceUrl object, and returns its value.
     *
     * @param {!goog.html.TrustedResourceUrl} trustedResourceUrl The object to
     *     extract from.
     * @return {string} The trustedResourceUrl object's contained string, unless
     *     the run-time type check fails. In that case, `unwrap` returns an
     *     innocuous string, or, if assertions are enabled, throws
     *     `goog.asserts.AssertionError`.
     */
    function unwrap(trustedResourceUrl: goog.html.TrustedResourceUrl): string;

    /**
     * Creates a TrustedResourceUrl from a format string and arguments.
     *
     * The arguments for interpolation into the format string map labels to values.
     * Values of type `goog.string.Const` are interpolated without modifcation.
     * Values of other types are cast to string and encoded with
     * encodeURIComponent.
     *
     * `%{<label>}` markers are used in the format string to indicate locations
     * to be interpolated with the valued mapped to the given label. `<label>`
     * must contain only alphanumeric and `_` characters.
     *
     * The format string must start with one of the following:
     * - `https://<origin>/`
     * - `//<origin>/`
     * - `/<pathStart>`
     * - `about:blank#`
     *
     * `<origin>` must contain only alphanumeric or any of the following: `-.:[]`.
     * `<pathStart>` is any character except `/` and `\`.
     *
     * Example usage:
     *
     *    var url = goog.html.TrustedResourceUrl.format(goog.string.Const.from(
     *        'https://www.google.com/search?q=%{query}'), {'query': searchTerm});
     *
     *    var url = goog.html.TrustedResourceUrl.format(goog.string.Const.from(
     *        '//www.youtube.com/v/%{videoId}?hl=en&fs=1%{autoplay}'), {
     *        'videoId': videoId,
     *        'autoplay': opt_autoplay ?
     *            goog.string.Const.from('&autoplay=1') : goog.string.Const.EMPTY
     *    });
     *
     * While this function can be used to create a TrustedResourceUrl from only
     * constants, fromConstant() and fromConstants() are generally preferable for
     * that purpose.
     *
     * @param {!goog.string.Const} format The format string.
     * @param {!Object<string, (string|number|!goog.string.Const)>} args Mapping
     *     of labels to values to be interpolated into the format string.
     *     goog.string.Const values are interpolated without encoding.
     * @return {!goog.html.TrustedResourceUrl}
     * @throws {!Error} On an invalid format string or if a label used in the
     *     the format string is not present in args.
     */
    function format(format: goog.string.Const, args: {[key: string]: string|number|goog.string.Const}):
        goog.html.TrustedResourceUrl;

    /**
     * Formats the URL same as TrustedResourceUrl.format and then adds extra URL
     * parameters.
     *
     * Example usage:
     *
     *     // Creates '//www.youtube.com/v/abc?autoplay=1' for videoId='abc' and
     *     // opt_autoplay=1. Creates '//www.youtube.com/v/abc' for videoId='abc'
     *     // and opt_autoplay=undefined.
     *     var url = goog.html.TrustedResourceUrl.formatWithParams(
     *         goog.string.Const.from('//www.youtube.com/v/%{videoId}'),
     *         {'videoId': videoId},
     *         {'autoplay': opt_autoplay});
     *
     * @param {!goog.string.Const} format The format string.
     * @param {!Object<string, (string|number|!goog.string.Const)>} args Mapping
     *     of labels to values to be interpolated into the format string.
     *     goog.string.Const values are interpolated without encoding.
     * @param {!Object<string, *>} params Parameters to add to URL. Parameters with
     *     value `null` or `undefined` are skipped. Both keys and values
     *     are encoded. If the value is an array then the same parameter is added
     *     for every element in the array. Note that JavaScript doesn't guarantee
     *     the order of values in an object which might result in non-deterministic
     *     order of the parameters. However, browsers currently preserve the order.
     * @return {!goog.html.TrustedResourceUrl}
     * @throws {!Error} On an invalid format string or if a label used in the
     *     the format string is not present in args.
     */
    function formatWithParams(
        format: goog.string.Const, args: {[key: string]: string|number|goog.string.Const}, params: {[key: string]: any}
    ): goog.html.TrustedResourceUrl;

    /**
     * Creates a TrustedResourceUrl object from a compile-time constant string.
     *
     * Compile-time constant strings are inherently program-controlled and hence
     * trusted.
     *
     * @param {!goog.string.Const} url A compile-time-constant string from which to
     *     create a TrustedResourceUrl.
     * @return {!goog.html.TrustedResourceUrl} A TrustedResourceUrl object
     *     initialized to `url`.
     */
    function fromConstant(url: goog.string.Const): goog.html.TrustedResourceUrl;

    /**
     * Creates a TrustedResourceUrl object from a compile-time constant strings.
     *
     * Compile-time constant strings are inherently program-controlled and hence
     * trusted.
     *
     * @param {!Array<!goog.string.Const>} parts Compile-time-constant strings from
     *     which to create a TrustedResourceUrl.
     * @return {!goog.html.TrustedResourceUrl} A TrustedResourceUrl object
     *     initialized to concatenation of `parts`.
     */
    function fromConstants(parts: goog.string.Const[]): goog.html.TrustedResourceUrl;

    /**
     * Package-internal utility method to create TrustedResourceUrl instances.
     *
     * @param {string} url The string to initialize the TrustedResourceUrl object
     *     with.
     * @return {!goog.html.TrustedResourceUrl} The initialized TrustedResourceUrl
     *     object.
     * @package
     */
    function createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url: string): goog.html.TrustedResourceUrl;
}
