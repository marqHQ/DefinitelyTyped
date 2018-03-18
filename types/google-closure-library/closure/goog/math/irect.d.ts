/// <reference path="../../../globals.d.ts"/>

declare namespace goog.math {
    /**
     * Record for representing rectangular regions, allows compatibility between
     * things like ClientRect and goog.math.Rect.
     *
     * @record
     */
    type IRect = {left: number, top: number, width: number, height: number};
}
