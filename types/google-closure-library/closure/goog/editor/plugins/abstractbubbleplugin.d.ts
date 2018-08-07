/// <reference path="../../../../globals.d.ts"/>
/// <reference path="../plugin.d.ts"/>
/// <reference path="../../events/eventhandler.d.ts"/>
/// <reference path="../../ui/editor/bubble.d.ts"/>
/// <reference path="../../dom/dom.d.ts"/>
/// <reference path="../../events/browserevent.d.ts"/>

declare module 'goog:goog.editor.plugins.AbstractBubblePlugin' {
    import alias = goog.editor.plugins.AbstractBubblePlugin;
    export default alias;
}

declare namespace goog.editor.plugins {
    /**
     * Base class for bubble plugins. This is used for to connect user behavior
     * in the editor to a goog.ui.editor.Bubble UI element that allows
     * the user to modify the properties of an element on their page (e.g. the alt
     * text of an image tag).
     *
     * Subclasses should override the abstract method getBubbleTargetFromSelection()
     * with code to determine if the current selection should activate the bubble
     * type. The other abstract method createBubbleContents() should be overriden
     * with code to create the inside markup of the bubble.  The base class creates
     * the rest of the bubble.
     *
     * @extends {goog.editor.Plugin}
     */
    class AbstractBubblePlugin extends __AbstractBubblePlugin {}
    abstract class __AbstractBubblePlugin extends goog.editor.__Plugin {
        /**
         */
        constructor();

        /**
         * Place to register events the plugin listens to.
         * @type {goog.events.EventHandler<
         *     !goog.editor.plugins.AbstractBubblePlugin>}
         * @protected
         */
        protected eventRegister: goog.events.EventHandler<goog.editor.plugins.AbstractBubblePlugin>;

        /**
         * Instance factory function that creates a bubble UI component.  If set to a
         * non-null value, this function will be used to create a bubble instead of
         * the global factory function.  It takes as parameters the bubble parent
         * element and the z index to draw the bubble at.
         * @type {?function(!Element, number): !goog.ui.editor.Bubble}
         * @private
         */
        private bubbleFactory_: ((_0: Element, _1: number) => goog.ui.editor.Bubble)|null;

        /**
         * The optional parent of the bubble.  If null or not set, we will use the
         * application document. This is useful when you have an editor embedded in
         * a scrolling DIV.
         * @type {Element|undefined}
         * @private
         */
        private bubbleParent_: Element|undefined;

        /**
         * The id of the panel this plugin added to the shared bubble.  Null when
         * this plugin doesn't currently have a panel in a bubble.
         * @type {string?}
         * @private
         */
        private panelId_: string|null;

        /**
         * Whether this bubble should support tabbing through elements. False
         * by default.
         * @type {boolean}
         * @private
         */
        private keyboardNavigationEnabled_: boolean;

        /**
         * Sets the instance bubble factory function.  If set to a non-null value, this
         * function will be used to create a bubble instead of the global factory
         * function.
         * @param {?function(!Element, number): !goog.ui.editor.Bubble} bubbleFactory
         *     Function that creates a bubble for the given bubble parent element and z
         *     index.  Null to reset the factory function.
         */
        setBubbleFactory(bubbleFactory: ((_0: Element, _1: number) => goog.ui.editor.Bubble)|null): void;

        /**
         * Sets whether the bubble should support tabbing through elements.
         * @param {boolean} keyboardNavigationEnabled
         */
        enableKeyboardNavigation(keyboardNavigationEnabled: boolean): void;

        /**
         * Sets the bubble parent.
         * @param {Element} bubbleParent An element where the bubble will be
         *     anchored. If null, we will use the application document. This
         *     is useful when you have an editor embedded in a scrolling div.
         */
        setBubbleParent(bubbleParent: Element): void;

        /**
         * Returns the bubble map.  Subclasses may override to use a separate map.
         * @return {!Object<goog.ui.editor.Bubble>}
         * @protected
         */
        protected getBubbleMap(): {[key: string]: goog.ui.editor.Bubble};

        /**
         * @return {goog.dom.DomHelper} The dom helper for the bubble window.
         */
        getBubbleDom(): goog.dom.DomHelper;

        /**
         * Returns the element whose properties the bubble manipulates.
         * @return {Element} The target element.
         */
        getTargetElement(): Element;

        /**
         * Pops up a property bubble for the given selection if appropriate and closes
         * open property bubbles if no longer needed.
         * @param {Element?} selectedElement The selected element.
         * @return {boolean} Always false, allowing every bubble plugin to handle the
         *     event.
         * @protected
         */
        protected handleSelectionChangeInternal(selectedElement: Element|null): boolean;

        /**
         * Should be overriden by subclasses to return the bubble target element or
         * null if an element of their required type isn't found.
         * @param {Element} selectedElement The target of the selection change event or
         *     the parent container of the current entire selection.
         * @return {Element?} The HTML bubble target element or null if no element of
         *     the required type is not found.
         */
        getBubbleTargetFromSelection(selectedElement: Element): Element|null;

        /**
         * @return {!goog.ui.editor.Bubble} The shared bubble object for the field this
         *     plugin is registered on.  Creates it if necessary.
         * @private
         */
        private getSharedBubble_(): goog.ui.editor.Bubble;

