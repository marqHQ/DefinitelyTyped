/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.BrowserFeature' {
    import alias = goog.dom.BrowserFeature;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Enum of browser capabilities.
     * @enum {boolean}
     */
    enum BrowserFeature {
        CAN_ADD_NAME_OR_TYPE_ATTRIBUTES,
        CAN_USE_CHILDREN_ATTRIBUTE,
        CAN_USE_INNER_TEXT,
        CAN_USE_PARENT_ELEMENT_PROPERTY,
        INNER_HTML_NEEDS_SCOPED_ELEMENT,
        LEGACY_IE_RANGES
    }
}
