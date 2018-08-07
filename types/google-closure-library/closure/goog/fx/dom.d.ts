/// <reference path="../../../globals.d.ts"/>
/// <reference path="./animation.d.ts"/>
/// <reference path="../events/eventhandler.d.ts"/>

declare module 'goog:goog.fx.dom' {
    export = goog.fx.dom;
}

declare module 'goog:goog.fx.dom.Swipe' {
    import alias = goog.fx.dom.Swipe;
    export default alias;
}

declare module 'goog:goog.fx.dom.SlideFrom' {
    import alias = goog.fx.dom.SlideFrom;
    export default alias;
}

declare module 'goog:goog.fx.dom.Slide' {
    import alias = goog.fx.dom.Slide;
    export default alias;
}

declare module 'goog:goog.fx.dom.Scroll' {
    import alias = goog.fx.dom.Scroll;
    export default alias;
}

declare module 'goog:goog.fx.dom.ResizeWidth' {
    import alias = goog.fx.dom.ResizeWidth;
    export default alias;
}

declare module 'goog:goog.fx.dom.ResizeHeight' {
    import alias = goog.fx.dom.ResizeHeight;
    export default alias;
}

declare module 'goog:goog.fx.dom.Resize' {
    import alias = goog.fx.dom.Resize;
    export default alias;
}

declare module 'goog:goog.fx.dom.PredefinedEffect' {
    import alias = goog.fx.dom.PredefinedEffect;
    export default alias;
}

declare module 'goog:goog.fx.dom.FadeOutAndHide' {
    import alias = goog.fx.dom.FadeOutAndHide;
    export default alias;
}

declare module 'goog:goog.fx.dom.FadeOut' {
    import alias = goog.fx.dom.FadeOut;
    export default alias;
}

declare module 'goog:goog.fx.dom.FadeInAndShow' {
    import alias = goog.fx.dom.FadeInAndShow;
    export default alias;
}

declare module 'goog:goog.fx.dom.FadeIn' {
    import alias = goog.fx.dom.FadeIn;
    export default alias;
}

declare module 'goog:goog.fx.dom.Fade' {
    import alias = goog.fx.dom.Fade;
    export default alias;
}

declare module 'goog:goog.fx.dom.ColorTransform' {
    import alias = goog.fx.dom.ColorTransform;
    export default alias;
}

declare module 'goog:goog.fx.dom.BgColorTransform' {
    import alias = goog.fx.dom.BgColorTransform;
    export default alias;
}

declare namespace goog.fx.dom {
    /**
     * Abstract class that provides reusable functionality for predefined animations
     * that manipulate a single DOM element
     *
     * @extends {goog.fx.Animation}
     * @struct
     */
    class PredefinedEffect extends __PredefinedEffect {}
    abstract class __PredefinedEffect extends goog.fx.__Animation {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start Array for start coordinates.
         * @param {Array<number>} end Array for end coordinates.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);

        /**
         * DOM Node that will be used in the animation
         * @type {Element}
         */
        element: Element;

        /**
         * Whether the element is rendered right-to-left. We cache this here for
         * efficiency.
         * @private {boolean|undefined}
         */
        private rightToLeft_: any /*missing*/;

        /**
         * Called to update the style of the element.
         * @protected
         */
        protected updateStyle: any /*missing*/;

