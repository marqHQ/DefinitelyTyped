/// <reference path="../../../globals.d.ts"/>
/// <reference path="../ui/component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>

declare module 'goog:goog.debug.FpsDisplay' {
    import alias = goog.debug.FpsDisplay;
    export default alias;
}

declare namespace goog.debug {
    /**
     * Displays frames per seconds that the window this component is
     * rendered in is animating at.
     *
     * @extends {goog.ui.Component}
     * @final
     */
    class FpsDisplay extends __FpsDisplay {}
    abstract class __FpsDisplay extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper An optional dom helper.
         */
        constructor(opt_domHelper?: goog.dom.DomHelper);

        /**
         * The current animation.
         * @type {goog.debug.FpsDisplay.FpsAnimation_}
         * @private
         */
        private animation_: any;

        /**
         * @param {number} now The current time.
         * @private
         */
        private handleDelay_(now: number): void;

        /**
         * @return {number} The average frames per second.
         */
        getFps(): number;
    }
}

declare namespace goog.debug.FpsDisplay {
    /**
     * @private
     */
    class FpsAnimation_ extends __FpsAnimation_ {}
    abstract class __FpsAnimation_ {
        /**
         * @param {Element} elem An element to hold the FPS count.
         */
        constructor(elem: Element);

        /**
         * An element to hold the current FPS rate.
         * @type {Element}
         * @private
         */
        private element_: Element;

        /**
         * The number of frames observed so far.
         * @type {number}
         * @private
         */
        private frameNumber_: number;

        /**
         * The last time which we reported FPS at.
         * @type {number}
         * @private
         */
        private lastTime_: number;

        /**
         * The last average FPS.
         * @type {number}
         * @private
         */
        private lastFps_: number;

        /**
         * @param {number} now The current time.
         */
        onAnimationFrame(now: number): void;
    }

    /**
     * CSS class for the FPS display.
     */
    let CSS: any /*missing*/;

    /**
     * The number of samples per FPS report.
     */
    let SAMPLES: any /*missing*/;
}
