/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent.product' {
    export = goog.userAgent.product;
}

declare namespace goog.userAgent.product {
    /**
     * Whether the code is running on the Opera web browser.
     * @type {boolean}
     */
    let OPERA: boolean;

    /**
     * Whether the code is running on an IE web browser.
     * @type {boolean}
     */
    let IE: boolean;

    /**
     * Whether the code is running on an Edge web browser.
     * @type {boolean}
     */
    let EDGE: boolean;

    /**
     * Whether the code is running on the Firefox web browser.
     * @type {boolean}
     */
    let FIREFOX: boolean;

    /**
     * Whether the code is running on an iPhone or iPod touch.
     *
     * iPod touch is considered an iPhone for legacy reasons.
     * @type {boolean}
     */
    let IPHONE: boolean;

    /**
     * Whether the code is running on an iPad.
     * @type {boolean}
     */
    let IPAD: boolean;

    /**
     * Whether the code is running on AOSP browser or WebView inside
     * a pre KitKat Android phone or tablet.
     * @type {boolean}
     */
    let ANDROID: boolean;

    /**
     * Whether the code is running on the Chrome web browser on any platform
     * or AOSP browser or WebView in a KitKat+ Android phone or tablet.
     * @type {boolean}
     */
    let CHROME: boolean;

    /**
     * Whether the code is running on the desktop Safari web browser.
     * Note: the legacy behavior here is only true for Safari not running
     * on iOS.
     * @type {boolean}
     */
    let SAFARI: boolean;
}
