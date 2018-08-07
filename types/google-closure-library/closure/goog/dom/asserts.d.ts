/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.asserts' {
    export = goog.dom.asserts;
}

declare namespace goog.dom.asserts {
    /**
     * Asserts that a given object is a Location.
     *
     * To permit this assertion to pass in the context of tests where DOM APIs might
     * be mocked, also accepts any other type except for subtypes of {!Element}.
     * This is to ensure that, for instance, HTMLLinkElement is not being used in
     * place of a Location, since this could result in security bugs due to stronger
     * contracts required for assignments to the href property of the latter.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!Location}
     */
    function assertIsLocation(o: Object|null): Location;

    /**
     * Asserts that a given object is a HTMLAnchorElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not of type Location nor a subtype
     * of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLAnchorElement}
     */
    function assertIsHTMLAnchorElement(o: Object|null): HTMLAnchorElement;

    /**
     * Asserts that a given object is a HTMLButtonElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLButtonElement}
     */
    function assertIsHTMLButtonElement(o: Object|null): HTMLButtonElement;

    /**
     * Asserts that a given object is a HTMLLinkElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLLinkElement}
     */
    function assertIsHTMLLinkElement(o: Object|null): HTMLLinkElement;

    /**
     * Asserts that a given object is a HTMLImageElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLImageElement}
     */
    function assertIsHTMLImageElement(o: Object|null): HTMLImageElement;

    /**
     * Asserts that a given object is a HTMLVideoElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLVideoElement}
     */
    function assertIsHTMLVideoElement(o: Object|null): HTMLVideoElement;

    /**
     * Asserts that a given object is a HTMLInputElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLInputElement}
     */
    function assertIsHTMLInputElement(o: Object|null): HTMLInputElement;

    /**
     * Asserts that a given object is a HTMLEmbedElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLEmbedElement}
     */
    function assertIsHTMLEmbedElement(o: Object|null): HTMLEmbedElement;

    /**
     * Asserts that a given object is a HTMLFormElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLFormElement}
     */
    function assertIsHTMLFormElement(o: Object|null): HTMLFormElement;

    /**
     * Asserts that a given object is a HTMLFrameElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLFrameElement}
     */
    function assertIsHTMLFrameElement(o: Object|null): HTMLFrameElement;

    /**
     * Asserts that a given object is a HTMLIFrameElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLIFrameElement}
     */
    function assertIsHTMLIFrameElement(o: Object|null): HTMLIFrameElement;

    /**
     * Asserts that a given object is a HTMLObjectElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLObjectElement}
     */
    function assertIsHTMLObjectElement(o: Object|null): HTMLObjectElement;

    /**
     * Asserts that a given object is a HTMLScriptElement.
     *
     * To permit this assertion to pass in the context of tests where elements might
     * be mocked, also accepts objects that are not a subtype of Element.
     *
     * @param {?Object} o The object whose type to assert.
     * @return {!HTMLScriptElement}
     */
    function assertIsHTMLScriptElement(o: Object|null): HTMLScriptElement;
}
