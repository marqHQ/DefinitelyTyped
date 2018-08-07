/// <reference path="../../../globals.d.ts"/>
/// <reference path="./strictmock.d.ts"/>
/// <reference path="./loosemock.d.ts"/>

declare module 'goog:goog.testing.MockClassRecord' {
    import alias = goog.testing.MockClassRecord;
    export default alias;
}

declare module 'goog:goog.testing.MockClassFactory' {
    import alias = goog.testing.MockClassFactory;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A record that represents all the data associated with a mock replacement of
     * a given class.
     * @final
     */
    class MockClassRecord extends __MockClassRecord {}
    abstract class __MockClassRecord {
        /**
         * @param {Object} namespace The namespace in which the mocked class resides.
         * @param {string} className The name of the class within the namespace.
         * @param {Function} originalClass The original class implementation before it
         *     was replaced by a proxy.
         * @param {Function} proxy The proxy that replaced the original class.
         */
        constructor(namespace: Object, className: string, originalClass: Function, proxy: Function);

        /**
         * A standard closure namespace (e.g. goog.foo.bar) that contains the mock
         * class referenced by this MockClassRecord.
         * @type {Object}
         * @private
         */
        private namespace_: Object;

        /**
         * The name of the class within the provided namespace.
         * @type {string}
         * @private
         */
        private className_: string;

        /**
         * The original class implementation.
         * @type {Function}
         * @private
         */
        private originalClass_: Function;

        /**
         * The proxy being used as a replacement for the original class.
         * @type {Function}
         * @private
         */
        private proxy_: Function;

        /**
         * A mocks that will be constructed by their argument list.  The entries are
         * objects with the format {'args': args, 'mock': mock}.
         * @type {Array<Object>}
         * @private
         */
        private instancesByArgs_: Object[];

        /**
         * A mock associated with the static functions for a given class.
         * @type {goog.testing.StrictMock|goog.testing.LooseMock|null}
         * @private
         */
        private staticMock_: goog.testing.StrictMock|goog.testing.LooseMock|null;

        /**
         * A getter for this record's namespace.
         * @return {Object} The namespace.
         */
        getNamespace(): Object;

        /**
         * A getter for this record's class name.
         * @return {string} The name of the class referenced by this record.
         */
        getClassName(): string;

        /**
         * A getter for the original class.
         * @return {Function} The original class implementation before mocking.
         */
        getOriginalClass(): Function;

        /**
         * A getter for the proxy being used as a replacement for the original class.
         * @return {Function} The proxy.
         */
        getProxy(): Function;

        /**
         * A getter for the static mock.
         * @return {goog.testing.StrictMock|goog.testing.LooseMock|null} The static
         *     mock associated with this record.
         */
        getStaticMock(): goog.testing.StrictMock|goog.testing.LooseMock|null;

        /**
         * A setter for the static mock.
         * @param {goog.testing.StrictMock|goog.testing.LooseMock} staticMock A mock to
         *     associate with the static functions for the referenced class.
         */
        setStaticMock(staticMock: goog.testing.StrictMock|goog.testing.LooseMock): void;

        /**
         * Adds a new mock instance mapping.  The mapping connects a set of function
         * arguments to a specific mock instance.
         * @param {Array<?>} args An array of function arguments.
         * @param {goog.testing.StrictMock|goog.testing.LooseMock} mock A mock
         *     associated with the supplied arguments.
         */
        addMockInstance(args: any[], mock: goog.testing.StrictMock|goog.testing.LooseMock): void;

        /**
         * Finds the mock corresponding to a given argument set.  Throws an error if
         * there is no appropriate match found.
         * @param {Array<?>} args An array of function arguments.
         * @return {goog.testing.StrictMock|goog.testing.LooseMock|null} The mock
         *     corresponding to a given argument set.
         */
        findMockInstance(args: any[]): goog.testing.StrictMock|goog.testing.LooseMock|null;

        /**
         * Resets this record by reverting all the mocked classes back to the original
         * implementation and clearing out the mock instance list.
         */
        reset(): void;
    }

    /**
     * A factory used to create new mock class instances.  It is able to generate
     * both static and loose mocks.  The MockClassFactory is a singleton since it
     * tracks the classes that have been mocked internally.
     * @final
     */
    class MockClassFactory extends __MockClassFactory {}
    abstract class __MockClassFactory {
        /**
         */
        constructor();

        /**
         * A map from class name -> goog.testing.MockClassRecord.
         * @type {Object}
         * @private
         */
        private mockClassRecords_: Object;

        /**
         * Iterates through a namespace to find the name of a given class.  This is done
         * solely to support compilation since string identifiers would break down.
         * Tests usually aren't compiled, but the functionality is supported.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class whose name should be returned.
         * @return {string} The name of the class.
         * @private
         */
        private getClassName_(namespace: Object, classToMock: Function): string;

        /**
         * Returns whether or not a given class has been mocked.
         * @param {string} className The name of the class.
         * @return {boolean} Whether or not the given class name has a MockClassRecord.
         * @private
         */
        private classHasMock_(className: string): boolean;

