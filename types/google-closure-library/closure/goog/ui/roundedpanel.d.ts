/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../math/coordinate.d.ts"/>
/// <reference path="../graphics/abstractgraphics.d.ts"/>
/// <reference path="../math/size.d.ts"/>

declare module 'goog:goog.ui.RoundedPanel' {
    import alias = goog.ui.RoundedPanel;
    export default alias;
}

declare module 'goog:goog.ui.RoundedPanel.Corner' {
    import alias = goog.ui.RoundedPanel.Corner;
    export default alias;
}

declare module 'goog:goog.ui.GraphicsRoundedPanel' {
    import alias = goog.ui.GraphicsRoundedPanel;
    export default alias;
}

declare module 'goog:goog.ui.CssRoundedPanel' {
    import alias = goog.ui.CssRoundedPanel;
    export default alias;
}

declare module 'goog:goog.ui.BaseRoundedPanel' {
    import alias = goog.ui.BaseRoundedPanel;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Base class for the hierarchy of RoundedPanel classes. Do not
     * instantiate directly. Instead, call goog.ui.RoundedPanel.create().
     * The HTML structure for the RoundedPanel is:
     * <pre>
     * - div (Contains the background and content. Class name: goog-roundedpanel)
     *   - div (Contains the background/rounded corners. Class name:
     *       goog-roundedpanel-bg)
     *   - div (Contains the content. Class name: goog-roundedpanel-content)
     * </pre>
     * @extends {goog.ui.Component}
     */
    class BaseRoundedPanel extends __BaseRoundedPanel {}
    abstract class __BaseRoundedPanel extends goog.ui.__Component {
        /**
         * @param {number} radius The radius of the rounded corner(s), in pixels.
         * @param {number} borderWidth The thickness of the border, in pixels.
         * @param {string} borderColor The border color of the panel.
         * @param {string=} opt_backgroundColor The background color of the panel.
         * @param {number=} opt_corners The corners of the panel to be rounded. Any
         *     corners not specified will be rendered as square corners. Will default
         *     to all square corners if not specified.
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
         *     document we want to render in.
         */
        constructor(
            radius: number,
            borderWidth: number,
            borderColor: string,
            opt_backgroundColor?: string,
            opt_corners?: number,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * The radius of the rounded corner(s), in pixels.
         * @type {number}
         * @private
         */
        private radius_: number;

        /**
         * The thickness of the border, in pixels.
         * @type {number}
         * @private
         */
        private borderWidth_: number;

        /**
         * The border color of the panel.
         * @type {string}
         * @private
         */
        private borderColor_: string;

        /**
         * The background color of the panel.
         * @type {?string}
         * @private
         */
        private backgroundColor_: string|null;

        /**
         * The corners of the panel to be rounded; defaults to
         * goog.ui.RoundedPanel.Corner.NONE
         * @type {number}
         * @private
         */
        private corners_: number;

        /**
         * The element containing the rounded corners and background.
         * @type {Element}
         * @private
         */
        private backgroundElement_: Element;

        /**
         * The element containing the actual content.
         * @type {Element}
         * @private
         */
        private contentElement_: Element;
    }

    /**
     * RoundedPanel class specifically for browsers that support CSS attributes
     * for elements with rounded borders (ex. Safari 3.0+, Firefox 3.0+). Do not
     * instantiate directly. Instead, call goog.ui.RoundedPanel.create().
     * @extends {goog.ui.BaseRoundedPanel}
     * @final
     */
    class CssRoundedPanel extends __CssRoundedPanel {}
    abstract class __CssRoundedPanel extends goog.ui.__BaseRoundedPanel {
        /**
         * @param {number} radius The radius of the rounded corner(s), in pixels.
         * @param {number} borderWidth The thickness of the border, in pixels.
         * @param {string} borderColor The border color of the panel.
         * @param {string=} opt_backgroundColor The background color of the panel.
         * @param {number=} opt_corners The corners of the panel to be rounded. Any
         *     corners not specified will be rendered as square corners. Will
         *     default to all square corners if not specified.
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
         *     document we want to render in.
         */
        constructor(
            radius: number,
            borderWidth: number,
            borderColor: string,
            opt_backgroundColor?: string,
            opt_corners?: number,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * This method returns the CSS style based on the corner of the panel, and the
         * user-agent.
         * @param {number} corner The corner whose style name to retrieve.
         * @private
         * @return {string} The CSS style based on the specified corner.
         */
        private getStyle_(corner: number): string;
    }

