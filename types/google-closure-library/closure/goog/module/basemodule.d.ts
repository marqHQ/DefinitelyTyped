/// <reference path="../../../globals.d.ts"/>
/// <reference path="../disposable/disposable.d.ts"/>

declare module 'goog:goog.module.BaseModule' {
    import alias = goog.module.BaseModule;
    export default alias;
}

declare namespace goog.module {
    /**
     * A basic module object that represents a module of Javascript code that can
     * be dynamically loaded.
     *
     * @extends {goog.Disposable}
     */
    class BaseModule extends __BaseModule {}
    abstract class __BaseModule extends goog.__Disposable {
        /**
         */
        constructor();

        /**
         * Performs any load-time initialization that the module requires.
         * @param {Object} context The module context.
         */
        initialize(context: Object): void;
    }
}