        /**
         * Whether the DOM element being manipulated is rendered right-to-left.
         * @return {boolean} True if the DOM element is rendered right-to-left, false
         *     otherwise.
         */
        isRightToLeft(): boolean;
    }

    /**
     * Creates an animation object that will slide an element from A to B.  (This
     * in effect automatically sets up the onanimate event for an Animation object)
     *
     * Start and End should be 2 dimensional arrays
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class Slide extends __Slide {}
    abstract class __Slide extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 2D array for start coordinates (X, Y).
         * @param {Array<number>} end 2D array for end coordinates (X, Y).
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);
    }

    /**
     * Slides an element from its current position.
     *
     * @extends {goog.fx.dom.Slide}
     * @struct
     */
    class SlideFrom extends __SlideFrom {}
    abstract class __SlideFrom extends goog.fx.dom.__Slide {
        /**
         * @param {Element} element DOM node to be used in the animation.
         * @param {Array<number>} end 2D array for end coordinates (X, Y).
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, end: number[], time: number, opt_acc?: Function);

        /** @type {?Array<number>} */
        startPoint: number[]|null;
    }

    /**
     * Creates an animation object that will slide an element into its final size.
     * Requires that the element is absolutely positioned.
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class Swipe extends __Swipe {}
    abstract class __Swipe extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 2D array for start size (W, H).
         * @param {Array<number>} end 2D array for end size (W, H).
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);

        /**
         * Maximum width for element.
         * @type {number}
         * @private
         */
        private maxWidth_: number;

        /**
         * Maximum height for element.
         * @type {number}
         * @private
         */
        private maxHeight_: number;

        /**
         * Helper function for setting element clipping.
         * @param {number} x Current element width.
         * @param {number} y Current element height.
         * @param {number} w Maximum element width.
         * @param {number} h Maximum element height.
         * @private
         */
        private clip_(x: number, y: number, w: number, h: number): void;
    }

    /**
     * Creates an animation object that will scroll an element from A to B.
     *
     * Start and End should be 2 dimensional arrays
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class Scroll extends __Scroll {}
    abstract class __Scroll extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 2D array for start scroll left and top.
         * @param {Array<number>} end 2D array for end scroll left and top.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);
    }

    /**
     * Creates an animation object that will resize an element between two widths
     * and heights.
     *
     * Start and End should be 2 dimensional arrays
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class Resize extends __Resize {}
    abstract class __Resize extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 2D array for start width and height.
         * @param {Array<number>} end 2D array for end width and height.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);
    }

    /**
     * Creates an animation object that will resize an element between two widths
     *
     * Start and End should be numbers
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class ResizeWidth extends __ResizeWidth {}
    abstract class __ResizeWidth extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} start Start width.
         * @param {number} end End width.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number, end: number, time: number, opt_acc?: Function);
    }

    /**
     * Creates an animation object that will resize an element between two heights
     *
     * Start and End should be numbers
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class ResizeHeight extends __ResizeHeight {}
    abstract class __ResizeHeight extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} start Start height.
         * @param {number} end End height.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number, end: number, time: number, opt_acc?: Function);
    }

    /**
     * Creates an animation object that fades the opacity of an element between two
     * limits.
     *
     * Start and End should be floats between 0 and 1
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class Fade extends __Fade {}
    abstract class __Fade extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>|number} start 1D Array or Number with start opacity.
         * @param {Array<number>|number} end 1D Array or Number for end opacity.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[]|number, end: number[]|number, time: number, opt_acc?: Function);

        /**
         * The last opacity we set, or -1 for not set.
         * @private {number}
         */
        private lastOpacityUpdate_: any /*missing*/;

        /**
         * Animation event handler that will show the element.
         */
        show(): void;

        /**
         * Animation event handler that will hide the element
         */
        hide(): void;
    }

    /**
     * Fades an element out from full opacity to completely transparent.
     *
     * @extends {goog.fx.dom.Fade}
     * @struct
     */
    class FadeOut extends __FadeOut {}
    abstract class __FadeOut extends goog.fx.dom.__Fade {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, time: number, opt_acc?: Function);
    }

    /**
     * Fades an element in from completely transparent to fully opacity.
     *
     * @extends {goog.fx.dom.Fade}
     * @struct
     */
    class FadeIn extends __FadeIn {}
    abstract class __FadeIn extends goog.fx.dom.__Fade {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, time: number, opt_acc?: Function);
    }

    /**
     * Fades an element out from full opacity to completely transparent and then
     * sets the display to 'none'
     *
     * @extends {goog.fx.dom.Fade}
     * @struct
     */
    class FadeOutAndHide extends __FadeOutAndHide {}
    abstract class __FadeOutAndHide extends goog.fx.dom.__Fade {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, time: number, opt_acc?: Function);
    }

    /**
     * Sets an element's display to be visible and then fades an element in from
     * completely transparent to fully opaque.
     *
     * @extends {goog.fx.dom.Fade}
     * @struct
     */
    class FadeInAndShow extends __FadeInAndShow {}
    abstract class __FadeInAndShow extends goog.fx.dom.__Fade {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, time: number, opt_acc?: Function);
    }

    /**
     * Provides a transformation of an elements background-color.
     *
     * Start and End should be 3D arrays representing R,G,B
     *
     * @extends {goog.fx.dom.PredefinedEffect}
     * @struct
     */
    class BgColorTransform extends __BgColorTransform {}
    abstract class __BgColorTransform extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 3D Array for RGB of start color.
         * @param {Array<number>} end 3D Array for RGB of end color.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);

        /**
         * Animation event handler that will set the background-color of an element
         */
        setColor(): void;
    }

    /**
     * Provides a transformation of an elements color.
     *
     * @struct
     * @extends {goog.fx.dom.PredefinedEffect}
     */
    class ColorTransform extends __ColorTransform {}
    abstract class __ColorTransform extends goog.fx.dom.__PredefinedEffect {
        /**
         * @param {Element} element Dom Node to be used in the animation.
         * @param {Array<number>} start 3D Array representing R,G,B.
         * @param {Array<number>} end 3D Array representing R,G,B.
         * @param {number} time Length of animation in milliseconds.
         * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
         */
        constructor(element: Element, start: number[], end: number[], time: number, opt_acc?: Function);
    }

    /**
     * Fade elements background color from start color to the element's current
     * background color.
     *
     * Start should be a 3D array representing R,G,B
     *
     * @param {Element} element Dom Node to be used in the animation.
     * @param {Array<number>} start 3D Array for RGB of start color.
     * @param {number} time Length of animation in milliseconds.
     * @param {goog.events.EventHandler=} opt_eventHandler Optional event handler
     *     to use when listening for events.
     */
    function
        bgColorFadeIn(element: Element, start: number[], time: number, opt_eventHandler?: goog.events.EventHandler<any>):
            void;
}

declare namespace goog.fx.dom.Fade {
}
