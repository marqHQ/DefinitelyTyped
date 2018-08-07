/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../html/safehtml.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./popup.d.ts"/>
/// <reference path="../events/events.d.ts"/>
/// <reference path="../positioning/positioning.d.ts"/>
/// <reference path="../positioning/abstractposition.d.ts"/>
/// <reference path="../positioning/anchoredposition.d.ts"/>
/// <reference path="../math/box.d.ts"/>

declare module 'goog:goog.ui.Bubble' {
    import alias = goog.ui.Bubble;
    export default alias;
}

declare namespace goog.ui {
    /**
     * The Bubble provides a general purpose bubble implementation that can be
     * anchored to a particular element and displayed for a period of time.
     *
     * @extends {goog.ui.Component}
     */
    class Bubble extends __Bubble {}
    abstract class __Bubble extends goog.ui.__Component {
        /**
         * @param {string|!goog.html.SafeHtml|?Element} message Message or an element
         *     to display inside the bubble. Strings are treated as plain-text and will
         *     be HTML escaped.
         * @param {Object=} opt_config The configuration
         *     for the bubble. If not specified, the default configuration will be
         *     used. {@see goog.ui.Bubble.defaultConfig}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(
            message: string|goog.html.SafeHtml|Element|null, opt_config?: Object, opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * The HTML string or element to display inside the bubble.
         *
         * @type {!goog.html.SafeHtml|Element}
         * @private
         */
        private message_: goog.html.SafeHtml|Element;

        /**
         * The Popup element used to position and display the bubble.
         *
         * @type {goog.ui.Popup}
         * @private
         */
        private popup_: goog.ui.Popup;

        /**
         * Configuration map that contains bubble's UI elements.
         *
         * @type {Object}
         * @private
         */
        private config_: Object;

        /**
         * Id of the close button for this bubble.
         *
         * @type {string}
         * @private
         */
        private closeButtonId_: string;

        /**
         * Id of the div for the embedded element.
         *
         * @type {string}
         * @private
         */
        private messageId_: string;

        /**
         * In milliseconds, timeout after which the button auto-hides. Null means
         * infinite.
         * @type {?number}
         * @private
         */
        private timeout_: number|null;

        /**
         * Key returned by the bubble timer.
         * @type {?number}
         * @private
         */
        private timerId_: number|null;

        /**
         * Key returned by the listen function for the close button.
         * @type {goog.events.Key}
         * @private
         */
        private listener_: goog.events.Key;

        /**
         * Attaches the bubble to an anchor element. Computes the positioning and
         * orientation of the bubble.
         *
         * @param {Element} anchorElement The element to which we are attaching.
         */
        attach(anchorElement: Element): void;

        /**
         * Sets the corner of the bubble to used in the positioning algorithm.
         *
         * @param {goog.positioning.Corner} corner The bubble corner used for
         *     positioning constants.
         */
        setPinnedCorner(corner: goog.positioning.Corner): void;

        /**
         * Sets the position of the bubble. Pass null for corner in AnchoredPosition
         * for corner to be computed automatically.
         *
         * @param {goog.positioning.AbstractPosition} position The position of the
         *     bubble.
         */
        setPosition(position: goog.positioning.AbstractPosition): void;

        /**
         * Sets the timeout after which bubble hides itself.
         *
         * @param {number} timeout Timeout of the bubble.
         */
        setTimeout(timeout: number): void;

        /**
         * Sets whether the bubble should be automatically hidden whenever user clicks
         * outside the bubble element.
         *
         * @param {boolean} autoHide Whether to hide if user clicks outside the bubble.
         */
        setAutoHide(autoHide: boolean): void;

        /**
         * Sets whether the bubble should be visible.
         *
         * @param {boolean} visible Desired visibility state.
         */
        setVisible(visible: boolean): void;

        /**
         * @return {boolean} Whether the bubble is visible.
         */
        isVisible(): boolean;

        /**
         * Creates element's contents and configures all timers. This is called on
         * setVisible(true).
         * @private
         */
        private configureElement_(): void;

        /**
         * Gets rid of the element's contents and all associated timers and listeners.
         * This is called on dispose as well as on setVisible(false).
         * @private
         */
        private unconfigureElement_(): void;

        /**
         * Computes bubble position based on anchored element.
         *
         * @param {Element} anchorElement The element to which we are attaching.
         * @param {goog.positioning.Corner} corner The bubble corner used for
         *     positioning.
         * @private
         */
        private setAnchoredPosition_(anchorElement: Element, corner: goog.positioning.Corner): void;

        /**
         * Hides the bubble. This is called asynchronously by timer of event processor
         * for the mouse click on the close button.
         * @private
         */
        private hideBubble_(): void;

        /**
         * Returns an AnchoredPosition that will position the bubble optimally
         * given the position of the anchor element and the size of the viewport.
         *
         * @param {Element} anchorElement The element to which the bubble is attached.
         * @return {!goog.positioning.AnchoredPosition} The AnchoredPosition
         *     to give to {@link #setPosition}.
         */
        getComputedAnchoredPosition(anchorElement: Element): goog.positioning.AnchoredPosition;

        /**
         * Computes the pinned corner for the bubble.
         *
         * @param {Element} anchorElement The element to which the button is attached.
         * @return {goog.positioning.Corner} The pinned corner.
         * @private
         */
        private computePinnedCorner_(anchorElement: Element): goog.positioning.Corner;

        /**
         * Computes the right offset for a given bubble corner
         * and creates a margin element for it. This is done to have the
         * button anchor element on its frame rather than on the corner.
         *
         * @param {goog.positioning.Corner} corner The corner.
         * @return {!goog.math.Box} the computed margin. Only left or right fields are
         *     non-zero, but they may be negative.
         * @private
         */
        private createMarginForCorner_(corner: goog.positioning.Corner): goog.math.Box;

        /**
         * Computes the HTML string for a given bubble orientation.
         *
         * @param {goog.positioning.Corner} corner The corner.
         * @return {!goog.html.SafeHtml} The HTML string to place inside the
         *     bubble's popup.
         * @private
         */
        private computeHtmlForCorner_(corner: goog.positioning.Corner): goog.html.SafeHtml;
    }
}

declare namespace goog.ui.Bubble {
    /**
     * A default configuration for the bubble.
     *
     * @type {Object}
     */
    let defaultConfig: Object;
}
