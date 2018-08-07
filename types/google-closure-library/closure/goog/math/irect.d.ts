/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.math.IRect' {
    import alias = goog.math.IRect;
    export default alias;
}

declare namespace goog.math {
    /**
     * Record for representing rectangular regions, allows compatibility between
     * things like ClientRect and goog.math.Rect.
     *
     * @record
     */
    type IRect = {left: number, top: number, width: number, height: number};
}
