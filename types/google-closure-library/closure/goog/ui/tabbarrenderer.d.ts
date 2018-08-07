/// <reference path="../../../globals.d.ts"/>
/// <reference path="./containerrenderer.d.ts"/>

declare module 'goog:goog.ui.TabBarRenderer' {
    import alias = goog.ui.TabBarRenderer;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Default renderer for {@link goog.ui.TabBar}s, based on the `TabPane`
     * code.  The tab bar's DOM structure is determined by its orientation and
     * location relative to tab contents.  For example, a horizontal tab bar
     * located above tab contents looks like this:
     *
     *    <div class="goog-tab-bar goog-tab-bar-horizontal goog-tab-bar-top">
     *      ...(tabs here)...
     *    </div>
     *
     * @extends {goog.ui.ContainerRenderer}
     */
    class TabBarRenderer extends __TabBarRenderer {}
    abstract class __TabBarRenderer extends goog.ui.__ContainerRenderer {
        /**
         */
        constructor();

        /**
         * Creates the location-to-class lookup table.
         * @private
         */
        private createClassByLocationMap_(): void;

        /**
         * Map of locations to location-specific structural class names,
         * precomputed and cached on first use to minimize object allocations
         * and string concatenation.
         * @type {Object}
         * @private
         * @suppress {missingRequire} goog.ui.TabBar
         */
        private classByLocation_: Object;

        /**
         * Creates the class-to-location lookup table, used during decoration.
         * @private
         */
        private createLocationByClassMap_(): void;

        /**
         * Map of location-specific structural class names to locations, used during
         * element decoration.  Precomputed and cached on first use to minimize object
         * allocations and string concatenation.
         * @type {Object}
         * @private
         */
        private locationByClass_: Object;
    }
}

declare namespace goog.ui.TabBarRenderer {
    /**
     * Default CSS class to be applied to the root element of components rendered
     * by this renderer.
     * @type {string}
     */
    let CSS_CLASS: string;
}
