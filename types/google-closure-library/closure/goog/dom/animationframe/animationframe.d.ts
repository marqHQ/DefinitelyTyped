/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.dom.animationFrame' {
    import alias = goog.dom.animationFrame;
    export default alias;
}

declare module 'goog:goog.dom.animationFrame.State' {
    import alias = goog.dom.animationFrame.State;
    export default alias;
}

declare module 'goog:goog.dom.animationFrame.Spec' {
    import alias = goog.dom.animationFrame.Spec;
    export default alias;
}

declare namespace goog.dom.animationFrame {
    /**
     * A type to represent state. Users may add properties as desired.
     * @final
     */
    class State extends __State {}
    abstract class __State {
        /**
         */
        constructor();
    }

    /**
     * @typedef {{
     *   measure: (!Function|undefined),
     *   mutate: (!Function|undefined)
     * }}
     */
    interface Spec {
        measure: Function|undefined;
        mutate: Function|undefined;
    }

    /**
     * Returns a function that schedules the two passed-in functions to be run upon
     * the next animation frame. Calling the function again during the same
     * animation frame does nothing.
     *
     * The function under the "measure" key will run first and together with all
     * other functions scheduled under this key and the function under "mutate" will
     * run after that.
     *
     * @param {{
     *   measure: (function(this:THIS, !goog.dom.animationFrame.State)|undefined),
     *   mutate: (function(this:THIS, !goog.dom.animationFrame.State)|undefined)
     * }} spec
     * @param {THIS=} opt_context Context in which to run the function.
     * @return {function(...?)}
     * @template THIS
     */
    function createTask<THIS>(
        spec: {
            measure: ((this: THIS, _0: goog.dom.animationFrame.State) => void)|undefined;
            mutate: ((this: THIS, _0: goog.dom.animationFrame.State) => void) | undefined
        },
        opt_context?: THIS
    ): (_0: any[]) => void;

    /**
     * @return {boolean} Whether the animationframe is currently running. For use
     *     by callers who need not to delay tasks scheduled during runTasks_ for an
     *     additional frame.
     */
    function isRunning(): boolean;
}
