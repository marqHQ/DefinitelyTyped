/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.testing.singleton' {
    export = goog.testing.singleton;
}

declare namespace goog.testing.singleton {
    /**
     * Deletes all singleton instances, so `getInstance` will return a new
     * instance on next call.
     */
    function reset(): void;

    /**
     * @deprecated Please use `goog.addSingletonGetter`.
     */
    let addSingletonGetter: any /*missing*/;
}
