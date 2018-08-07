/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.events.BrowserFeature' {
    import alias = goog.events.BrowserFeature;
    export default alias;
}

declare namespace goog.events {
    /**
     * Enum of browser capabilities.
     * @enum {boolean}
     */
    enum BrowserFeature {
        HAS_W3C_BUTTON,
        HAS_W3C_EVENT_SUPPORT,
        SET_KEY_CODE_TO_PREVENT_DEFAULT,
        HAS_NAVIGATOR_ONLINE_PROPERTY,
        HAS_HTML5_NETWORK_EVENT_SUPPORT,
        HTML5_NETWORK_EVENTS_FIRE_ON_BODY,
        TOUCH_ENABLED,
        POINTER_EVENTS,
        MSPOINTER_EVENTS,
        PASSIVE_EVENTS
    }
}
