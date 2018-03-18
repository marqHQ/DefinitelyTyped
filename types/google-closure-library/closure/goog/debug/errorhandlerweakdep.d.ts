/// <reference path="../../../globals.d.ts"/>

declare namespace goog.debug {
    /**
     * Dummy object to work around undefined properties compiler warning.
     * @type {!Object<string,Function>}
     */
    let errorHandlerWeakDep: {[key: string]: Function};
}
