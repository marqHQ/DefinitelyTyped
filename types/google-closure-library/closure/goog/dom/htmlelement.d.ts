/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.HtmlElement' {
    import alias = goog.dom.HtmlElement;
    export default alias;
}

declare module goog {
}

declare module goog.dom {
    /**
     * This subclass of HTMLElement is used when only a HTMLElement is possible and
     * not any of its subclasses. Normally, a type can refer to an instance of
     * itself or an instance of any subtype. More concretely, if HTMLElement is used
     * then the compiler must assume that it might still be e.g. HTMLScriptElement.
     * With this, the type check knows that it couldn't be any special element.
     *
     * @extends {HTMLElement}
     */
    class HtmlElement extends __HtmlElement {}
    abstract class __HtmlElement extends HTMLElement {}
}
