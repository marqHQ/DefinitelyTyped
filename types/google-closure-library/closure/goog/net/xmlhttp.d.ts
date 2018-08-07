/// <reference path="../../../globals.d.ts"/>
/// <reference path="./xmlhttpfactory.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>

declare module 'goog:goog.net.XmlHttpDefines' {
    import alias = goog.net.XmlHttpDefines;
    export default alias;
}

declare module 'goog:goog.net.XmlHttp' {
    import alias = goog.net.XmlHttp;
    export default alias;
}

declare module 'goog:goog.net.XmlHttp.ReadyState' {
    import alias = goog.net.XmlHttp.ReadyState;
    export default alias;
}

declare module 'goog:goog.net.XmlHttp.OptionType' {
    import alias = goog.net.XmlHttp.OptionType;
    export default alias;
}

declare module 'goog:goog.net.DefaultXmlHttpFactory' {
    import alias = goog.net.DefaultXmlHttpFactory;
    export default alias;
}

declare namespace goog.net {
    /**
     * Default factory to use when creating xhr objects.  You probably shouldn't be
     * instantiating this directly, but rather using it via goog.net.XmlHttp.
     * @extends {goog.net.XmlHttpFactory}
     */
    class DefaultXmlHttpFactory extends __DefaultXmlHttpFactory {}
    abstract class __DefaultXmlHttpFactory extends goog.net.__XmlHttpFactory {
        /**
         */
        constructor();

        /**
         * The ActiveX PROG ID string to use to create xhr's in IE. Lazily initialized.
         * @type {string|undefined}
         * @private
         */
        private ieProgId_: string|undefined;

        /**
         * Initialize the private state used by other functions.
         * @return {string} The ActiveX PROG ID string to use to create xhr's in IE.
         * @private
         */
        private getProgId_(): string;
    }

    /**
     * Static class for creating XMLHttpRequest objects.
     * @return {!goog.net.XhrLike.OrNative} A new XMLHttpRequest object.
     */
    function XmlHttp(): goog.net.XhrLike.OrNative;

    /** @const */
    const XmlHttpDefines: any /*missing*/;
}

declare namespace goog.net.XmlHttp {
    /**
     * Gets the options to use with the XMLHttpRequest objects obtained using
     * the static methods.
     * @return {Object} The options.
     */
    function getOptions(): Object;

    /**
     * Type of options that an XmlHttp object can have.
     * @enum {number}
     */
    enum OptionType { USE_NULL_FUNCTION, LOCAL_REQUEST_ERROR }

    /**
     * Status constants for XMLHTTP, matches:
     * https://msdn.microsoft.com/en-us/library/ms534361(v=vs.85).aspx
     * @enum {number}
     */
    enum ReadyState { UNINITIALIZED, LOADING, LOADED, INTERACTIVE, COMPLETE }

    /**
     * Sets the factories for creating XMLHttpRequest objects and their options.
     * @param {Function} factory The factory for XMLHttpRequest objects.
     * @param {Function} optionsFactory The factory for options.
     * @deprecated Use setGlobalFactory instead.
     */
    function setFactory(factory: Function, optionsFactory: Function): void;

    /**
     * Sets the global factory object.
     * @param {!goog.net.XmlHttpFactory} factory New global factory object.
     */
    function setGlobalFactory(factory: goog.net.XmlHttpFactory): void;
}
