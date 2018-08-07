/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/inputhandler.d.ts"/>
/// <reference path="../events/events.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>
/// <reference path="../math/rect.d.ts"/>
/// <reference path="../events/event.d.ts"/>

declare module 'goog:goog.ui.HsvPalette' {
    import alias = goog.ui.HsvPalette;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Creates an HSV palette. Allows a user to select the hue, saturation and
     * value/brightness.
     * @extends {goog.ui.Component}
     */
    class HsvPalette extends __HsvPalette {}
    abstract class __HsvPalette extends goog.ui.__Component {
        /**
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         * @param {string=} opt_color Optional initial color (default is red).
         * @param {string=} opt_class Optional base for creating classnames (default is
         *     goog.getCssName('goog-hsv-palette')).
         */
        constructor(opt_domHelper?: goog.dom.DomHelper, opt_color?: string, opt_class?: string);

        /**
         * The base class name for the component.
         * @type {string}
         * @protected
         */
        protected className: string;

        /**
         * The document which is being listened to.
         * type {HTMLDocument}
         * @private
         */
        private document_: any /*missing*/;

        /**
         * DOM element representing the hue/saturation background image.
         * @type {HTMLElement}
         * @private
         */
        private hsImageEl_: HTMLElement;

        /**
         * DOM element representing the hue/saturation handle.
         * @type {HTMLElement}
         * @private
         */
        private hsHandleEl_: HTMLElement;

        /**
         * DOM element representing the value background image.
         * @type {HTMLElement}
         * @protected
         */
        protected valueBackgroundImageElement: HTMLElement;

        /**
         * DOM element representing the value handle.
         * @type {HTMLElement}
         * @private
         */
        private vHandleEl_: HTMLElement;

        /**
         * DOM element representing the current color swatch.
         * @type {Element}
         * @protected
         */
        protected swatchElement: Element;

        /**
         * DOM element representing the hex color input text field.
         * @type {Element}
         * @protected
         */
        protected inputElement: Element;

        /**
         * Input handler object for the hex value input field.
         * @type {goog.events.InputHandler}
         * @private
         */
        private inputHandler_: goog.events.InputHandler;

        /**
         * Listener key for the mousemove event (during a drag operation).
         * @type {goog.events.Key}
         * @protected
         */
        protected mouseMoveListener: goog.events.Key;

        /**
         * Listener key for the mouseup event (during a drag operation).
         * @type {goog.events.Key}
         * @protected
         */
        protected mouseUpListener: goog.events.Key;

        /** @private {!goog.color.Hsv} */
        private hsv_: any /*missing*/;

        /**
         * Hex representation of the color.
         * @protected {string}
         */
        protected color: any /*missing*/;

        /**
         * Gets the color that is currently selected in this color picker.
         * @return {string} The string of the selected color.
         */
        getColor(): string;

        /**
         * Alpha transparency of the currently selected color, in [0, 1].
         * For the HSV palette this always returns 1. The HSVA palette overrides
         * this method.
         * @return {number} The current alpha value.
         */
        getAlpha(): number;

        /**
         * Updates the text entry field.
         * @protected
         */
        protected updateInput(): void;

        /**
         * Sets which color is selected and update the UI.
         * @param {string} color The selected color.
         */
        setColor(color: string): void;

        /**
         * Sets which color is selected.
         * @param {string} color The selected color.
         * @protected
         */
        protected setColorInternal(color: string): void;

        /**
         * Alters the hue, saturation, and/or value of the currently selected color and
         * updates the UI.
         * @param {?number=} opt_hue (optional) hue in [0, 1].
         * @param {?number=} opt_saturation (optional) saturation in [0, 1].
         * @param {?number=} opt_value (optional) value in [0, 255].
         */
        setHsv(opt_hue?: number|null, opt_saturation?: number|null, opt_value?: number|null): void;

        /**
         * Alters the hue, saturation, and/or value of the currently selected color.
         * @param {?number=} opt_hue (optional) hue in [0, 1].
         * @param {?number=} opt_saturation (optional) saturation in [0, 1].
         * @param {?number=} opt_value (optional) value in [0, 255].
         * @private
         */
        private setHsv_(opt_hue?: number|null, opt_saturation?: number|null, opt_value?: number|null): void;

        /**
         * Updates the position, opacity, and styles for the UI representation of the
         * palette.
         * @protected
         */
        protected updateUi(): void;

        /**
         * Handles mousedown events on palette UI elements.
         * @param {goog.events.BrowserEvent} e Event object.
         * @protected
         */
        protected handleMouseDown(e: goog.events.BrowserEvent): void;

        /**
         * Handles mousemove events on the document once a drag operation on the value
         * slider has started.
         * @param {goog.math.Rect} b Boundaries of the value slider object at the start
         *     of the drag operation.
         * @param {goog.events.BrowserEvent} e Event object.
         * @private
         */
        private handleMouseMoveV_(b: goog.math.Rect, e: goog.events.BrowserEvent): void;

        /**
         * Handles mousemove events on the document once a drag operation on the
         * hue/saturation slider has started.
         * @param {goog.math.Rect} b Boundaries of the value slider object at the start
         *     of the drag operation.
         * @param {goog.events.BrowserEvent} e Event object.
         * @private
         */
        private handleMouseMoveHs_(b: goog.math.Rect, e: goog.events.BrowserEvent): void;

        /**
         * Handles mouseup events on the document, which ends a drag operation.
         * @param {goog.events.Event} e Event object.
         * @protected
         */
        protected handleMouseUp(e: goog.events.Event): void;

        /**
         * Handles input events on the hex value input field.
         * @param {goog.events.Event} e Event object.
         * @protected
         */
        protected handleInput(e: goog.events.Event): void;
    }
}

declare namespace goog.ui.HsvPalette {
}
