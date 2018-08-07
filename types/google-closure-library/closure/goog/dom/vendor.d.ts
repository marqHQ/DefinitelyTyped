/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.dom.vendor' {
    export = goog.dom.vendor;
}

declare namespace goog.dom.vendor {
    /**
     * Returns the JS vendor prefix used in CSS properties. Different vendors
     * use different methods of changing the case of the property names.
     *
     * @return {?string} The JS vendor prefix or null if there is none.
     */
    function getVendorJsPrefix(): string|null;

    /**
     * Returns the vendor prefix used in CSS properties.
     *
     * @return {?string} The vendor prefix or null if there is none.
     */
    function getVendorPrefix(): string|null;

    /**
     * @param {string} propertyName A property name.
     * @param {!Object=} opt_object If provided, we verify if the property exists in
     *     the object.
     * @return {?string} A vendor prefixed property name, or null if it does not
     *     exist.
     */
    function getPrefixedPropertyName(propertyName: string, opt_object?: Object): string|null;

    /**
     * @param {string} eventType An event type.
     * @return {string} A lower-cased vendor prefixed event type.
     */
    function getPrefixedEventType(eventType: string): string;
}
