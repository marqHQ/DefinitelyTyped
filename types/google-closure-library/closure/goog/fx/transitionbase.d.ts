/// <reference path="../../../globals.d.ts"/>
/// <reference path="../events/eventtarget.d.ts"/>
/// <reference path="./transition.d.ts"/>

declare module 'goog:goog.fx.TransitionBase' {
    import alias = goog.fx.TransitionBase;
    export default alias;
}

declare module 'goog:goog.fx.TransitionBase.State' {
    import alias = goog.fx.TransitionBase.State;
    export default alias;
}

declare namespace goog.fx {
    /**
     * Constructor for a transition object.
     *
     * @struct
     * @implements {goog.fx.Transition}
     * @extends {goog.events.EventTarget}
     */
    class TransitionBase extends __TransitionBase {}
    abstract class __TransitionBase extends goog.events.__EventTarget implements goog.fx.Transition {
        /**
         */
        constructor();

        /**
         * The internal state of the animation.
         * @type {goog.fx.TransitionBase.State}
         * @private
         */
        private state_: goog.fx.TransitionBase.State;

        /**
         * Timestamp for when the animation was started.
         * @type {?number}
         * @protected
         */
        protected startTime: number|null;

        /**
         * Timestamp for when the animation finished or was stopped.
         * @type {?number}
         * @protected
         */
        protected endTime: number|null;

        /**
         * Pauses the animation.
         */
        pause: any /*missing*/;

        /**
         * Returns the current state of the animation.
         * @return {goog.fx.TransitionBase.State} State of the animation.
         */
        getStateInternal(): goog.fx.TransitionBase.State;

        /**
         * Sets the current state of the animation to playing.
         * @protected
         */
        protected setStatePlaying(): void;

        /**
         * Sets the current state of the animation to paused.
         * @protected
         */
        protected setStatePaused(): void;

        /**
         * Sets the current state of the animation to stopped.
         * @protected
         */
        protected setStateStopped(): void;

        /**
         * @return {boolean} True iff the current state of the animation is playing.
         */
        isPlaying(): boolean;

        /**
         * @return {boolean} True iff the current state of the animation is paused.
         */
        isPaused(): boolean;

        /**
         * @return {boolean} True iff the current state of the animation is stopped.
         */
        isStopped(): boolean;

        /**
         * Dispatches the BEGIN event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onBegin(): void;

        /**
         * Dispatches the END event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onEnd(): void;

        /**
         * Dispatches the FINISH event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onFinish(): void;

        /**
         * Dispatches the PAUSE event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onPause(): void;

        /**
         * Dispatches the PLAY event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onPlay(): void;

        /**
         * Dispatches the RESUME event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onResume(): void;

        /**
         * Dispatches the STOP event. Sub classes should override this instead
         * of listening to the event, and call this instead of dispatching the event.
         * @protected
         */
        protected onStop(): void;

        /**
         * Dispatches an event object for the current animation.
         * @param {string} type Event type that will be dispatched.
         * @protected
         */
        protected dispatchAnimationEvent(type: string): void;

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

declare namespace goog.fx.TransitionBase {
    /**
     * Enum for the possible states of an animation.
     * @enum {number}
     */
    enum State { STOPPED, PAUSED, PLAYING }
}
