/// <reference path="../../../globals.d.ts"/>
/// <reference path="./idisposable.d.ts"/>

declare module 'goog:goog.dispose' {
    export = goog.dispose;
}

declare module 'goog:goog.disposeAll' {
    import alias = goog.disposeAll;
    export default alias;
}

declare module 'goog:goog.Disposable' {
    import alias = goog.Disposable;
    export default alias;
}

declare namespace goog {
    /**
     * Class that provides the basic implementation for disposable objects. If your
     * class holds one or more references to COM objects, DOM nodes, or other
     * disposable objects, it should extend this class or implement the disposable
     * interface (defined in goog.disposable.IDisposable).
     * @implements {goog.disposable.IDisposable}
     */
    class Disposable extends __Disposable {}
    abstract class __Disposable implements goog.disposable.IDisposable {
        /**
         */
        constructor();

        /**
         * If monitoring the goog.Disposable instances is enabled, stores the creation
         * stack trace of the Disposable instance.
         * @type {string|undefined}
         */
        creationStack: string|undefined;

        /**
         * Whether the object has been disposed of.
         * @type {boolean}
         * @private
         */
        private disposed_: boolean;

        /**
         * Callbacks to invoke when this object is disposed.
         * @type {Array<!Function>}
         * @private
         */
        private onDisposeCallbacks_: Function[];

        dispose(): void;

        /**
         * @return {boolean} Whether the object has been disposed of.
         * @deprecated Use {@link #isDisposed} instead.
         */
        getDisposed(): boolean;

        isDisposed(): boolean;

        /**
         * Associates a disposable object with this object so that they will be disposed
         * together.
         * @param {goog.disposable.IDisposable} disposable that will be disposed when
         *     this object is disposed.
         */
        registerDisposable(disposable: goog.disposable.IDisposable): void;

        /**
         * Invokes a callback function when this object is disposed. Callbacks are
         * invoked in the order in which they were added. If a callback is added to
         * an already disposed Disposable, it will be called immediately.
         * @param {function(this:T):?} callback The callback function.
         * @param {T=} opt_scope An optional scope to call the callback in.
         * @return {function(this:T):?} A callback you can pass to
         *     removeOnDisposeCallback to undo this addOnDisposeCallback.
         * @template T
         */
        addOnDisposeCallback<T>(callback: (this: T) => any, opt_scope?: T): (this: T) => any;

        /**
         * Remove a callback added with addOnDisposeCallback.
         * @param {function(this:T):?} callback The callback function.
         * @template T
         */
        removeOnDisposeCallback<T>(callback: (this: T) => any): void;

        /**
         * Deletes or nulls out any references to COM objects, DOM nodes, or other
         * disposable objects. Classes that extend `goog.Disposable` should
         * override this method.
         * Not reentrant. To avoid calling it twice, it must only be called from the
         * subclass' `disposeInternal` method. Everywhere else the public
         * `dispose` method must be used.
         * For example:
         * <pre>
         *   mypackage.MyClass = function() {
         *     mypackage.MyClass.base(this, 'constructor');
         *     // Constructor logic specific to MyClass.
         *     ...
         *   };
         *   goog.inherits(mypackage.MyClass, goog.Disposable);
         *
         *   mypackage.MyClass.prototype.disposeInternal = function() {
         *     // Dispose logic specific to MyClass.
         *     ...
         *     // Call superclass's disposeInternal at the end of the subclass's, like
         *     // in C++, to avoid hard-to-catch issues.
         *     mypackage.MyClass.base(this, 'disposeInternal');
         *   };
         * </pre>
         * @protected
         */
        protected disposeInternal(): void;
    }

    /**
     * Calls `dispose` on the argument if it supports it. If obj is not an
     *     object with a dispose() method, this is a no-op.
     * @param {*} obj The object to dispose of.
     */
    function dispose(obj: any): void;

    /**
     * Calls `dispose` on each member of the list that supports it. (If the
     * member is an ArrayLike, then `goog.disposeAll()` will be called
     * recursively on each of its members.) If the member is not an object with a
     * `dispose()` method, then it is ignored.
     * @param {...*} var_args The list.
     */
    function disposeAll(...var_args: any[]): void;
}

declare namespace goog.Disposable {
    /**
     * @enum {number} Different monitoring modes for Disposable.
     */
    enum MonitoringMode { OFF, PERMANENT, INTERACTIVE }

    /**
     * @return {!Array<!goog.Disposable>} All `goog.Disposable` objects that
     *     haven't been disposed of.
     */
    function getUndisposedObjects(): goog.Disposable[];

    /**
     * Clears the registry of undisposed objects but doesn't dispose of them.
     */
    function clearUndisposedObjects(): void;

    /**
     * Returns True if we can verify the object is disposed.
     * Calls `isDisposed` on the argument if it supports it.  If obj
     * is not an object with an isDisposed() method, return false.
     * @param {*} obj The object to investigate.
     * @return {boolean} True if we can verify the object is disposed.
     */
    function isDisposed(obj: any): boolean;
}
