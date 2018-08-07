/// <reference path="../../../globals.d.ts"/>
/// <reference path="./registry.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="./entries.d.ts"/>
/// <reference path="./tweak.d.ts"/>

declare module 'goog:goog.tweak.TweakUi' {
    import alias = goog.tweak.TweakUi;
    export default alias;
}

declare module 'goog:goog.tweak.EntriesPanel' {
    import alias = goog.tweak.EntriesPanel;
    export default alias;
}

declare namespace goog.tweak {
    /**
     * A UI for editing tweak settings / clicking tweak actions.
     * @final
     */
    class TweakUi extends __TweakUi {}
    abstract class __TweakUi {
        /**
         * @param {!goog.tweak.Registry} registry The registry to render.
         * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
         */
        constructor(registry: goog.tweak.Registry, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The registry to create a UI from.
         * @type {!goog.tweak.Registry}
         * @private
         */
        private registry_: goog.tweak.Registry;

        /**
         * The element to display when the UI is visible.
         * @type {goog.tweak.EntriesPanel|undefined}
         * @private
         */
        private entriesPanel_: goog.tweak.EntriesPanel|undefined;

        /**
         * The DomHelper to render with.
         * @type {!goog.dom.DomHelper}
         * @private
         */
        private domHelper_: goog.dom.DomHelper;

        /**
         * @return {!Element} The root element. Must not be called before render().
         */
        getRootElement(): Element;

        /**
         * Reloads the page with query parameters set by the UI.
         * @private
         */
        private restartWithAppliedTweaks_(): void;

        /**
         * Installs the required CSS styles.
         * @private
         */
        private installStyles_(): void;

        /**
         * Creates the element to display when the UI is visible.
         * @return {!Element} The root element.
         */
        render(): Element;

        /**
         * Updates the UI with the given entry.
         * @param {!goog.tweak.BaseEntry} entry The newly registered entry.
         * @private
         */
        private onNewRegisteredEntry_(entry: goog.tweak.BaseEntry): void;

        /**
         * Updates the UI with the given entry.
         * @param {!goog.tweak.BaseEntry} entry The newly registered entry.
         * @private
         */
        private insertEntry_(entry: goog.tweak.BaseEntry): void;
    }

    /**
     * The body of the tweaks UI and also used for BooleanGroup.
     * @final
     */
    class EntriesPanel extends __EntriesPanel {}
    abstract class __EntriesPanel {
        /**
         * @param {!Array<!goog.tweak.BaseEntry>} entries The entries to show in the
         *     panel.
         * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
         */
        constructor(entries: goog.tweak.BaseEntry[], opt_domHelper?: goog.dom.DomHelper);

        /**
         * The entries to show in the panel.
         * @type {!Array<!goog.tweak.BaseEntry>} entries
         * @private
         */
        private entries_: goog.tweak.BaseEntry[];

        /**
         * The bound onclick handler for the help question marks.
         * @this {Element}
         * @private
         */
        private boundHelpOnClickHandler_(): void;

        /**
         * The element that contains the UI.
         * @type {Element}
         * @private
         */
        private rootElem_: Element;

        /**
         * The element that contains all of the settings and the endElement.
         * @type {Element}
         * @private
         */
        private mainPanel_: Element;

        /**
         * Flips between true/false each time the "Toggle Descriptions" link is
         * clicked.
         * @type {boolean}
         * @private
         */
        private showAllDescriptionsState_: boolean;

        /**
         * The DomHelper to render with.
         * @type {!goog.dom.DomHelper}
         * @private
         */
        private domHelper_: goog.dom.DomHelper;

        /**
         * Map of tweak ID -> EntriesPanel for child panels (BooleanGroups).
         * @type {!Object<!goog.tweak.EntriesPanel>}
         */
        childPanels: {[key: string]: goog.tweak.EntriesPanel};

        /**
         * @return {!Element} Returns the expanded element. Must not be called before
         *     render().
         */
        getRootElement(): Element;

        /**
         * Creates and returns the expanded element.
         * The markup looks like:
         *
         *    <div>
         *      <a>Show Descriptions</a>
         *      <div>
         *         ...
         *         {endElement}
         *      </div>
         *    </div>
         *
         * @param {Element|DocumentFragment=} opt_endElement Element to insert after all
         *     tweak entries.
         * @return {!Element} The root element for the panel.
         */
        render(opt_endElement?: Element|DocumentFragment): Element;

        /**
         * Inserts the given entry into the panel.
         * @param {!goog.tweak.BaseEntry} entry The entry to insert.
         */
        insertEntry(entry: goog.tweak.BaseEntry): void;

        /**
         * Creates and returns a form element for the given entry.
         * @param {!goog.tweak.BaseEntry} entry The entry.
         * @return {!Element} The root DOM element for the entry.
         * @private
         */
        private createEntryElem_(entry: goog.tweak.BaseEntry): Element;

        /**
         * Click handler for the help link.
         * @param {Node} entryDiv The div that contains the tweak.
         * @private
         */
        private onHelpClick_(entryDiv: Node): void;

