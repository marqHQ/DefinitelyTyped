/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../testing/testcase.d.ts"/>

declare module 'goog:goog.labs.testing.Environment' {
    import alias = goog.labs.testing.Environment;
    export default alias;
}

declare namespace goog.labs.testing {
    /**
     * An internal Test used to hook environments into the JsUnit test runner.
     * @private
     * @final
     * @extends {goog.testing.TestCase.Test}
     */
    class EnvironmentTest_ extends __EnvironmentTest_ {}
    abstract class __EnvironmentTest_ extends goog.testing.TestCase.__Test {
        /**
         * @param {string} name The test name.
         * @param {function()} ref Reference to the test function or test object.
         * @param {?Object=} scope Optional scope that the test function should be
         *     called in.
         * @param {!Array<!Object>=} objChain A chain of objects used to populate setUps
         *     and tearDowns.
         */
        constructor(name: string, ref: () => void, scope?: Object|null, objChain?: Object[]);

        /**
         * @type {!Array<function()>}
         */
        configureEnvironments: () => void[];
    }
}

/**
 * JsUnit environments allow developers to customize the existing testing
 * lifecycle by hitching additional setUp and tearDown behaviors to tests.
 *
 * Environments will run their setUp steps in the order in which they
 * are instantiated and registered. During tearDown, the environments will
 * unwind the setUp and execute in reverse order.
 *
 * See http://go/jsunit-env for more information.
 */
declare namespace goog.labs.testing.Environment {
    /**
     * @return {?goog.testing.TestCase}
     */
    function getTestCaseIfActive(): goog.testing.TestCase|null;
}
