/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.promise.testSuiteAdapter' {
    import alias = goog.promise.testSuiteAdapter;
    export default alias;
}

declare namespace goog.promise {
    /**
     * Adapter for specifying Promise-creating functions to the Promises test suite.
     * @const
     */
    const testSuiteAdapter: any /*missing*/;
}
