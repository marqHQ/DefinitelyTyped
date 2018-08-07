/// <reference path="../../../globals.d.ts"/>
/// <reference path="./loosemock.d.ts"/>
/// <reference path="../dom/abstractrange.d.ts"/>

declare module 'goog:goog.testing.MockRange' {
    import alias = goog.testing.MockRange;
    export default alias;
}

declare namespace goog.testing {
    /**
     * LooseMock of goog.dom.AbstractRange. Useful because the mock framework cannot
     * simply create a mock out of an abstract class, and cannot create a mock out
     * of classes that implements __iterator__ because it relies on the default
     * behavior of iterating through all of an object's properties.
     * @extends {goog.testing.LooseMock}
     * @final
     */
    class MockRange extends __MockRange {}
    abstract class __MockRange extends goog.testing.__LooseMock {
        /**
         */
        constructor();
    }
}

declare namespace goog.testing.MockRange {
    /**
     * Concrete subclass of goog.dom.AbstractRange that simply sets the abstract
     * method __iterator__ to undefined so that javascript defaults to iterating
     * through all of the object's properties.
     * @extends {goog.dom.AbstractRange}
     * @private
     */
    class ConcreteRange_ extends __ConcreteRange_ {}
    abstract class __ConcreteRange_ extends goog.dom.__AbstractRange {
        /**
         */
        constructor();
    }
}
