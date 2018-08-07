/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../transitionbase.d.ts"/>
/// <reference path="../../style/transition.d.ts"/>

declare module 'goog:goog.fx.css3.Transition' {
    import alias = goog.fx.css3.Transition;
    export default alias;
}

declare namespace goog.fx.css3 {
    /**
     * A class to handle targeted CSS3 transition. This class
     * handles common features required for targeted CSS3 transition.
     *
     * Browser that does not support CSS3 transition will still receive all
     * the events fired by the transition object, but will not have any transition
     * played. If the browser supports the final state as set in setFinalState
     * method, the element will ends in the final state.
     *
     * Transitioning multiple properties with the same setting is possible
     * by setting Css3Property's property to 'all'. Performing multiple
     * transitions can be done via setting multiple initialStyle,
     * finalStyle and transitions. Css3Property's delay can be used to
     * delay one of the transition. Here is an example for a transition
     * that expands on the width and then followed by the height:
     *
     * <pre>
     *   var animation = new goog.fx.css3.Transition(
     *     element,
     *     duration,
     *     {width: 10px, height: 10px},
     *     {width: 100px, height: 100px},
     *     [
     *       {property: width, duration: 1, timing: 'ease-in', delay: 0},
     *       {property: height, duration: 1, timing: 'ease-in', delay: 1}
     *     ]
     *   );
     * </pre>
     *
     * @extends {goog.fx.TransitionBase}
     * @struct
     */
    class Transition extends __Transition {}
    abstract class __Transition extends goog.fx.__TransitionBase {
        /**
         * @param {Element} element The element to be transitioned.
         * @param {number} duration The duration of the transition in seconds.
         *     This should be the longest of all transitions, including any delay.
         * @param {Object} initialStyle Initial style properties of the element before
         *     animating. Set using `goog.style.setStyle`.
         * @param {Object} finalStyle Final style properties of the element after
         *     animating. Set using `goog.style.setStyle`.
         * @param {goog.style.transition.Css3Property|
         *     Array<goog.style.transition.Css3Property>} transitions A single CSS3
         *     transition property or an array of it.
         */
        constructor(
            element: Element,
            duration: number,
            initialStyle: Object,
            finalStyle: Object,
            transitions: goog.style.transition.Css3Property|goog.style.transition.Css3Property[]
        );

        /**
         * Timer id to be used to cancel animation part-way.
         * @private {number}
         */
        private timerId_: any /*missing*/;

        /**
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * @type {number}
         * @private
         */
        private duration_: number;

        /**
         * @type {Object}
         * @private
         */
        private initialStyle_: Object;

        /**
         * @type {Object}
         * @private
         */
        private finalStyle_: Object;

        /**
         * @type {Array<goog.style.transition.Css3Property>}
         * @private
         */
        private transitions_: goog.style.transition.Css3Property[];

        /**
         * Helper method for play method. This needs to be executed on a timer.
         * @private
         */
        private play_(): void;

        /**
         * Helper method for stop method.
         * @param {boolean} stopped If the transition was stopped.
         * @private
         */
        private stop_(stopped: boolean): void;
    }
}
