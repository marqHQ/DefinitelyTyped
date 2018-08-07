/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.InputType' {
    import alias = goog.dom.InputType;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Enum of all input types (for INPUT, BUTTON, SELECT and TEXTAREA elements)
     * specified by the W3C HTML4.01 and HTML5 specifications.
     * @enum {string}
     */
    enum InputType {
        BUTTON,
        CHECKBOX,
        COLOR,
        DATE,
        DATETIME,
        DATETIME_LOCAL,
        EMAIL,
        FILE,
        HIDDEN,
        IMAGE,
        MENU,
        MONTH,
        NUMBER,
        PASSWORD,
        RADIO,
        RANGE,
        RESET,
        SEARCH,
        SELECT_MULTIPLE,
        SELECT_ONE,
        SUBMIT,
        TEL,
        TEXT,
        TEXTAREA,
        TIME,
        URL,
        WEEK
    }
}
