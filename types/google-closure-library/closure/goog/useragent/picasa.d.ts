/// <reference path="../../../globals.d.ts"/>

declare namespace goog.userAgent.picasa {
    /**
     * Whether we detect the user has Picasa installed.
     * @type {boolean}
     */
    let HAS_PICASA: boolean;

    /**
     * The installed version of Picasa. If Picasa is detected, this means it is
     * version 2 or later. The precise version number is not yet available to the
     * browser, this is a placeholder for later versions of Picasa.
     * @type {string}
     */
    let VERSION: string;

    /**
     * Whether the installed Picasa version is as new or newer than a given version.
     * This is not yet relevant, we can't detect the true Picasa version number yet,
     * but this may be possible in future Picasa releases.
     * @param {string} version The version to check.
     * @return {boolean} Whether the installed Picasa version is as new or newer
     *     than a given version.
     */
    function isVersion(version: string): boolean;
}
