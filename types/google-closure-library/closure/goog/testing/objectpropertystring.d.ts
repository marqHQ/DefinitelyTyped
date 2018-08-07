/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.testing.ObjectPropertyString' {
    import alias = goog.testing.ObjectPropertyString;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Object to pass a property name as a string literal and its containing object
     * when the JSCompiler is rewriting these names. This should only be used in
     * test code.
     *
     * @final
     */
    class ObjectPropertyString extends __ObjectPropertyString {}
    abstract class __ObjectPropertyString {
        /**
         * @param {Object} object The containing object.
         * @param {Object|string} propertyString Property name as a string literal.
         */
        constructor(object: Object, propertyString: Object|string);

        /**
         * @type {Object}
         * @private
         */
        private object_: Object;

        /**
         * @type {string}
         * @private
         */
        private propertyString_: string;

        /**
         * @return {Object} The object.
         */
        getObject(): Object;

        /**
         * @return {string} The property string.
         */
        getPropertyString(): string;
    }
}
