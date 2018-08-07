/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent.keyboard' {
    export = goog.userAgent.keyboard;
}

declare namespace goog.userAgent.keyboard {
    /**
     * Whether the user agent is running in an environment that uses Mac-based
     * keyboard shortcuts.
     * @type {boolean}
     */
    let MAC_KEYBOARD: boolean;
}
