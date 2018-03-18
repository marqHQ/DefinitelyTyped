/// <reference path="../../../globals.d.ts"/>

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
