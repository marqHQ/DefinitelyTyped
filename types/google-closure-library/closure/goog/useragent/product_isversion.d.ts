/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent.product.isVersion' {
    import alias = goog.userAgent.product.isVersion;
    export default alias;
}

declare namespace goog.userAgent.product {
    /**
     * The version of the user agent. This is a string because it might contain
     * 'b' (as in beta) as well as multiple dots.
     * @type {string}
     */
    let VERSION: string;

    /**
     * Whether the user agent product version is higher or the same as the given
     * version.
     *
     * @param {string|number} version The version to check.
     * @return {boolean} Whether the user agent product version is higher or the
     *     same as the given version.
     */
    function isVersion(version: string|number): boolean;
}
