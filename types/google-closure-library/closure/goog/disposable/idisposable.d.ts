/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.disposable.IDisposable' {
    import alias = goog.disposable.IDisposable;
    export default alias;
}

declare namespace goog.disposable {
    /**
     * Interface for a disposable object.  If a instance requires cleanup
     * (references COM objects, DOM nodes, or other disposable objects), it should
     * implement this interface (it may subclass goog.Disposable).
     * @record
     */
    interface IDisposable {
        /**
         * Disposes of the object and its resources.
         * @return {void} Nothing.
         */
        dispose(): void;

        /**
         * @return {boolean} Whether the object has been disposed of.
         */
        isDisposed(): boolean;
    }
}
