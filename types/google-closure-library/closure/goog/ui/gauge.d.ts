/// <reference path="../../../globals.d.ts"/>
/// <reference path="./component.d.ts"/>
/// <reference path="../dom/dom.d.ts"/>
/// <reference path="../graphics/abstractgraphics.d.ts"/>
/// <reference path="./gaugetheme.d.ts"/>
/// <reference path="../graphics/font.d.ts"/>
/// <reference path="../graphics/groupelement.d.ts"/>
/// <reference path="../fx/animation.d.ts"/>

declare module 'goog:goog.ui.GaugeColoredRange' {
    import alias = goog.ui.GaugeColoredRange;
    export default alias;
}

declare module 'goog:goog.ui.Gauge' {
    import alias = goog.ui.Gauge;
    export default alias;
}

declare namespace goog.ui {
    /**
     * Information on how to decorate a range in the gauge.
     * This is an internal-only class.
     * @final
     */
    class GaugeColoredRange extends __GaugeColoredRange {}
    abstract class __GaugeColoredRange {
        /**
         * @param {number} fromValue The range start (minimal) value.
         * @param {number} toValue The range end (maximal) value.
         * @param {string} backgroundColor Color to fill the range background with.
         */
        constructor(fromValue: number, toValue: number, backgroundColor: string);

        /**
         * The range start (minimal) value.
         * @type {number}
         */
        fromValue: number;

        /**
         * The range end (maximal) value.
         * @type {number}
         */
        toValue: number;

        /**
         * Color to fill the range background with.
         * @type {string}
         */
        backgroundColor: string;
    }

    /**
     * A UI component that displays a gauge.
     * A gauge displayes a current value within a round axis that represents a
     * given range.
     * The gauge is built from an external border, and internal border inside it,
     * ticks and labels inside the internal border, and a needle that points to
     * the current value.
     * @extends {goog.ui.Component}
     * @final
     */
    class Gauge extends __Gauge {}
    abstract class __Gauge extends goog.ui.__Component {
        /**
         * @param {number} width The width in pixels.
         * @param {number} height The height in pixels.
         * @param {goog.dom.DomHelper=} opt_domHelper The DOM helper object for the
         *     document we want to render in.
         */
        constructor(width: number, height: number, opt_domHelper?: goog.dom.DomHelper);

        /**
         * The width in pixels of this component.
         * @type {number}
         * @private
         */
        private width_: number;

        /**
         * The height in pixels of this component.
         * @type {number}
         * @private
         */
        private height_: number;

        /**
         * The underlying graphics.
         * @type {goog.graphics.AbstractGraphics}
         * @private
         */
        private graphics_: goog.graphics.AbstractGraphics;

        /**
         * Colors to paint the background of certain ranges (optional).
         * @type {Array<goog.ui.GaugeColoredRange>}
         * @private
         */
        private rangeColors_: goog.ui.GaugeColoredRange[];

        /**
         * The minimal value that can be displayed.
         * @private
         * @type {number}
         */
        private minValue_: number;

        /**
         * The maximal value that can be displayed.
         * @private
         * @type {number}
         */
        private maxValue_: number;

        /**
         * The number of major tick sections.
         * @private
         * @type {number}
         */
        private majorTicks_: number;

        /**
         * The number of minor tick sections in each major tick section.
         * @private
         * @type {number}
         */
        private minorTicks_: number;

        /**
         * The current value that needs to be displayed in the gauge.
         * @private
         * @type {number}
         */
        private value_: number;

        /**
         * The current value formatted into a String.
         * @private
         * @type {?string}
         */
        private formattedValue_: string|null;

        /**
         * The current colors theme.
         * @private
         * @type {goog.ui.GaugeTheme?}
         */
        private theme_: goog.ui.GaugeTheme|null;

        /**
         * Title to display above the gauge center.
         * @private
         * @type {?string}
         */
        private titleTop_: string|null;

        /**
         * Title to display below the gauge center.
         * @private
         * @type {?string}
         */
        private titleBottom_: string|null;

        /**
         * Font to use for drawing titles.
         * If null (default), computed dynamically with a size relative to the
         * gauge radius.
         * @private
         * @type {goog.graphics.Font?}
         */
        private titleFont_: goog.graphics.Font|null;

        /**
         * Font to use for drawing the formatted value.
         * If null (default), computed dynamically with a size relative to the
         * gauge radius.
         * @private
         * @type {goog.graphics.Font?}
         */
        private valueFont_: goog.graphics.Font|null;

        /**
         * Font to use for drawing tick labels.
         * If null (default), computed dynamically with a size relative to the
         * gauge radius.
         * @private
         * @type {goog.graphics.Font?}
         */
        private tickLabelFont_: goog.graphics.Font|null;

