/// <reference path="../../../globals.d.ts"/>
/// <reference path="./transitionbase.d.ts"/>
/// <reference path="./animation.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.fx.AnimationSerialQueue' {
    import alias = goog.fx.AnimationSerialQueue;
    export default alias;
}

declare module 'goog:goog.fx.AnimationQueue' {
    import alias = goog.fx.AnimationQueue;
    export default alias;
}

declare module 'goog:goog.fx.AnimationParallelQueue' {
    import alias = goog.fx.AnimationParallelQueue;
    export default alias;
}

declare namespace goog.fx {
    /**
     * Constructor for AnimationQueue object.
     *
     * @struct
     * @extends {goog.fx.TransitionBase}
     */
    class AnimationQueue extends __AnimationQueue {}
    abstract class __AnimationQueue extends goog.fx.__TransitionBase {
        /**
         */
        constructor();

        /**
         * An array holding all animations in the queue.
         * @type {Array<goog.fx.TransitionBase>}
         * @protected
         */
        protected queue: goog.fx.TransitionBase[];

        /**
         * Pushes an Animation to the end of the queue.
         * @param {goog.fx.TransitionBase} animation The animation to add to the queue.
         */
        add(animation: goog.fx.TransitionBase): void;

        /**
         * Removes an Animation from the queue.
         * @param {goog.fx.Animation} animation The animation to remove.
         */
        remove(animation: goog.fx.Animation): void;

        /**
         * Handles the event that an animation has finished.
         * @param {goog.events.Event} e The finishing event.
         * @protected
         */
        protected onAnimationFinish(e: goog.events.Event): void;
    }

    /**
     * Constructor for AnimationParallelQueue object.
     * @struct
     * @extends {goog.fx.AnimationQueue}
     */
    class AnimationParallelQueue extends __AnimationParallelQueue {}
    abstract class __AnimationParallelQueue extends goog.fx.__AnimationQueue {
        /**
         */
        constructor();

        /**
         * Number of finished animations.
         * @type {number}
         * @private
         */
        private finishedCounter_: number;
    }

    /**
     * Constructor for AnimationSerialQueue object.
     * @struct
     * @extends {goog.fx.AnimationQueue}
     */
    class AnimationSerialQueue extends __AnimationSerialQueue {}
    abstract class __AnimationSerialQueue extends goog.fx.__AnimationQueue {
        /**
         */
        constructor();

        /**
         * Current animation in queue currently active.
         * @type {number}
         * @private
         */
        private current_: number;
    }
}
