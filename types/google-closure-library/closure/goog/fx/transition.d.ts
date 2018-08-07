/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.fx.Transition' {
    import alias = goog.fx.Transition;
    export default alias;
}

declare module 'goog:goog.fx.Transition.EventType' {
    import alias = goog.fx.Transition.EventType;
    export default alias;
}

declare namespace goog.fx {
    interface Transition {
        /**
         * @type {function()}
         * Plays the transition.
         */
        play: () => void;

        /**
         * @type {function()}
         * Stops the transition.
         */
        stop: () => void;
    }
}

declare namespace goog.fx.Transition {
    /**
     * Transition event types.
     * @enum {string}
     */
    enum EventType { PLAY, BEGIN, RESUME, END, STOP, FINISH, PAUSE }
}