        /**
         * The size in angles of the gauge axis area.
         * @private
         * @type {number}
         */
        private angleSpan_: number;

        /**
         * The radius for drawing the needle.
         * Computed on full redraw, and used on every animation step of moving
         * the needle.
         * @type {number}
         * @private
         */
        private needleRadius_: number;

        /**
         * The group elemnt of the needle. Contains all elements that change when the
         * gauge value changes.
         * @type {goog.graphics.GroupElement?}
         * @private
         */
        private needleGroup_: goog.graphics.GroupElement|null;

        /**
         * The current position (0-1) of the visible needle.
         * Initially set to null to prevent animation on first opening of the gauge.
         * @type {?number}
         * @private
         */
        private needleValuePosition_: number|null;

        /**
         * Text labels to display by major tick marks.
         * @type {Array<string>?}
         * @private
         */
        private majorTickLabels_: string[]|null;

        /**
         * Animation object while needle is being moved (animated).
         * @type {goog.fx.Animation?}
         * @private
         */
        private animation_: goog.fx.Animation|null;

        /**
         * @return {number} The minimum value of the range.
         */
        getMinimum(): number;

        /**
         * Sets the minimum value of the range
         * @param {number} min The minimum value of the range.
         */
        setMinimum(min: number): void;

        /**
         * @return {number} The maximum value of the range.
         */
        getMaximum(): number;

        /**
         * Sets the maximum number of the range
         * @param {number} max The maximum value of the range.
         */
        setMaximum(max: number): void;

        /**
         * Sets the current value range displayed by the gauge.
         * @param {number} value The current value for the gauge. This value
         *     determines the position of the needle of the gauge.
         * @param {string=} opt_formattedValue The string value to show in the gauge.
         *     If not specified, no string value will be displayed.
         */
        setValue(value: number, opt_formattedValue?: string): void;

        /**
         * Sets the number of major tick sections and minor tick sections.
         * @param {number} majorUnits The number of major tick sections.
         * @param {number} minorUnits The number of minor tick sections for each major
         *     tick section.
         */
        setTicks(majorUnits: number, minorUnits: number): void;

        /**
         * Sets the labels of the major ticks.
         * @param {Array<string>} tickLabels A text label for each major tick value.
         */
        setMajorTickLabels(tickLabels: string[]): void;

        /**
         * Sets the top title of the gauge.
         * The top title is displayed above the center.
         * @param {string} text The top title text.
         */
        setTitleTop(text: string): void;

        /**
         * Sets the bottom title of the gauge.
         * The top title is displayed below the center.
         * @param {string} text The bottom title text.
         */
        setTitleBottom(text: string): void;

        /**
         * Sets the font for displaying top and bottom titles.
         * @param {goog.graphics.Font} font The font for titles.
         */
        setTitleFont(font: goog.graphics.Font): void;

        /**
         * Sets the font for displaying the formatted value.
         * @param {goog.graphics.Font} font The font for displaying the value.
         */
        setValueFont(font: goog.graphics.Font): void;

        /**
         * Sets the color theme for drawing the gauge.
         * @param {goog.ui.GaugeTheme} theme The color theme to use.
         */
        setTheme(theme: goog.ui.GaugeTheme): void;

        /**
         * Set the background color for a range of values on the gauge.
         * @param {number} fromValue The lower (start) value of the colored range.
         * @param {number} toValue The higher (end) value of the colored range.
         * @param {string} color The color name to paint the range with. For example
         *     'red', '#ffcc00' or constants like goog.ui.Gauge.RED.
         */
        addBackgroundColor(fromValue: number, toValue: number, color: string): void;

        /**
         * Clears the entire graphics area.
         * @private
         */
        private clear_(): void;

        /**
         * Redraw the entire gauge.
         * @private
         */
        private draw_(): void;

        /**
         * Handle animation events while the hand is moving.
         * @param {goog.fx.AnimationEvent} e The event.
         * @private
         */
        private onAnimate_(e: goog.fx.AnimationEvent): void;

        /**
         * Handle animation events when hand move is complete.
         * @private
         */
        private onAnimateEnd_(): void;

        /**
         * Stop the current animation, if it is active.
         * @private
         */
        private stopAnimation_(): void;

        /**
         * Convert a value to the position in the range. The returned position
         * is a value between 0 and 1, where 0 indicates the lowest range value,
         * 1 is the highest range, and any value in between is proportional
         * to mapping the range to (0-1).
         * If the value is not within the range, the returned value may be a bit
         * lower than 0, or a bit higher than 1. This is done so that values out
         * of range will be displayed just a bit outside of the gauge axis.
         * @param {number} value The value to convert.
         * @private
         * @return {number} The range position.
         */
        private valueToRangePosition_(value: number): number;

