/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>

declare module 'goog:goog.ui.FilterObservingMenuItemRenderer' {
    import alias = goog.ui.FilterObservingMenuItemRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.FilterObservingMenuItem}s. Each item has
     * the following structure:
     *
     *    <div class="goog-filterobsmenuitem"><div>...(content)...</div></div>
     *
     * @extends {goog.ui.MenuItemRenderer}
     * @final
     */
    class FilterObservingMenuItemRenderer extends __FilterObservingMenuItemRenderer {}
    abstract class __FilterObservingMenuItemRenderer extends goog.ui.__MenuItemRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.FilterObservingMenuItemRenderer {
    /**
     * CSS class name the renderer applies to menu item elements.
     * @type {string}
     */
    let CSS_CLASS: string;
}
