/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent' {
    import alias = goog.userAgent;
    export default alias;
}

declare namespace goog.userAgent {
    /**
     * Returns the userAgent string for the current browser.
     *
     * @return {string} The userAgent string.
     */
    function getUserAgentString(): string;

    /**
     * @return {?Navigator} The native navigator object.
     */
    function getNavigatorTyped(): Navigator|null;

    /**
     * TODO(nnaze): Change type to "Navigator" and update compilation targets.
     * @return {?Object} The native navigator object.
     */
    function getNavigator(): Object|null;

    /**
     * Whether the user agent is Opera.
     * @type {boolean}
     */
    let OPERA: boolean;

    /**
     * Whether the user agent is Internet Explorer.
     * @type {boolean}
     */
    let IE: boolean;

    /**
     * Whether the user agent is Microsoft Edge.
     * @type {boolean}
     */
    let EDGE: boolean;

    /**
     * Whether the user agent is MS Internet Explorer or MS Edge.
     * @type {boolean}
     */
    let EDGE_OR_IE: boolean;

    /**
     * Whether the user agent is Gecko. Gecko is the rendering engine used by
     * Mozilla, Firefox, and others.
     * @type {boolean}
     */
    let GECKO: boolean;

    /**
     * Whether the user agent is WebKit. WebKit is the rendering engine that
     * Safari, Android and others use.
     * @type {boolean}
     */
    let WEBKIT: boolean;

    /**
     * Whether the user agent is running on a mobile device.
     *
     * TODO(nnaze): Consider deprecating MOBILE when labs.userAgent
     *   is promoted as the gecko/webkit logic is likely inaccurate.
     *
     * @type {boolean}
     */
    let MOBILE: boolean;

    /**
     * Used while transitioning code to use WEBKIT instead.
     * @type {boolean}
     * @deprecated Use {@link goog.userAgent.product.SAFARI} instead.
     * TODO(nicksantos): Delete this from goog.userAgent.
     */
    let SAFARI: boolean;

    /**
     * The platform (operating system) the user agent is running on. Default to
     * empty string because navigator.platform may not be defined (on Rhino, for
     * example).
     * @type {string}
     */
    let PLATFORM: string;

    /**
     * Whether the user agent is running on a Macintosh operating system.
     * @type {boolean}
     */
    let MAC: boolean;

    /**
     * Whether the user agent is running on a Windows operating system.
     * @type {boolean}
     */
    let WINDOWS: boolean;

    /**
     * Whether the user agent is running on a Linux operating system.
     *
     * Note that goog.userAgent.LINUX considers ChromeOS to be Linux,
     * while goog.labs.userAgent.platform considers ChromeOS and
     * Linux to be different OSes.
     *
     * @type {boolean}
     */
    let LINUX: boolean;

    /**
     * Whether the user agent is running on a X11 windowing system.
     * @type {boolean}
     */
    let X11: boolean;

    /**
     * Whether the user agent is running on Android.
     * @type {boolean}
     */
    let ANDROID: boolean;

    /**
     * Whether the user agent is running on an iPhone.
     * @type {boolean}
     */
    let IPHONE: boolean;

    /**
     * Whether the user agent is running on an iPad.
     * @type {boolean}
     */
    let IPAD: boolean;

    /**
     * Whether the user agent is running on an iPod.
     * @type {boolean}
     */
    let IPOD: boolean;

    /**
     * Whether the user agent is running on iOS.
     * @type {boolean}
     */
    let IOS: boolean;

    /**
     * The version of the user agent. This is a string because it might contain
     * 'b' (as in beta) as well as multiple dots.
     * @type {string}
     */
    let VERSION: string;

    /**
     * Compares two version numbers.
     *
     * @param {string} v1 Version of first item.
     * @param {string} v2 Version of second item.
     *
     * @return {number}  1 if first argument is higher
     *                   0 if arguments are equal
     *                  -1 if second argument is higher.
     * @deprecated Use goog.string.compareVersions.
     */
    function compare(v1: string, v2: string): number;

    /**
     * Whether the user agent version is higher or the same as the given version.
     * NOTE: When checking the version numbers for Firefox and Safari, be sure to
     * use the engine's version, not the browser's version number.  For example,
     * Firefox 3.0 corresponds to Gecko 1.9 and Safari 3.0 to Webkit 522.11.
     * Opera and Internet Explorer versions match the product release number.<br>
     * @see <a href="http://en.wikipedia.org/wiki/Safari_version_history">
     *     Webkit</a>
     * @see <a href="http://en.wikipedia.org/wiki/Gecko_engine">Gecko</a>
     *
     * @param {string|number} version The version to check.
     * @return {boolean} Whether the user agent version is higher or the same as
     *     the given version.
     */
    function isVersionOrHigher(version: string|number): boolean;

    /**
     * Deprecated alias to `goog.userAgent.isVersionOrHigher`.
     * @param {string|number} version The version to check.
     * @return {boolean} Whether the user agent version is higher or the same as
     *     the given version.
     * @deprecated Use goog.userAgent.isVersionOrHigher().
     */
    function isVersion(version: string|number): boolean;

    /**
     * Whether the IE effective document mode is higher or the same as the given
     * document mode version.
     * NOTE: Only for IE, return false for another browser.
     *
     * @param {number} documentMode The document mode version to check.
     * @return {boolean} Whether the IE effective document mode is higher or the
     *     same as the given version.
     */
    function isDocumentModeOrHigher(documentMode: number): boolean;

    /**
     * Deprecated alias to `goog.userAgent.isDocumentModeOrHigher`.
     * @param {number} version The version to check.
     * @return {boolean} Whether the IE effective document mode is higher or the
     *      same as the given version.
     * @deprecated Use goog.userAgent.isDocumentModeOrHigher().
     */
    function isDocumentMode(version: number): boolean;

    /**
     * For IE version < 7, documentMode is undefined, so attempt to use the
     * CSS1Compat property to see if we are in standards mode. If we are in
     * standards mode, treat the browser version as the document mode. Otherwise,
     * IE is emulating version 5.
     * @type {number|undefined}
     * @const
     */
    const DOCUMENT_MODE: number|undefined;
}