        /**
         * Convert a value to an angle based on the value range and angle span
         * @param {number} value The value.
         * @return {number} The angle where this value is located on the round
         *     axis, based on the range and angle span.
         * @private
         */
        private valueToAngle_(value: number): number;

        /**
         * Convert a value-position (percent in the range) to an angle based on
         * the angle span. A value-position is a value that has been proportinally
         * adjusted to a value betwwen 0-1, proportionaly to the range.
         * @param {number} valuePct The value.
         * @return {number} The angle where this value is located on the round
         *     axis, based on the range and angle span.
         * @private
         */
        private valuePositionToAngle_(valuePct: number): number;

        /**
         * Draw the elements that depend on the current value (the needle and
         * the formatted value). This function is called whenever a value is changed
         * or when the entire gauge is redrawn.
         * @private
         */
        private drawValue_(): void;

        /**
         * Redraws the entire gauge.
         * Should be called after theme colors have been changed.
         */
        redraw(): void;
    }
}

declare namespace goog.ui.Gauge {
    /**
     * Constant for a background color for a gauge area.
     */
    let RED: any /*missing*/;

    /**
     * Constant for a background color for a gauge area.
     */
    let GREEN: any /*missing*/;

    /**
     * Constant for a background color for a gauge area.
     */
    let YELLOW: any /*missing*/;

    /**
     * The radius of the entire gauge from the canvas size.
     * @type {number}
     */
    let FACTOR_RADIUS_FROM_SIZE: number;

    /**
     * The ratio of internal gauge radius from entire radius.
     * The remaining area is the border around the gauge.
     * @type {number}
     */
    let FACTOR_MAIN_AREA: number;

    /**
     * The ratio of the colored background area for value ranges.
     * The colored area width is computed as
     * InternalRadius * (1 - FACTOR_COLOR_RADIUS)
     * @type {number}
     */
    let FACTOR_COLOR_RADIUS: number;

    /**
     * The ratio of the major ticks length start position, from the radius.
     * The major ticks length width is computed as
     * InternalRadius * (1 - FACTOR_MAJOR_TICKS)
     * @type {number}
     */
    let FACTOR_MAJOR_TICKS: number;

    /**
     * The ratio of the minor ticks length start position, from the radius.
     * The minor ticks length width is computed as
     * InternalRadius * (1 - FACTOR_MINOR_TICKS)
     * @type {number}
     */
    let FACTOR_MINOR_TICKS: number;

    /**
     * The length of the needle front (value facing) from the internal radius.
     * The needle front is the part of the needle that points to the value.
     * @type {number}
     */
    let FACTOR_NEEDLE_FRONT: number;

    /**
     * The length of the needle back relative to the internal radius.
     * The needle back is the part of the needle that points away from the value.
     * @type {number}
     */
    let FACTOR_NEEDLE_BACK: number;

    /**
     * The width of the needle front at the hinge.
     * This is the width of the curve control point, the actual width is
     * computed by the curve itself.
     * @type {number}
     */
    let FACTOR_NEEDLE_WIDTH: number;

    /**
     * The width (radius) of the needle hinge from the gauge radius.
     * @type {number}
     */
    let FACTOR_NEEDLE_HINGE: number;

    /**
     * The title font size (height) for titles relative to the internal radius.
     * @type {number}
     */
    let FACTOR_TITLE_FONT_SIZE: number;

    /**
     * The offset of the title from the center, relative to the internal radius.
     * @type {number}
     */
    let FACTOR_TITLE_OFFSET: number;

    /**
     * The formatted value font size (height) relative to the internal radius.
     * @type {number}
     */
    let FACTOR_VALUE_FONT_SIZE: number;

    /**
     * The title font size (height) for tick labels relative to the internal radius.
     * @type {number}
     */
    let FACTOR_TICK_LABEL_FONT_SIZE: number;

    /**
     * The offset of the formatted value down from the center, relative to the
     * internal radius.
     * @type {number}
     */
    let FACTOR_VALUE_OFFSET: number;

    /**
     * The font name for title text.
     * @type {string}
     */
    let TITLE_FONT_NAME: string;

    /**
     * The maximal size of a step the needle can move (percent from size of range).
     * If the needle needs to move more, it will be moved in animated steps, to
     * show a smooth transition between values.
     * @type {number}
     */
    let NEEDLE_MOVE_MAX_STEP: number;

    /**
     * Time in miliseconds for animating a move of the value pointer.
     * @type {number}
     */
    let NEEDLE_MOVE_TIME: number;

    /**
     * Tolerance factor for how much values can exceed the range (being too
     * low or too high). The value is presented as a position (percentage).
     * @type {number}
     */
    let MAX_EXCEED_POSITION_POSITION: number;
}
