/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent.iphoto' {
    export = goog.userAgent.iphoto;
}

declare namespace goog.userAgent.iphoto {
    /**
     * Whether we can detect that the user has iPhoto installed.
     * @type {boolean}
     */
    let HAS_IPHOTO: boolean;

    /**
     * The version of iPhoto installed if found.
     * @type {string}
     */
    let VERSION: string;

    /**
     * Whether the installed version of iPhoto is as new or newer than a given
     * version.
     * @param {string} version The version to check.
     * @return {boolean} Whether the installed version of iPhoto is as new or newer
     *     than a given version.
     */
    function isVersion(version: string): boolean;
}
