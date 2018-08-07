/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../../debug/error.d.ts"/>
/// <reference path="./verificationmode.d.ts"/>

declare module 'goog:goog.labs.mock' {
    export = goog.labs.mock;
}

declare module 'goog:goog.labs.mock.VerificationError' {
    import alias = goog.labs.mock.VerificationError;
    export default alias;
}

declare namespace goog.labs.mock {
    /**
     * Error thrown when verification failed.
     *
     * @extends {goog.debug.Error}
     * @final
     */
    class VerificationError extends __VerificationError {}
    abstract class __VerificationError extends goog.debug.__Error {
        /**
         * @param {Array<!goog.labs.mock.MethodBinding_>} recordedCalls
         *     The recorded calls that didn't match the expectation.
         * @param {string} methodName The expected method call.
         * @param {!goog.labs.mock.verification.VerificationMode} verificationMode The
         *     expected verification mode which failed verification.
         * @param {!Array<?>} args The expected arguments.
         */
        constructor(
            recordedCalls: any[],
            methodName: string,
            verificationMode: goog.labs.mock.verification.VerificationMode,
            args: any[]
        );
    }

    /**
     * Base class that provides basic functionality for creating, adding and
     * finding bindings, offering an executor method that is called when a call to
     * the stub is made, an array to hold the bindings and the mocked item, among
     * other things.
     *
     * @struct
     * @private
     */
    class MockManager_ extends __MockManager_ {}
    abstract class __MockManager_ {
        /**
         */
        constructor();

        /**
         * Proxies the methods for the mocked object or class to execute the stubs.
         * @type {!Object}
         * @protected
         */
        protected mockedItem: Object;

        /**
         * A reference to the object or function being mocked.
         * @type {Object|Function}
         * @protected
         */
        protected mockee: Object|Function;

        /**
         * Holds the stub bindings established so far.
         * @protected
         */
        protected methodBindings: any /*missing*/;

        /**
         * Holds a reference to the binder used to define stubs.
         * @protected
         */
        protected $stubBinder: any /*missing*/;

        /**
         * Record method calls with no stub definitions.
         * @type {!Array<!goog.labs.mock.MethodBinding_>}
         * @private
         */
        private callRecords_: any[];

        /**
         * Which `VerificationMode` to use during verification.
         * @private
         */
        private verificationMode_: any /*missing*/;

        /**
         * Allows callers of `#verify` to override the default verification
         * mode of this MockManager.
         *
         * @param {!goog.labs.mock.verification.VerificationMode} verificationMode
         * @private
         */
        private setVerificationMode_(verificationMode: goog.labs.mock.verification.VerificationMode): void;

        /**
         * Handles the first step in creating a stub, returning a stub-binder that
         * is later used to bind a stub for a method.
         *
         * @param {string} methodName The name of the method being bound.
         * @param {...*} var_args The arguments to the method.
         * @return {!goog.labs.mock.StubBinder} The stub binder.
         * @private
         */
        private handleMockCall_(methodName: string, ...var_args: any[]): goog.labs.mock.StubBinder;

        /**
         * Returns the mock object. This should have a stubbed method for each method
         * on the object being mocked.
         *
         * @return {!Object|!Function} The mock object.
         */
        getMockedItem(): Object|Function;

        /**
         * Adds a binding for the method name and arguments to be stubbed.
         *
         * @param {?string} methodName The name of the stubbed method.
         * @param {!Array<?>} args The arguments passed to the method.
         * @param {!Function} func The stub function.
         * @return {!Array<?>} The array of stubs for further sequential stubs to be
         *     appended.
         */
        addBinding(methodName: string|null, args: any[], func: Function): any[];

        /**
         * Returns a stub, if defined, for the method name and arguments passed in.
         * If there are multiple stubs for this method name and arguments, then
         * the most recent binding will be used.
         *
         * If the next binding is a sequence of stubs, then they'll be returned
         * in order until only one is left, at which point it will be returned for every
         * subsequent call.
         *
         * @param {string} methodName The name of the stubbed method.
         * @param {!Array<?>} args The arguments passed to the method.
         * @return {?Function} The stub function or null.
         * @protected
         */
        protected getNextBinding(methodName: string, args: any[]): Function|null;

