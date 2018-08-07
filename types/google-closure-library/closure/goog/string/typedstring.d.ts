/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.string.TypedString' {
    import alias = goog.string.TypedString;
    export default alias;
}

declare namespace goog.string {
    interface TypedString {
        /**
         * Interface marker of the TypedString interface.
         *
         * This property can be used to determine at runtime whether or not an object
         * implements this interface.  All implementations of this interface set this
         * property to `true`.
         * @type {boolean}
         */
        implementsGoogStringTypedString: boolean;

        /**
         * Retrieves this wrapped string's value.
         * @return {string} The wrapped string's value.
         */
        getTypedStringValue(): string;
    }
}
