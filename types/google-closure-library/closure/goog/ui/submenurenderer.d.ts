/// <reference path="../../../globals.d.ts"/>
/// <reference path="./menuitemrenderer.d.ts"/>
/// <reference path="./submenu.d.ts"/>

declare module 'goog:goog.ui.SubMenuRenderer' {
    import alias = goog.ui.SubMenuRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.SubMenu}s.  Each item has the following
     * structure:
     *
     *    <div class="goog-submenu">
     *      ...(menuitem content)...
     *      <div class="goog-menu">
     *        ... (submenu content) ...
     *      </div>
     *    </div>
     *
     * @extends {goog.ui.MenuItemRenderer}
     * @final
     */
    class SubMenuRenderer extends __SubMenuRenderer {}
    abstract class __SubMenuRenderer extends goog.ui.__MenuItemRenderer {
        /**
         */
        constructor();

        /**
         * Appends a child node with the class goog.getCssName('goog-submenu-arrow') or
         * 'goog-submenu-arrow-rtl' which can be styled to show an arrow.
         * @param {goog.ui.SubMenu} subMenu SubMenu to render.
         * @param {Element} element Element to decorate.
         * @private
         */
        private addArrow_(subMenu: goog.ui.SubMenu, element: Element): void;
    }
}

declare namespace goog.ui.SubMenuRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