        /**
         * Returns a stub, if defined, for the method name and arguments passed in as
         * parameters.
         *
         * @param {string} methodName The name of the stubbed method.
         * @param {!Array<?>} args The arguments passed to the method.
         * @return {Function} The stub function or undefined.
         * @protected
         */
        protected getExecutor(methodName: string, args: any[]): Function;

        /**
         * Looks up the list of stubs defined on the mock object and executes the
         * function associated with that stub.
         *
         * @param {string} methodName The name of the method to execute.
         * @param {...*} var_args The arguments passed to the method.
         * @return {*} Value returned by the stub function.
         * @protected
         */
        protected executeStub(methodName: string, ...var_args: any[]): any;

        /**
         * Records a call to 'methodName' with arguments 'args'.
         *
         * @param {string} methodName The name of the called method.
         * @param {!Array<?>} args The array of arguments.
         * @private
         */
        private recordCall_(methodName: string, args: any[]): void;

        /**
         * Verify invocation of a method with specific arguments.
         *
         * @param {string} methodName The name of the method.
         * @param {...*} var_args The arguments passed.
         * @protected
         */
        protected verifyInvocation(methodName: string, ...var_args: any[]): void;
    }

    /**
     * Sets up mock for the given object (or class), stubbing out all the defined
     * methods. By default, all stubs return `undefined`, though stubs can be
     * later defined using `goog.labs.mock.when`.
     *
     * @struct
     * @extends {goog.labs.mock.MockManager_}
     * @private
     */
    class MockObjectManager_ extends __MockObjectManager_ {}
    abstract class __MockObjectManager_ {
        /**
         * @param {!Object|!Function} objOrClass The object or class to set up the mock
         *     for. A class is a constructor function.
         *
         */
        constructor(objOrClass: Object|Function);

        /**
         * Proxies the calls to establish the first step of the stub bindings (object
         * and method name)
         * @private
         */
        private objectStubBinder_: any /*missing*/;

        /**
         * The call verifier is used to verify the calls. It maps property names to
         * the method that does call verification.
         * @type {!Object<string, function(string, ...)>}
         * @private
         */
        objectCallVerifier_: any /*missing*/;
    }

    /**
     * Sets up the spying behavior for the given object.
     *
     * @struct
     * @extends {goog.labs.mock.MockObjectManager_}
     * @private
     */
    class MockSpyManager_ extends __MockSpyManager_ {}
    abstract class __MockSpyManager_ {
        /**
         * @param {!Object} obj The object to be spied on.
         *
         */
        constructor(obj: Object);
    }

    /**
     * Sets up mock for the given function, stubbing out. By default, all stubs
     * return `undefined`, though stubs can be later defined using
     * `goog.labs.mock.when`.
     *
     * @struct
     * @extends {goog.labs.mock.MockManager_}
     * @private
     */
    class MockFunctionManager_ extends __MockFunctionManager_ {}
    abstract class __MockFunctionManager_ {
        /**
         * @param {!Function} func The function to set up the mock for.
         *
         */
        constructor(func: Function);

        /**
         * The stub binder used to create bindings.
         * Sets the first argument of handleMockCall_ to the function name.
         * @type {!Function}
         * @private
         */
        private functionStubBinder_: Function;

        /**
         * Given a method, returns a new function that calls the first one setting
         * the first argument to the mocked function name.
         * This is used to dynamically override the stub binders and call verifiers.
         * @private
         * @param {Function} nextFunc The function to override.
         * @return {!Function} The overloaded function.
         */
        private useMockedFunctionName_(nextFunc: Function): Function;
    }

    interface StubBinder {
        /**
         * Defines the function to be called for the method name and arguments bound
         * to this `StubBinder`.
         *
         * If `then` or `thenReturn` has been previously called
         * on this `StubBinder` then the given stub `func` will be called
         * only after the stubs passed previously have been called.  Afterwards,
         * if no other calls are made to `then` or `thenReturn` for this
         * `StubBinder` then the given `func` will be used for every further
         * invocation.
         * See #when for complete examples.
         * TODO(user): Add support for the 'Answer' interface.
         *
         * @param {!Function} func The function to call.
         * @return {!goog.labs.mock.StubBinder} Returns itself for chaining.
         */
        then(func: Function): goog.labs.mock.StubBinder;

