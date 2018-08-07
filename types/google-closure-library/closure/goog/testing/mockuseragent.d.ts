/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>
/// <reference path="./propertyreplacer.d.ts"/>

declare module 'goog:goog.testing.MockUserAgent' {
    import alias = goog.testing.MockUserAgent;
    export default alias;
}

declare namespace goog.testing {
    /**
     * Class for unit testing code that uses goog.userAgent.
     *
     * @extends {goog.Disposable}
     * @final
     */
    class MockUserAgent extends __MockUserAgent {}
    abstract class __MockUserAgent extends goog.__Disposable {
        /**
         */
        constructor();

        /**
         * Property replacer used to mock out User-Agent functions.
         * @type {!goog.testing.PropertyReplacer}
         * @private
         */
        private propertyReplacer_: goog.testing.PropertyReplacer;

        /**
         * The userAgent string used by goog.userAgent.
         * @type {?string}
         * @private
         */
        private userAgent_: string|null;

        /**
         * The navigator object used by goog.userAgent
         * @type {?Navigator}
         * @private
         */
        private navigator_: Navigator|null;

        /**
         * The documentMode number used by goog.userAgent
         * @type {number|undefined}
         * @private
         */
        private documentMode_: number|undefined;

        /**
         * Whether this MockUserAgent has been installed.
         * @type {boolean}
         * @private
         */
        private installed_: boolean;

        /**
         * Installs this MockUserAgent.
         */
        install(): void;

        /**
         * @return {?string} The userAgent set in this class.
         */
        getUserAgentString(): string|null;

        /**
         * @param {string} userAgent The desired userAgent string to use.
         */
        setUserAgentString(userAgent: string): void;

        /**
         * @return {?Object} The Navigator set in this class.
         */
        getNavigator(): Object|null;

        /**
         * @return {?Navigator} The Navigator set in this class.
         */
        getNavigatorTyped(): Navigator|null;

        /**
         * @param {Object} navigator The desired Navigator object to use.
         */
        setNavigator(navigator: Object): void;

        /**
         * @return {number|undefined} The documentMode set in this class.
         */
        getDocumentMode(): number|undefined;

        /**
         * @param {number} documentMode The desired documentMode to use.
         */
        setDocumentMode(documentMode: number): void;

        /**
         * Uninstalls the MockUserAgent.
         */
        uninstall(): void;
    }
}