        /**
         * Twiddle the DOM so that the entry within the given span is shown/hidden.
         * @param {Node} entryDiv The div that contains the tweak.
         * @param {boolean} show True to show, false to hide.
         * @private
         */
        private showDescription_(entryDiv: Node, show: boolean): void;

        /**
         * Creates and returns a help element for the given entry.
         * @param {goog.tweak.BaseEntry} entry The entry.
         * @return {!Element} The root element of the created DOM.
         * @private
         */
        private createHelpElem_(entry: goog.tweak.BaseEntry): Element;

        /**
         * Show all entry descriptions (has the same effect as clicking on all ?'s).
         */
        toggleAllDescriptions(): void;

        /**
         * Creates the DOM element to control the given enum setting.
         * @param {!goog.tweak.StringSetting|!goog.tweak.NumericSetting} tweak The
         *     setting.
         * @param {string} label The label for the entry.
         * @param {!Function} onchangeFunc onchange event handler.
         * @return {!DocumentFragment} The DOM element.
         * @private
         */
        private createComboBoxDom_(
            tweak: goog.tweak.StringSetting|goog.tweak.NumericSetting, label: string, onchangeFunc: Function
        ): DocumentFragment;

        /**
         * Creates the DOM element to control the given boolean setting.
         * @param {!goog.tweak.BooleanSetting} tweak The setting.
         * @param {string} label The label for the entry.
         * @return {!DocumentFragment} The DOM elements.
         * @private
         */
        private createBooleanSettingDom_(tweak: goog.tweak.BooleanSetting, label: string): DocumentFragment;

        /**
         * Creates the DOM for a BooleanGroup or NamespaceEntry.
         * @param {!goog.tweak.BooleanGroup|!goog.tweak.NamespaceEntry_} entry The
         *     entry.
         * @param {string} label The label for the entry.
         * @param {!Array<goog.tweak.BaseEntry>} childEntries The child entries.
         * @return {!DocumentFragment} The DOM element.
         * @private
         */
        private createSubPanelDom_(
            entry: goog.tweak.BooleanGroup|any, label: string, childEntries: goog.tweak.BaseEntry[]
        ): DocumentFragment;

        /**
         * Creates the DOM element to control the given string setting.
         * @param {!goog.tweak.StringSetting|!goog.tweak.NumericSetting} tweak The
         *     setting.
         * @param {string} label The label for the entry.
         * @param {!Function} onchangeFunc onchange event handler.
         * @return {!DocumentFragment} The DOM element.
         * @private
         */
        private createTextBoxDom_(
            tweak: goog.tweak.StringSetting|goog.tweak.NumericSetting, label: string, onchangeFunc: Function
        ): DocumentFragment;

        /**
         * Creates the DOM element to control the given button action.
         * @param {!goog.tweak.ButtonAction} tweak The action.
         * @param {string} label The label for the entry.
         * @return {!Element} The DOM element.
         * @private
         */
        private createButtonActionDom_(tweak: goog.tweak.ButtonAction, label: string): Element;

        /**
         * Creates the DOM element to control the given entry.
         * @param {!goog.tweak.BaseEntry} entry The entry.
         * @return {!Element|!DocumentFragment} The DOM element.
         * @private
         */
        private createTweakEntryDom_(entry: goog.tweak.BaseEntry): Element|DocumentFragment;
    }

    /**
     * Entries used to represent the collapsible namespace links. These entries are
     * never registered with the TweakRegistry, but are contained within the
     * collection of entries within TweakPanels.
     * @extends {goog.tweak.BaseEntry}
     * @private
     */
    class NamespaceEntry_ extends __NamespaceEntry_ {}
    abstract class __NamespaceEntry_ extends goog.tweak.__BaseEntry {
        /**
         * @param {string} namespace The namespace for the entry.
         * @param {!Array<!goog.tweak.BaseEntry>} entries Entries within the namespace.
         */
        constructor(namespace: string, entries: goog.tweak.BaseEntry[]);

        /**
         * Entries within this namespace.
         * @type {!Array<!goog.tweak.BaseEntry>}
         */
        entries: goog.tweak.BaseEntry[];
    }
}

declare namespace goog.tweak.TweakUi {
    /**
     * Creates a TweakUi if tweaks are enabled.
     * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
     * @return {!Element|undefined} The root UI element or undefined if tweaks are
     *     not enabled.
     */
    function create(opt_domHelper?: goog.dom.DomHelper): Element|undefined;

    /**
     * Creates a TweakUi inside of a show/hide link.
     * @param {goog.dom.DomHelper=} opt_domHelper The DomHelper to render with.
     * @return {!Element|undefined} The root UI element or undefined if tweaks are
     *     not enabled.
     */
    function createCollapsible(opt_domHelper?: goog.dom.DomHelper): Element|undefined;
}

declare namespace goog.tweak.NamespaceEntry_ {
    /**
     * Prefix for the IDs of namespace entries used to ensure that they do not
     * conflict with regular entries.
     * @type {string}
     */
    let ID_PREFIX: string;
}
