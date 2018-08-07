/// <reference path="../../../globals.d.ts"/>
/// <reference path="./mock.d.ts"/>
/// <reference path="../structs/map.d.ts"/>

declare module 'goog:goog.testing.LooseMock' {
    import alias = goog.testing.LooseMock;
    export default alias;
}

declare module 'goog:goog.testing.LooseExpectationCollection' {
    import alias = goog.testing.LooseExpectationCollection;
    export default alias;
}

declare namespace goog.testing {
    /**
     * This class is an ordered collection of expectations for one method. Since
     * the loose mock does most of its verification at the time of $verify, this
     * class is necessary to manage the return/throw behavior when the mock is
     * being called.
     * @final
     */
    class LooseExpectationCollection extends __LooseExpectationCollection {}
    abstract class __LooseExpectationCollection {
        /**
         */
        constructor();

        /**
         * The list of expectations. All of these should have the same name.
         * @type {Array<goog.testing.MockExpectation>}
         * @private
         */
        private expectations_: goog.testing.MockExpectation[];

        /**
         * Adds an expectation to this collection.
         * @param {goog.testing.MockExpectation} expectation The expectation to add.
         */
        addExpectation(expectation: goog.testing.MockExpectation): void;

        /**
         * Gets the list of expectations in this collection.
         * @return {Array<goog.testing.MockExpectation>} The array of expectations.
         */
        getExpectations(): goog.testing.MockExpectation[];
    }

    /**
     * This is a mock that does not care about the order of method calls. As a
     * result, it won't throw exceptions until verify() is called. The only
     * exception is that if a method is called that has no expectations, then an
     * exception will be thrown.
     * @extends {goog.testing.Mock}
     */
    class LooseMock extends __LooseMock {}
    abstract class __LooseMock extends goog.testing.__Mock {
        /**
         * @param {Object|Function} objectToMock The object that should be mocked, or
         *    the constructor of an object to mock.
         * @param {boolean=} opt_ignoreUnexpectedCalls Whether to ignore unexpected
         *     calls.
         * @param {boolean=} opt_mockStaticMethods An optional argument denoting that
         *     a mock should be constructed from the static functions of a class.
         * @param {boolean=} opt_createProxy An optional argument denoting that
         *     a proxy for the target mock should be created.
         */
        constructor(
            objectToMock: Object|Function,
            opt_ignoreUnexpectedCalls?: boolean,
            opt_mockStaticMethods?: boolean,
            opt_createProxy?: boolean
        );

        /**
         * A map of method names to a LooseExpectationCollection for that method.
         * @type {goog.structs.Map}
         * @private
         */
        private $expectations_: goog.structs.Map<any, any>;

        /**
         * The calls that have been made; we cache them to verify at the end. Each
         * element is an array where the first element is the name, and the second
         * element is the arguments.
         * @type {Array<Array<*>>}
         * @private
         */
        private $calls_: any[][];

        /**
         * Whether to ignore unexpected calls.
         * @type {boolean}
         * @private
         */
        private $ignoreUnexpectedCalls_: boolean;

        /**
         * A setter for the ignoreUnexpectedCalls field.
         * @param {boolean} ignoreUnexpectedCalls Whether to ignore unexpected calls.
         * @return {!goog.testing.LooseMock} This mock object.
         */
        $setIgnoreUnexpectedCalls(ignoreUnexpectedCalls: boolean): goog.testing.LooseMock;
    }
}
