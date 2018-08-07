/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.locale.TimeZoneFingerprint' {
    import alias = goog.locale.TimeZoneFingerprint;
    export default alias;
}

declare namespace goog.locale {
    /**
     * Time zone fingerprint mapping to time zone list.
     * @enum {!Array<string>}
     */
    const TimeZoneFingerprint: {[key: number]: string};
}
