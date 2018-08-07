/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../events/browserevent.d.ts"/>

declare module 'goog:goog.ui.Ratings' {
    import alias = goog.ui.Ratings;
    export default alias;
}

declare module 'goog:goog.ui.Ratings.EventType' {
    import alias = goog.ui.Ratings.EventType;
    export default alias;
}

declare namespace goog.ui {
    /**
     * A UI Control used for rating things, i.e. videos on Google Video.
     * @extends {goog.ui.Component}
     */
    class Ratings extends __Ratings {}
    abstract class __Ratings extends goog.ui.__Component {
        /**
         * @param {Array<string>=} opt_ratings Ratings. Default: [1,2,3,4,5].
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
         */
        constructor(opt_ratings?: string[], opt_domHelper?: goog.dom.DomHelper);

        /**
         * Ordered ratings that can be picked, Default: [1,2,3,4,5]
         * @type {Array<string>}
         * @private
         */
        private ratings_: string[];

        /**
         * Array containing references to the star elements
         * @type {Array<Element>}
         * @private
         */
        private stars_: Element[];

        /**
         * Whether the control is enabled.
         * @type {boolean}
         * @private
         */
        private isEnabled_: boolean;

        /**
         * The last index to be highlighted
         * @type {number}
         * @private
         */
        private highlightedIndex_: number;

        /**
         * The currently selected index
         * @type {number}
         * @private
         */
        private selectedIndex_: number;

        /**
         * An attached form field to set the value to
         * @type {HTMLInputElement|HTMLSelectElement|null}
         * @private
         */
        private attachedFormField_: HTMLInputElement|HTMLSelectElement|null;

        /**
         * Returns the base CSS class used by subcomponents of this component.
         * @return {string} Component-specific CSS class.
         */
        getCssClass(): string;

        /**
         * Sets the selected index. If the provided index is greater than the number of
         * ratings then the max is set.  0 is the first item, -1 is no selection.
         * @param {number} index The index of the rating to select.
         */
        setSelectedIndex(index: number): void;

        /**
         * @return {number} The index of the currently selected rating.
         */
        getSelectedIndex(): number;

        /**
         * Returns the rating value of the currently selected rating
         * @return {?string} The value of the currently selected rating (or null).
         */
        getValue(): string|null;

        /**
         * Returns the index of the currently highlighted rating, -1 if the mouse isn't
         * currently over the widget
         * @return {number} The index of the currently highlighted rating.
         */
        getHighlightedIndex(): number;

        /**
         * Returns the value of the currently highlighted rating, null if the mouse
         * isn't currently over the widget
         * @return {?string} The value of the currently highlighted rating, or null.
         */
        getHighlightedValue(): string|null;

        /**
         * Sets the array of ratings that the comonent
         * @param {Array<string>} ratings Array of value to use as ratings.
         */
        setRatings(ratings: string[]): void;

        /**
         * Gets the array of ratings that the component
         * @return {Array<string>} Array of ratings.
         */
        getRatings(): string[];

        /**
         * Attaches an input or select element to the ratings widget. The value or
         * index of the field will be updated along with the ratings widget.
         * @param {HTMLSelectElement|HTMLInputElement} field The field to attach to.
         */
        setAttachedFormField(field: HTMLSelectElement|HTMLInputElement): void;

        /**
         * Returns the attached input or select element to the ratings widget.
         * @return {HTMLSelectElement|HTMLInputElement|null} The attached form field.
         */
        getAttachedFormField(): HTMLSelectElement|HTMLInputElement|null;

        /**
         * Enables or disables the ratings control.
         * @param {boolean} enable Whether to enable or disable the control.
         */
        setEnabled(enable: boolean): void;

        /**
         * @return {boolean} Whether the ratings control is enabled.
         */
        isEnabled(): boolean;

        /**
         * Handle the mouse moving over a star.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onMouseOver_(e: goog.events.BrowserEvent): void;

        /**
         * Handle the mouse moving over a star.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onMouseOut_(e: goog.events.BrowserEvent): void;

        /**
         * Handle the mouse moving over a star.
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onClick_(e: goog.events.BrowserEvent): void;

        /**
         * Handle the key down event. 0 = unselected in this case, 1 = the first rating
         * @param {goog.events.BrowserEvent} e The browser event.
         * @private
         */
        private onKeyDown_(e: goog.events.BrowserEvent): void;

        /**
         * Resets the highlights to the selected rating to undo highlights due to hover
         * effects.
         * @private
         */
        private resetHighlights_(): void;

        /**
         * Highlights the ratings up to a specific index
         * @param {number} n Index to highlight.
         * @private
         */
        private highlightIndex_(n: number): void;

        /**
         * Get the class name for a given rating.  All stars have the class:
         * goog-ratings-star.
         * Other possible classnames dependent on position and state are:
         * goog-ratings-firststar-on
         * goog-ratings-firststar-off
         * goog-ratings-midstar-on
         * goog-ratings-midstar-off
         * goog-ratings-laststar-on
         * goog-ratings-laststar-off
         * @param {number} i Index to get class name for.
         * @param {boolean} on Whether it should be on.
         * @return {string} The class name.
         * @private
         */
        private getClassName_(i: number, on: boolean): string;
    }
}

declare namespace goog.ui.Ratings {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;

    /**
     * Enums for Ratings event type.
     * @enum {string}
     */
    enum EventType { CHANGE, HIGHLIGHT_CHANGE, HIGHLIGHT, UNHIGHLIGHT }
}
