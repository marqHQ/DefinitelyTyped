/// <reference path="../../../globals.d.ts"/>
/// <reference path="./xhrlike.d.ts"/>

declare module 'goog:goog.net.XmlHttpFactory' {
    import alias = goog.net.XmlHttpFactory;
    export default alias;
}

declare namespace goog.net {
    /**
     * Abstract base class for an XmlHttpRequest factory.
     */
    class XmlHttpFactory extends __XmlHttpFactory {}
    abstract class __XmlHttpFactory {
        /**
         */
        constructor();

        /**
         * Cache of options - we only actually call internalGetOptions once.
         * @type {Object}
         * @private
         */
        private cachedOptions_: Object;

        /**
         * @return {!goog.net.XhrLike.OrNative} A new XhrLike instance.
         */
        createInstance(): goog.net.XhrLike.OrNative;

        /**
         * @return {Object} Options describing how xhr objects obtained from this
         *     factory should be used.
         */
        getOptions(): Object;

        /**
         * Override this method in subclasses to preserve the caching offered by
         * getOptions().
         * @return {Object} Options describing how xhr objects obtained from this
         *     factory should be used.
         * @protected
         */
        protected internalGetOptions(): Object;
    }
}