        /**
         * Creates and shows the property bubble.
         * @param {Element} targetElement The target element of the bubble.
         */
        createBubble(targetElement: Element): void;

        /**
         * @return {string} The type of bubble shown by this plugin.  Usually the tag
         *     name of the element this bubble targets.
         * @protected
         */
        protected getBubbleType(): string;

        /**
         * @return {string} The title for bubble shown by this plugin.  Defaults to no
         *     title.  Should be overridden by subclasses.
         * @protected
         */
        protected getBubbleTitle(): string;

        /**
         * @return {boolean} Whether the bubble should prefer placement above the
         *     target element.
         * @protected
         */
        protected shouldPreferBubbleAboveElement(): boolean;

        /**
         * Should be overriden by subclasses to add the type specific contents to the
         *     bubble.
         * @param {Element} bubbleContainer The container element of the bubble to
         *     which the contents should be added.
         * @protected
         */
        protected createBubbleContents(bubbleContainer: Element): void;

        /**
         * Register the handler for the target's CLICK event.
         * @param {Element} target The event source element.
         * @param {Function} handler The event handler.
         * @protected
         * @deprecated Use goog.editor.plugins.AbstractBubblePlugin.
         *     registerActionHandler to register click and enter events.
         */
        protected registerClickHandler(target: Element, handler: Function): void;

        /**
         * Register the handler for the target's CLICK and ENTER key events.
         * @param {Element} target The event source element.
         * @param {Function} handler The event handler.
         * @protected
         */
        protected registerActionHandler(target: Element, handler: Function): void;

        /**
         * Closes the bubble.
         */
        closeBubble(): void;

        /**
         * Called after the bubble is shown. The default implementation does nothing.
         * Override it to provide your own one.
         * @protected
         */
        protected onShow: any /*missing*/;

        /**
         * Called when the bubble is closed or hidden. The default implementation does
         * nothing.
         * @protected
         */
        protected cleanOnBubbleClose: any /*missing*/;

        /**
         * Handles when the bubble panel is closed.  Invoked when the entire bubble is
         * hidden and also directly when the panel is closed manually.
         * @private
         */
        private handlePanelClosed_(): void;

        /**
         * Handles a key event on the bubble. This ensures that the focus loops through
         * the tabbable elements found in the bubble and then the focus is got by the
         * field element.
         * @param {goog.events.BrowserEvent} e The event.
         * @private
         */
        private onBubbleKey_(e: goog.events.BrowserEvent): void;

        /**
         * @return {boolean} Whether the bubble is visible.
         */
        isVisible(): boolean;

        /**
         * Reposition the property bubble.
         */
        reposition(): void;

        /**
         * Helper method that creates option links (such as edit, test, remove)
         * @param {string} id String id for the span id.
         * @return {Element} The option link element.
         * @protected
         */
        protected createLinkOption(id: string): Element;

        /**
         * Helper method that creates a link with text set to linkText and optionally
         * wires up a listener for the CLICK event or the link. The link is navigable by
         * tabs if `enableKeyboardNavigation(true)` was called.
         * @param {string} linkId The id of the link.
         * @param {string} linkText Text of the link.
         * @param {Function=} opt_onClick Optional function to call when the link is
         *     clicked.
         * @param {Element=} opt_container If specified, location to insert link. If no
         *     container is specified, the old link is removed and replaced.
         * @return {Element} The link element.
         * @protected
         */
        protected createLink(linkId: string, linkText: string, opt_onClick?: Function, opt_container?: Element):
            Element;

        /**
         * Helper method to create a link to insert into the bubble. The link is
         * navigable by tabs if `enableKeyboardNavigation(true)` was called.
         * @param {string} linkId The id of the link.
         * @param {string} linkText Text of the link.
         * @param {boolean} isAnchor Set to true to create an actual anchor tag
         *     instead of a span.  Actual links are right clickable (e.g. to open in
         *     a new window) and also update window status on hover.
         * @param {Element=} opt_container If specified, location to insert link. If no
         *     container is specified, the old link is removed and replaced.
         * @return {Element} The link element.
         * @protected
         */
        protected createLinkHelper(linkId: string, linkText: string, isAnchor: boolean, opt_container?: Element):
            Element;

        /**
         * Makes the given element tabbable.
         *
         * <p>Elements created by createLink[Helper] are tabbable even without
         * calling this method. Call it for other elements if needed.
         *
         * <p>If tabindex is not already set in the element, this function sets it to 0.
         * You'll usually want to also call `enableKeyboardNavigation(true)`.
         *
         * @param {!Element} element
         * @protected
         */
        protected setTabbable(element: Element): void;

        /**
         * Inserts a link in the given container if it is specified or removes
         * the old link with this id and replaces it with the new link
         * @param {Element} link Html element to insert.
         * @param {string} linkId Id of the link.
         * @param {Element=} opt_container If specified, location to insert link.
         * @protected
         */
        protected setupLink(link: Element, linkId: string, opt_container?: Element): void;
    }
}

declare namespace goog.editor.plugins.AbstractBubblePlugin {
    /**
     * Sets the global bubble factory function.
     * @param {function(!Element, number): !goog.ui.editor.Bubble}
     *     bubbleFactory Function that creates a bubble for the given bubble parent
     *     element and z index.
     */
    function setBubbleFactory(bubbleFactory: (_0: Element, _1: number) => goog.ui.editor.Bubble): void;
}