        /**
         * Defines the constant return value for the stub represented by this
         * `StubBinder`.
         *
         * @param {*} value The value to return.
         * @return {!goog.labs.mock.StubBinder} Returns itself for chaining.
         */
        thenReturn(value: any): goog.labs.mock.StubBinder;
    }

    /**
     * Represents a binding between a method name, args and a stub.
     *
     * @struct
     * @private
     */
    class MethodBinding_ extends __MethodBinding_ {}
    abstract class __MethodBinding_ {
        /**
         * @param {?string} methodName The name of the method being stubbed.
         * @param {!Array<?>} args The arguments passed to the method.
         * @param {!Function} stub The stub function to be called for the given method.
         */
        constructor(methodName: string|null, args: any[], stub: Function);

        /**
         * The name of the method being stubbed.
         * @type {?string}
         * @private
         */
        private methodName_: string|null;

        /**
         * The arguments for the method being stubbed.
         * @type {!Array<?>}
         * @private
         */
        private args_: any[];

        /**
         * The stub function.
         * @type {!Function}
         * @private
         */
        private stub_: Function;

        /**
         * @return {!Function} The stub to be executed.
         */
        getStub(): Function;

        /**
         * @return {string} The method name for this binding.
         */
        getMethodName(): string;

        /**
         * Determines whether the given args match the stored args_. Used to determine
         * which stub to invoke for a method.
         *
         * @param {string} methodName The name of the method being stubbed.
         * @param {!Array<?>} args An array of arguments.
         * @param {boolean} isVerification Whether this is a function verification call
         *     or not.
         * @return {boolean} If it matches the stored arguments.
         */
        matches(methodName: string, args: any[], isVerification: boolean): boolean;
    }

    /**
     * Mocks a given object or class.
     *
     * @param {!Object} objectOrClass An instance or a constructor of a class to be
     *     mocked.
     * @return {!Object} The mocked object.
     */
    function mock(objectOrClass: Object): Object;

    /**
     * Mocks a given function.
     *
     * @param {!Function} func A function to be mocked.
     * @return {!Function} The mocked function.
     */
    function mockFunction(func: Function): Function;

    /**
     * Mocks a given constructor.
     *
     * @param {!function(new:T, ...?)} ctor A constructor function to be mocked.
     * @return {!function(new:T, ...?)} The mocked constructor.
     * @template T
     */
    function mockConstructor<T>(ctor: (this: T, _0: any[]) => void): (this: T, _0: any[]) => void;

    /**
     * Spies on a given object.
     *
     * @param {!Object} obj The object to be spied on.
     * @return {!Object} The spy object.
     */
    function spy(obj: Object): Object;

    /**
     * Returns an object that can be used to verify calls to specific methods of a
     * given mock.
     *
     * @param {!Object} obj The mocked object.
     * @param {!goog.labs.mock.verification.VerificationMode=} opt_verificationMode The mode
     *     under which to verify invocations.
     * @return {?} The verifier. Return type {?} to avoid compilation errors.
     */
    function verify(obj: Object, opt_verificationMode?: goog.labs.mock.verification.VerificationMode): any;

    /**
     * A unique Id generator that does not modify the object.
     * @param {Object!} obj The object whose unique ID we want to generate.
     * @return {number} an unique id for the object.
     */
    function getUid(obj: Object): number;

    /**
     * Facilitates (and is the first step in) setting up stubs. Obtains an object
     * on which, the method to be mocked is called to create a stub. Sample usage:
     *
     * var mockObj = goog.labs.mock.mock(objectBeingMocked);
     * goog.labs.mock.when(mockObj).getFoo(3).thenReturn(4);
     *
     * Subsequent calls to `when` take precedence over earlier calls, allowing
     * users to set up default stubs in setUp methods and then override them in
     * individual tests.
     *
     * If a user wants sequential calls to their stub to return different
     * values, they can chain calls to `then` or `thenReturn` as
     * follows:
     *
     * var mockObj = goog.labs.mock.mock(objectBeingMocked);
     * goog.labs.mock.when(mockObj).getFoo(3)
     *     .thenReturn(4)
     *     .then(function() {
     *         throw new Error('exceptional case');
     *     });
     *
     * @param {!Object} mockObject The mocked object.
     * @return {?} The property binder. Return type {?} to avoid compilation errors.
     */
    function when(mockObject: Object): any;
}

declare namespace goog.labs.mock.VerificationError {
}
