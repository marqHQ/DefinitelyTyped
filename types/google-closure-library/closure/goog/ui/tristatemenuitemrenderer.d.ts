/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>

declare module 'goog:goog.ui.TriStateMenuItemRenderer' {
    import alias = goog.ui.TriStateMenuItemRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.TriStateMenuItemRenderer}s. Each item has
     * the following structure:
     *
     *    <div class="goog-tristatemenuitem">
     *        <div class="goog-tristatemenuitem-checkbox"></div>
     *        <div>...(content)...</div>
     *    </div>
     *
     * @extends {goog.ui.MenuItemRenderer}
     * @final
     */
    class TriStateMenuItemRenderer extends __TriStateMenuItemRenderer {}
    abstract class __TriStateMenuItemRenderer extends goog.ui.__MenuItemRenderer {
        /**
         */
        constructor();
    }
}

declare namespace goog.ui.TriStateMenuItemRenderer {
    /**
     * CSS class name the renderer applies to menu item elements.
     * @type {string}
     */
    let CSS_CLASS: string;
}
