/// <reference path="../../../globals.d.ts"/>
/// <reference path="./control.d.ts"/>
/// <reference path="./textarearenderer.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/box.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.Textarea' {
    import alias = goog.ui.Textarea;
    export default alias;
}

declare module 'goog:goog.ui.Textarea.EventType' {
    import alias = goog.ui.Textarea.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A textarea control to handle growing/shrinking with textarea.value.
     *
     * @extends {goog.ui.Control}
     */
    class Textarea extends __Textarea {}
    abstract class __Textarea extends goog.ui.__Control {
        /**
         * @param {string} content Text to set as the textarea's value.
         * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
         *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
         *     document interaction.
         */
        constructor(content: string, opt_renderer?: goog.ui.TextareaRenderer, opt_domHelper?: goog.dom.DomHelper);

        /**
         * True if the resizing function is executing, false otherwise.
         * @type {boolean}
         * @private
         */
        private isResizing_: boolean;

        /**
         * Represents if we have focus on the textarea element, used only
         * to render the placeholder if we don't have native placeholder
         * support.
         * @type {boolean}
         * @private
         */
        private hasFocusForPlaceholder_: boolean;

        /**
         * @type {boolean}
         * @private
         */
        private hasUserInput_: boolean;

        /**
         * The height of the textarea as last measured.
         * @type {number}
         * @private
         */
        private height_: number;

        /**
         * A maximum height for the textarea. When set to 0, the default, there is no
         * enforcement of this value during resize.
         * @type {number}
         * @private
         */
        private maxHeight_: number;

        /**
         * A minimum height for the textarea. When set to 0, the default, there is no
         * enforcement of this value during resize.
         * @type {number}
         * @private
         */
        private minHeight_: number;

        /**
         * Whether or not textarea rendering characteristics have been discovered.
         * Specifically we determine, at runtime:
         *    If the padding and border box is included in offsetHeight.
         *    @see {goog.ui.Textarea.prototype.needsPaddingBorderFix_}
         *    If the padding and border box is included in scrollHeight.
         *    @see {goog.ui.Textarea.prototype.scrollHeightIncludesPadding_} and
         *    @see {goog.ui.Textarea.prototype.scrollHeightIncludesBorder_}
         * TODO(user): See if we can determine goog.ui.Textarea.NEEDS_HELP_SHRINKING_.
         * @type {boolean}
         * @private
         */
        private hasDiscoveredTextareaCharacteristics_: boolean;

        /**
         * If a user agent doesn't correctly support the box-sizing:border-box CSS
         * value then we'll need to adjust our height calculations.
         * @see {goog.ui.Textarea.prototype.discoverTextareaCharacteristics_}
         * @type {boolean}
         * @private
         */
        private needsPaddingBorderFix_: boolean;

        /**
         * Whether or not scrollHeight of a textarea includes the padding box.
         * @type {boolean}
         * @private
         */
        private scrollHeightIncludesPadding_: boolean;

        /**
         * Whether or not scrollHeight of a textarea includes the border box.
         * @type {boolean}
         * @private
         */
        private scrollHeightIncludesBorder_: boolean;

        /**
         * For storing the padding box size during enterDocument, to prevent possible
         * measurement differences that can happen after text zooming.
         * Note: runtime padding changes will cause problems with this.
         * @type {goog.math.Box}
         * @private
         */
        private paddingBox_: goog.math.Box;

        /**
         * For storing the border box size during enterDocument, to prevent possible
         * measurement differences that can happen after text zooming.
         * Note: runtime border width changes will cause problems with this.
         * @type {goog.math.Box}
         * @private
         */
        private borderBox_: goog.math.Box;

        /**
         * Default text content for the textarea when it is unchanged and unfocussed.
         * We use the placeholder attribute for all browsers that have support for
         * it (new in HTML5 for the following browsers:
         *
         *   Internet Explorer 10.0
         *   Firefox 4.0
         *   Opera 11.6
         *   Chrome 4.0
         *   Safari 5.0
         *
         * For older browsers, we save the placeholderText_ and set it as the element's
         * value and add the TEXTAREA_PLACEHOLDER_CLASS to indicate that it's a
         * placeholder string.
         * @type {string}
         * @private
         */
        private placeholderText_: string;

        /**
         * Sets the default text for the textarea.
         * @param {string} text The default text for the textarea.
         */
        setPlaceholder(text: string): void;

