/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.debug.errorHandlerWeakDep' {
    import alias = goog.debug.errorHandlerWeakDep;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Dummy object to work around undefined properties compiler warning.
     * @type {!Object<string,Function>}
     */
    let errorHandlerWeakDep: {[key: string]: Function};
}
