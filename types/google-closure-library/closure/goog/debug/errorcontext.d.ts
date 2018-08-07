/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.debug.errorcontext' {
    export = goog.debug.errorcontext;
}

declare namespace goog.debug.errorcontext {
    /**
     * Adds key-value context to the error.
     * @param {!Error} err The error to add context to.
     * @param {string} contextKey Key for the context to be added.
     * @param {string} contextValue Value for the context to be added.
     */
    function addErrorContext(err: Error, contextKey: string, contextValue: string): void;

    /**
     * @param {!Error} err The error to get context from.
     * @return {!Object<string, string>} The context of the provided error.
     */
    function getErrorContext(err: Error): {[key: string]: string};
}
