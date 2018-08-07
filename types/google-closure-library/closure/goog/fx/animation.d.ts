/// <reference path="../../../globals.d.ts"/>
/// <reference path="./transitionbase.d.ts"/>
/// <reference path="./anim/anim.d.ts"/>
/// <reference path="./transition.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.fx.AnimationEvent' {
    import alias = goog.fx.AnimationEvent;
    export default alias;
}

declare module 'goog:goog.fx.Animation' {
    import alias = goog.fx.Animation;
    export default alias;
}

declare module 'goog:goog.fx.Animation.State' {
    import alias = goog.fx.Animation.State;
    export default alias;
}

declare module 'goog:goog.fx.Animation.EventType' {
    import alias = goog.fx.Animation.EventType;
    export default alias;
}

declare namespace goog.fx {
    /**
     * Constructor for an animation object.
     * @struct
     * @implements {goog.fx.anim.Animated}
     * @implements {goog.fx.Transition}
     * @extends {goog.fx.TransitionBase}
     */
    class Animation extends __Animation {}
    abstract class __Animation extends goog.fx.__TransitionBase implements goog.fx.anim.Animated, goog.fx.Transition {
        /**
         * @param {Array<number>} start Array for start coordinates.
         * @param {Array<number>} end Array for end coordinates.
         * @param {number} duration Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(start: number[], end: number[], duration: number, opt_acc?: Function);

        /**
         * Start point.
         * @type {Array<number>}
         * @protected
         */
        protected startPoint: number[];

        /**
         * End point.
         * @type {Array<number>}
         * @protected
         */
        protected endPoint: number[];

        /**
         * Duration of animation in milliseconds.
         * @type {number}
         * @protected
         */
        protected duration: number;

        /**
         * Acceleration function, which must return a number between 0 and 1 for
         * inputs between 0 and 1.
         * @type {Function|undefined}
         * @private
         */
        private accel_: Function|undefined;

        /**
         * Current coordinate for animation.
         * @type {Array<number>}
         * @protected
         */
        protected coords: number[];

        /**
         * Whether the animation should use "right" rather than "left" to position
         * elements in RTL.  This is a temporary flag to allow clients to transition
         * to the new behavior at their convenience.  At some point it will be the
         * default.
         * @type {boolean}
         * @private
         */
        private useRightPositioningForRtl_: boolean;

        /**
         * Current frame rate.
         * @private {number}
         */
        private fps_: any /*missing*/;

        /**
         * Percent of the way through the animation.
         * @protected {number}
         */
        protected progress: any /*missing*/;

        /**
         * Timestamp for when last frame was run.
         * @protected {?number}
         */
        protected lastFrame: any /*missing*/;

        /**
         * @return {number} The duration of this animation in milliseconds.
         */
        getDuration(): number;

        /**
         * Sets whether the animation should use "right" rather than "left" to position
         * elements.  This is a temporary flag to allow clients to transition
         * to the new component at their convenience.  At some point "right" will be
         * used for RTL elements by default.
         * @param {boolean} useRightPositioningForRtl True if "right" should be used for
         *     positioning, false if "left" should be used for positioning.
         */
        enableRightPositioningForRtl(useRightPositioningForRtl: boolean): void;

        /**
         * Whether the animation should use "right" rather than "left" to position
         * elements.  This is a temporary flag to allow clients to transition
         * to the new component at their convenience.  At some point "right" will be
         * used for RTL elements by default.
         * @return {boolean} True if "right" should be used for positioning, false if
         *     "left" should be used for positioning.
         */
        isRightPositioningForRtlEnabled(): boolean;

        /**
         * @return {number} The current progress of the animation, the number
         *     is between 0 and 1 inclusive.
         */
        getProgress(): number;

        /**
         * Sets the progress of the animation.
         * @param {number} progress The new progress of the animation.
         */
        setProgress(progress: number): void;

        /**
         * Stops an animation, fires a 'destroy' event and then removes all the event
         * handlers to clean up memory.
         * @deprecated Use dispose() instead.
         */
        destroy(): void;

        /**
         * Handles the actual iteration of the animation in a timeout
         * @param {number} now The current time.
         */
        cycle(now: number): void;

        /**
         * Calculates current coordinates, based on the current state.  Applies
         * the acceleration function if it exists.
         * @param {number} t Percentage of the way through the animation as a decimal.
         * @private
         */
        private updateCoords_(t: number): void;

        /**
         * Dispatches the ANIMATE event. Sub classes should override this instead
         * of listening to the event.
         * @protected
         */
        protected onAnimate(): void;

        /**
         * Dispatches the DESTROY event. Sub classes should override this instead
         * of listening to the event.
         * @protected
         */
        protected onDestroy(): void;

        /**
         * Function called when a frame is requested for the animation.
         *
         * @param {number} now Current time in milliseconds.
         */
        onAnimationFrame(now: number): void;

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

    /**
     * Class for an animation event object.
     * @struct
     * @extends {goog.events.Event}
     */
    class AnimationEvent extends __AnimationEvent {}
    abstract class __AnimationEvent extends goog.events.__Event {
        /**
         * @param {string} type Event type.
         * @param {goog.fx.Animation} anim An animation object.
         */
        constructor(type: string, anim: goog.fx.Animation);

        /**
         * The current coordinates.
         * @type {Array<number>}
         */
        coords: number[];

        /**
         * The x coordinate.
         * @type {number}
         */
        x: number;

        /**
         * The y coordinate.
         * @type {number}
         */
        y: number;

        /**
         * The z coordinate.
         * @type {number}
         */
        z: number;

        /**
         * The current duration.
         * @type {number}
         */
        duration: number;

        /**
         * The current progress.
         * @type {number}
         */
        progress: number;

        /**
         * Frames per second so far.
         */
        fps: any /*missing*/;

        /**
         * The state of the animation.
         * @type {number}
         */
        state: number;

        /**
         * The animation object.
         * @type {goog.fx.Animation}
         */
        anim: goog.fx.Animation;

        /**
         * Returns the coordinates as integers (rounded to nearest integer).
         * @return {!Array<number>} An array of the coordinates rounded to
         *     the nearest integer.
         */
        coordsAsInts(): number[];
    }
}

declare namespace goog.fx.Animation {
    /**
     * Events fired by the animation.
     * @enum {string}
     */
    enum EventType { PLAY, BEGIN, RESUME, END, STOP, FINISH, PAUSE, ANIMATE, DESTROY }

    /**
     * @deprecated Use goog.fx.anim.TIMEOUT.
     */
    let TIMEOUT: any /*missing*/;

    /**
     * Enum for the possible states of an animation.
     * @deprecated Use goog.fx.Transition.State instead.
     * @enum {number}
     */
    enum State { STOPPED, PAUSED, PLAYING }

    /**
     * @deprecated Use goog.fx.anim.setAnimationWindow.
     * @param {Window} animationWindow The window in which to animate elements.
     */
    function setAnimationWindow(animationWindow: Window): void;
}
