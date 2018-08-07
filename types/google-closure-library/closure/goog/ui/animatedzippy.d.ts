/// <reference path="../../../globals.d.ts"/>
/// <reference path="./zippy.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../a11y/aria/roles.d.ts"/>
/// <reference path="../fx/animation.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.AnimatedZippy' {
    import alias = goog.ui.AnimatedZippy;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Zippy widget. Expandable/collapsible container, clicking the header toggles
     * the visibility of the content.
     *
     * @extends {goog.ui.Zippy}
     */
    class AnimatedZippy extends __AnimatedZippy {}
    abstract class __AnimatedZippy extends goog.ui.__Zippy {
        /**
         * @param {Element|string|null} header Header element, either element
         *     reference, string id or null if no header exists.
         * @param {Element|string} content Content element, either element reference or
         *     string id.
         * @param {boolean=} opt_expanded Initial expanded/visibility state. Defaults to
         *     false.
         * @param {goog.dom.DomHelper=} opt_domHelper An optional DOM helper.
         * @param {goog.a11y.aria.Role<string>=} opt_role ARIA role, default TAB.
         */
        constructor(
            header: Element|string|null,
            content: Element|string,
            opt_expanded?: boolean,
            opt_domHelper?: goog.dom.DomHelper,
            opt_role?: goog.a11y.aria.Role
        );

        /**
         * Content wrapper, used for animation.
         * @type {Element}
         * @private
         */
        private elWrapper_: Element;

        /**
         * Reference to animation or null if animation is not active.
         * @type {goog.fx.Animation}
         * @private
         */
        private anim_: goog.fx.Animation;

        /**
         * Duration of expand/collapse animation, in milliseconds.
         * @type {number}
         */
        animationDuration: number;

        /**
         * Acceleration function for expand/collapse animation.
         * @type {!Function}
         */
        animationAcceleration: Function;

        /**
         * @return {boolean} Whether the zippy is in the process of being expanded or
         *     collapsed.
         */
        isBusy(): boolean;

        /**
         * Called during animation
         *
         * @param {goog.events.Event} e The event.
         * @private
         */
        private onAnimate_(e: goog.events.Event): void;

        /**
         * Called once the expand/collapse animation has started.
         *
         * @param {boolean} expanding Expanded/visibility state.
         * @private
         */
        private onAnimationBegin_(expanding: boolean): void;

        /**
         * Called once the expand/collapse animation has completed.
         *
         * @param {boolean} expanded Expanded/visibility state.
         * @private
         */
        private onAnimationCompleted_(expanded: boolean): void;
    }
}

declare namespace goog.ui.AnimatedZippy {
    /**
     * Constants for event names.
     *
     * @const
     */
    const Events: any /*missing*/;
}
