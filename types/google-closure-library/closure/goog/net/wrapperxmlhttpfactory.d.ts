/// <reference path="../../../globals.d.ts"/>
/// <reference path="./xmlhttpfactory.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>

declare module 'goog:goog.net.WrapperXmlHttpFactory' {
    import alias = goog.net.WrapperXmlHttpFactory;
    export default alias;
}

declare namespace goog.net {
    /**
     * An xhr factory subclass which can be constructed using two factory methods.
     * This exists partly to allow the preservation of goog.net.XmlHttp.setFactory()
     * with an unchanged signature.
     * @extends {goog.net.XmlHttpFactory}
     * @final
     */
    class WrapperXmlHttpFactory extends __WrapperXmlHttpFactory {}
    abstract class __WrapperXmlHttpFactory extends goog.net.__XmlHttpFactory {
        /**
         * @param {function():!goog.net.XhrLike.OrNative} xhrFactory
         *     A function which returns a new XHR object.
         * @param {function():!Object} optionsFactory A function which returns the
         *     options associated with xhr objects from this factory.
         */
        constructor(xhrFactory: () => goog.net.XhrLike.OrNative, optionsFactory: () => Object);

        /**
         * XHR factory method.
         * @type {function() : !goog.net.XhrLike.OrNative}
         * @private
         */
        private xhrFactory_: () => goog.net.XhrLike.OrNative;

        /**
         * Options factory method.
         * @type {function() : !Object}
         * @private
         */
        private optionsFactory_: () => Object;
    }
}
