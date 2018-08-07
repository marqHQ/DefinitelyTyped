/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractdragdrop.d.ts"/>

declare module 'goog:goog.fx.DragDrop' {
    import alias = goog.fx.DragDrop;
    export default alias;
}

declare namespace goog.fx {
    /**
     * Drag/drop implementation for creating drag sources/drop targets consisting of
     * a single HTML Element.
     *
     * @throws Error If no element argument is provided or if the type is invalid
     * @extends {goog.fx.AbstractDragDrop}
     * @struct
     */
    class DragDrop extends __DragDrop {}
    abstract class __DragDrop extends goog.fx.__AbstractDragDrop {
        /**
         * @param {Element|string} element Dom Node, or string representation of node
         *     id, to be used as drag source/drop target.
         * @param {Object=} opt_data Data associated with the source/target.
         */
        constructor(element: Element|string, opt_data?: Object);
    }
}