        /**
         * @return {number} The padding plus the border box height.
         * @private
         */
        private getPaddingBorderBoxHeight_(): number;

        /**
         * @return {number} The minHeight value.
         */
        getMinHeight(): number;

        /**
         * @return {number} The minHeight value with a potential padding fix.
         * @private
         */
        private getMinHeight_(): number;

        /**
         * Sets a minimum height for the textarea, and calls resize if rendered.
         * @param {number} height New minHeight value.
         */
        setMinHeight(height: number): void;

        /**
         * @return {number} The maxHeight value.
         */
        getMaxHeight(): number;

        /**
         * @return {number} The maxHeight value with a potential padding fix.
         * @private
         */
        private getMaxHeight_(): number;

        /**
         * Sets a maximum height for the textarea, and calls resize if rendered.
         * @param {number} height New maxHeight value.
         */
        setMaxHeight(height: number): void;

        /**
         * Sets the textarea's value.
         * @param {*} value The value property for the textarea, will be cast to a
         *     string by the browser when setting textarea.value.
         */
        setValue(value: any): void;

        /**
         * Gets the textarea's value.
         * @return {string} value The value of the textarea.
         */
        getValue(): string;

        /**
         * Resizes the textarea vertically.
         */
        resize(): void;

        /**
         * @return {boolean} True if the element supports the placeholder attribute.
         * @private
         */
        private supportsNativePlaceholder_(): boolean;

        /**
         * Sets the value of the textarea element to the default text.
         * @private
         */
        private restorePlaceholder_(): void;

        /**
         * Gets the textarea's content height + padding height + border height.
         * This is done by getting the scrollHeight and adjusting from there.
         * In the end this result is what we want the new offsetHeight to equal.
         * @return {number} The height of the textarea.
         * @private
         */
        private getHeight_(): number;

        /**
         * Sets the textarea's height.
         * @param {number} height The height to set.
         * @private
         */
        private setHeight_(height: number): void;

        /**
         * Sets the textarea's rows attribute to be the number of newlines + 1.
         * This is necessary when the textarea is hidden, in which case scrollHeight
         * is not available.
         * @private
         */
        private setHeightToEstimate_(): void;

        /**
         * Gets the the height of (possibly present) horizontal scrollbar.
         * @return {number} The height of the horizontal scrollbar.
         * @private
         */
        private getHorizontalScrollBarHeight_(): number;

        /**
         * In order to assess the correct height for a textarea, we need to know
         * whether the scrollHeight (the full height of the text) property includes
         * the values for padding and borders. We can also test whether the
         * box-sizing: border-box setting is working and then tweak accordingly.
         * Instead of hardcoding a list of currently known behaviors and testing
         * for quirksmode, we do a runtime check out of the flow. The performance
         * impact should be very small.
         * @private
         */
        private discoverTextareaCharacteristics_(): void;

        /**
         * Called when the element goes out of focus.
         * @param {goog.events.Event=} opt_e The browser event.
         * @private
         */
        private blur_(opt_e?: goog.events.Event): void;

        /**
         * Resizes the textarea to grow/shrink to match its contents.
         * @param {goog.events.Event=} opt_e The browser event.
         * @private
         */
        private grow_(opt_e?: goog.events.Event): void;

        /**
         * Resizes the textarea to shrink to fit its contents. The way this works is
         * by increasing the padding of the textarea by 1px (it's important here that
         * we're in box-sizing: border-box mode). If the size of the textarea grows,
         * then the box is filled up to the padding box with text.
         * If it doesn't change, then we can shrink.
         * @private
         */
        private shrink_(): void;

        /**
         * We use this listener to check if the textarea has been natively resized
         * and if so we reset minHeight so that we don't ever shrink smaller than
         * the user's manually set height. Note that we cannot check size on mousedown
         * and then just compare here because we cannot capture mousedown on
         * the textarea resizer, while mouseup fires reliably.
         * @param {goog.events.BrowserEvent} e The mousedown event.
         * @private
         */
        private mouseUpListener_(e: goog.events.BrowserEvent): void;
    }
}

declare namespace goog.ui.Textarea {
    /**
     * Constants for event names.
     * @enum {string}
     */
    enum EventType { RESIZE }

    /**
     * The CSS class name to add to the input when the user has not entered a
     * value.
     */
    let TEXTAREA_PLACEHOLDER_CLASS: any /*missing*/;
}
