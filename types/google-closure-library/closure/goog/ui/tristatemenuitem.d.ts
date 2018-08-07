/// <reference path="../../../globals.d.ts"/>
/// <reference path="./controlcontent.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>

declare module 'goog:goog.ui.TriStateMenuItem' {
    import alias = goog.ui.TriStateMenuItem;
    export default alias;
}

declare module 'goog:goog.ui.TriStateMenuItem.State' {
    import alias = goog.ui.TriStateMenuItem.State;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Class representing a three state checkbox menu item.
     *
     * @extends {goog.ui.MenuItem}
     * TODO(attila): Figure out how to better integrate this into the
     * goog.ui.Control state management framework.
     * @final
     */
    class TriStateMenuItem extends __TriStateMenuItem {}
    abstract class __TriStateMenuItem {
        /**
         * @param {goog.ui.ControlContent} content Text caption or DOM structure
         *     to display as the content of the item (use to add icons or styling to
         *     menus).
         * @param {Object=} opt_model Data/model associated with the menu item.
         * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
         *     document interactions.
         * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.
         * @param {boolean=} opt_alwaysAllowPartial  If true, always allow partial
         *     state.
         */
        constructor(
            content: goog.ui.ControlContent,
            opt_model?: Object,
            opt_domHelper?: goog.dom.DomHelper,
            opt_renderer?: goog.ui.MenuItemRenderer,
            opt_alwaysAllowPartial?: boolean
        );

        /**
         * Menu item's checked state.
         * @type {goog.ui.TriStateMenuItem.State}
         * @private
         */
        private checkState_: goog.ui.TriStateMenuItem.State;

        /**
         * Whether the partial state can be toggled.
         * @type {boolean}
         * @private
         */
        private allowPartial_: boolean;

        /**
         * Used to override allowPartial_ to force the third state to always be
         * permitted.
         * @type {boolean}
         * @private
         */
        private alwaysAllowPartial_: boolean;

        /**
         * @return {goog.ui.TriStateMenuItem.State} The menu item's check state.
         */
        getCheckedState(): goog.ui.TriStateMenuItem.State;

        /**
         * Sets the checked state.
         * @param {goog.ui.TriStateMenuItem.State} state The checked state.
         */
        setCheckedState(state: goog.ui.TriStateMenuItem.State): void;

        /**
         * Sets the checked state and updates the CSS styling. Dispatches a
         * `CHECK` or `UNCHECK` event prior to changing the component's
         * state, which may be caught and canceled to prevent the component from
         * changing state.
         * @param {goog.ui.TriStateMenuItem.State} state The checked state.
         * @private
         */
        private setCheckedState_(state: goog.ui.TriStateMenuItem.State): void;

        /**
         * Updates the extra class names applied to the menu item element.
         * @private
         */
        private updatedCheckedStateClassNames_(): void;
    }
}

declare namespace goog.ui.TriStateMenuItem {
    /**
     * Checked states for component.
     * @enum {number}
     */
    enum State { NOT_CHECKED, PARTIALLY_CHECKED, FULLY_CHECKED }
}