        /**
         * Returns a proxy constructor closure.  Since this is a constructor, "this"
         * refers to the local scope of the constructed object thus bind cannot be
         * used.
         * @param {string} className The name of the class.
         * @param {Function} mockFinder A bound function that returns the mock
         *     associated with a class given the constructor's argument list.
         * @return {function(new:?)} A proxy constructor.
         * @private
         */
        getProxyCtor_(className: string, mockFinder: Function): void;

        /**
         * Returns a proxy function for a mock class instance.  This function cannot
         * be used with bind since "this" must refer to the scope of the proxy
         * constructor.
         * @param {string} fnName The name of the function that should be proxied.
         * @return {!Function} A proxy function.
         * @private
         */
        private getProxyFunction_(fnName: string): Function;

        /**
         * Find a mock instance for a given class name and argument list.
         * @param {string} className The name of the class.
         * @param {Array<?>} args The argument list to match.
         * @return {goog.testing.StrictMock|goog.testing.LooseMock} The mock found for
         *     the given argument list.
         * @private
         */
        private findMockInstance_(className: string, args: any[]): goog.testing.StrictMock|goog.testing.LooseMock;

        /**
         * Create a proxy class.  A proxy will pass functions to the mock for a class.
         * The proxy class only covers prototype methods.  A static mock is not build
         * simultaneously since it might be strict or loose.  The proxy class inherits
         * from the target class in order to preserve instanceof checks.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class that will be proxied.
         * @param {string} className The name of the class.
         * @return {!Function} The proxy for provided class.
         * @private
         */
        private createProxy_(namespace: Object, classToMock: Function, className: string): Function;

        /**
         * Gets either a loose or strict mock for a given class based on a set of
         * arguments.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class that will be mocked.
         * @param {boolean} isStrict Whether or not the mock should be strict.
         * @param {IArrayLike<?>} ctorArgs The arguments associated with this
         *     instance's constructor.
         * @return {!goog.testing.StrictMock|!goog.testing.LooseMock} The mock created
         *     for the provided class.
         * @private
         */
        private getMockClass_(namespace: Object, classToMock: Function, isStrict: boolean, ctorArgs: IArrayLike<any>):
            goog.testing.StrictMock|goog.testing.LooseMock;

        /**
         * Gets a strict mock for a given class.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class that will be mocked.
         * @param {...*} var_args The arguments associated with this instance's
         *     constructor.
         * @return {!goog.testing.StrictMock} The mock created for the provided class.
         */
        getStrictMockClass(namespace: Object, classToMock: Function, ...var_args: any[]): goog.testing.StrictMock;

        /**
         * Gets a loose mock for a given class.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class that will be mocked.
         * @param {...*} var_args The arguments associated with this instance's
         *     constructor.
         * @return {goog.testing.LooseMock} The mock created for the provided class.
         */
        getLooseMockClass(namespace: Object, classToMock: Function, ...var_args: any[]): goog.testing.LooseMock;

        /**
         * Creates either a loose or strict mock for the static functions of a given
         * class.
         * @param {Function} classToMock The class whose static functions will be
         *     mocked.  This should be the original class and not the proxy.
         * @param {string} className The name of the class.
         * @param {Function} proxy The proxy that will replace the original class.
         * @param {boolean} isStrict Whether or not the mock should be strict.
         * @return {!goog.testing.StrictMock|!goog.testing.LooseMock} The mock created
         *     for the static functions of the provided class.
         * @private
         */
        private createStaticMock_(classToMock: Function, className: string, proxy: Function, isStrict: boolean):
            goog.testing.StrictMock|goog.testing.LooseMock;

        /**
         * Gets either a loose or strict mock for the static functions of a given class.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class whose static functions will be
         *     mocked.  This should be the original class and not the proxy.
         * @param {boolean} isStrict Whether or not the mock should be strict.
         * @return {goog.testing.StrictMock|goog.testing.LooseMock} The mock created
         *     for the static functions of the provided class.
         * @private
         */
        private getStaticMock_(namespace: Object, classToMock: Function, isStrict: boolean):
            goog.testing.StrictMock|goog.testing.LooseMock;

        /**
         * Gets a strict mock for the static functions of a given class.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class whose static functions will be
         *     mocked.  This should be the original class and not the proxy.
         * @return {goog.testing.StrictMock} The mock created for the static functions
         *     of the provided class.
         */
        getStrictStaticMock(namespace: Object, classToMock: Function): goog.testing.StrictMock;

        /**
         * Gets a loose mock for the static functions of a given class.
         * @param {Object} namespace A javascript namespace (e.g. goog.testing).
         * @param {Function} classToMock The class whose static functions will be
         *     mocked.  This should be the original class and not the proxy.
         * @return {goog.testing.LooseMock} The mock created for the static functions
         *     of the provided class.
         */
        getLooseStaticMock(namespace: Object, classToMock: Function): goog.testing.LooseMock;

        /**
         * Resests the factory by reverting all mocked classes to their original
         * implementations and removing all MockClassRecords.
         */
        reset(): void;
    }
}

declare namespace goog.testing.MockClassFactory {
}