    /**
     * RoundedPanel class that uses goog.graphics to create the rounded corners.
     * Do not instantiate directly. Instead, call goog.ui.RoundedPanel.create().
     * @extends {goog.ui.BaseRoundedPanel}
     * @final
     */
    class GraphicsRoundedPanel extends __GraphicsRoundedPanel {}
    abstract class __GraphicsRoundedPanel extends goog.ui.__BaseRoundedPanel {
        /**
         * @param {number} radius The radius of the rounded corner(s), in pixels.
         * @param {number} borderWidth The thickness of the border, in pixels.
         * @param {string} borderColor The border color of the panel.
         * @param {string=} opt_backgroundColor The background color of the panel.
         * @param {number=} opt_corners The corners of the panel to be rounded. Any
         *     corners not specified will be rendered as square corners. Will
         *     default to all square corners if not specified.
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
         *     document we want to render in.
         */
        constructor(
            radius: number,
            borderWidth: number,
            borderColor: string,
            opt_backgroundColor?: string,
            opt_corners?: number,
            opt_domHelper?: goog.dom.DomHelper
        );

        /**
         * A 4-element array containing the circle centers for the arcs in the
         * bottom-left, top-left, top-right, and bottom-right corners, respectively.
         * @type {Array<goog.math.Coordinate>}
         * @private
         */
        private arcCenters_: goog.math.Coordinate[];

        /**
         * A 4-element array containing the start coordinates for rendering the arcs
         * in the bottom-left, top-left, top-right, and bottom-right corners,
         * respectively.
         * @type {Array<goog.math.Coordinate>}
         * @private
         */
        private cornerStarts_: goog.math.Coordinate[];

        /**
         * A 4-element array containing the arc end angles for the bottom-left,
         * top-left, top-right, and bottom-right corners, respectively.
         * @type {Array<number>}
         * @private
         */
        private endAngles_: number[];

        /**
         * Graphics object for rendering the background.
         * @type {goog.graphics.AbstractGraphics}
         * @private
         */
        private graphics_: goog.graphics.AbstractGraphics;

        /**
         * A 4-element array containing the rounded corner radii for the bottom-left,
         * top-left, top-right, and bottom-right corners, respectively.
         * @type {Array<number>}
         * @private
         */
        private radii_: number[];

        /**
         * A 4-element array containing the arc start angles for the bottom-left,
         * top-left, top-right, and bottom-right corners, respectively.
         * @type {Array<number>}
         * @private
         */
        private startAngles_: number[];

        /**
         * Calculates the start coordinates, circle centers, and angles, for the rounded
         * corners at each corner of the panel.
         * @param {goog.math.Size} elementSize The size of element_.
         * @private
         */
        private calculateArcParameters_(elementSize: goog.math.Size): void;
    }
}

declare namespace goog.ui.RoundedPanel {
    /**
     * Factory method that returns an instance of a BaseRoundedPanel.
     * @param {number} radius The radius of the rounded corner(s), in pixels.
     * @param {number} borderWidth The thickness of the border, in pixels.
     * @param {string} borderColor The border color of the panel.
     * @param {string=} opt_backgroundColor The background color of the panel.
     * @param {number=} opt_corners The corners of the panel to be rounded. Any
     *     corners not specified will be rendered as square corners. Will default
     *     to all square corners if not specified.
     * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
     *     document we want to render in.
     * @return {!goog.ui.BaseRoundedPanel} An instance of a
     *     goog.ui.BaseRoundedPanel subclass.
     * TODO(user): deprecate this class, which has <5 usages and only really
     *            matters for IE8, and then only stylistically.
     */
    function create(
        radius: number,
        borderWidth: number,
        borderColor: string,
        opt_backgroundColor?: string,
        opt_corners?: number,
        opt_domHelper?: goog.dom.DomHelper
    ): goog.ui.BaseRoundedPanel;

    /**
     * Enum for specifying which corners to render.
     * @enum {number}
     */
    enum Corner { NONE, BOTTOM_LEFT, TOP_LEFT, LEFT, TOP_RIGHT, TOP, BOTTOM_RIGHT, BOTTOM, RIGHT, ALL }
}

declare namespace goog.ui.GraphicsRoundedPanel {
}
