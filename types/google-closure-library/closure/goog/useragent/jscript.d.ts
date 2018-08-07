/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.userAgent.jscript' {
    export = goog.userAgent.jscript;
}

declare namespace goog.userAgent.jscript {
    /**
     * Whether we detect that the user agent is using Microsoft JScript.
     * @type {boolean}
     */
    let HAS_JSCRIPT: boolean;

    /**
     * The installed version of JScript.
     * @type {string}
     */
    let VERSION: string;

    /**
     * Initializer for goog.userAgent.jscript.  Detects if the user agent is using
     * Microsoft JScript and which version of it.
     *
     * This is a named function so that it can be stripped via the jscompiler
     * option for stripping types.
     * @package
     */
    function init(): void;

    /**
     * Whether the installed version of JScript is as new or newer than a given
     * version.
     * @param {string} version The version to check.
     * @return {boolean} Whether the installed version of JScript is as new or
     *     newer than the given version.
     */
    function isVersion(version: string): boolean;
}
