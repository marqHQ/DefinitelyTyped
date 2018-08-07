/// <reference path="../../../../globals.d.ts"/>

declare module 'goog:goog.a11y.aria.Role' {
    import alias = goog.a11y.aria.Role;
    export default alias;
}

declare namespace goog.a11y.aria {
    /**
     * ARIA role values.
     * @enum {string}
     */
    enum Role {
        ALERT,
        ALERTDIALOG,
        APPLICATION,
        ARTICLE,
        BANNER,
        BUTTON,
        CHECKBOX,
        COLUMNHEADER,
        COMBOBOX,
        COMPLEMENTARY,
        CONTENTINFO,
        DEFINITION,
        DIALOG,
        DIRECTORY,
        DOCUMENT,
        FORM,
        GRID,
        GRIDCELL,
        GROUP,
        HEADING,
        IMG,
        LINK,
        LIST,
        LISTBOX,
        LISTITEM,
        LOG,
        MAIN,
        MARQUEE,
        MATH,
        MENU,
        MENUBAR,
        MENU_ITEM,
        MENU_ITEM_CHECKBOX,
        MENU_ITEM_RADIO,
        NAVIGATION,
        NOTE,
        OPTION,
        PRESENTATION,
        PROGRESSBAR,
        RADIO,
        RADIOGROUP,
        REGION,
        ROW,
        ROWGROUP,
        ROWHEADER,
        SCROLLBAR,
        SEARCH,
        SEPARATOR,
        SLIDER,
        SPINBUTTON,
        STATUS,
        TAB,
        TAB_LIST,
        TAB_PANEL,
        TEXTBOX,
        TEXTINFO,
        TIMER,
        TOOLBAR,
        TOOLTIP,
        TREE,
        TREEGRID,
        TREEITEM
    }
}
