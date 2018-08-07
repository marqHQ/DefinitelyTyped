/// <reference path="../../../../globals.d.ts"/>
/// <reference path="./element.d.ts"/>
/// <reference path="../groupelement.d.ts"/>

declare module 'goog:goog.graphics.ext.Group' {
    import alias = goog.graphics.ext.Group;
    export default alias;
}

declare namespace goog.graphics.ext {
    /**
     * Wrapper for a graphics group.
     * @extends {goog.graphics.ext.Element}
     */
    class Group extends __Group {}
    abstract class __Group extends goog.graphics.ext.__Element {
        /**
         * @param {goog.graphics.ext.Group} group Parent for this element. Can
         *     be null if this is a Graphics instance.
         * @param {goog.graphics.GroupElement=} opt_wrapper The thin wrapper
         *     to wrap. If omitted, a new group will be created. Must be included
         *     when group is null.
         */
        constructor(group: goog.graphics.ext.Group, opt_wrapper?: goog.graphics.GroupElement);

        /**
         * Array of child elements this group contains.
         * @type {Array<goog.graphics.ext.Element>}
         * @private
         */
        private children_: goog.graphics.ext.Element[];

        /**
         * Add an element to the group.  This should be treated as package local, as
         * it is called by the draw* methods.
         * @param {!goog.graphics.ext.Element} element The element to add.
         * @param {boolean=} opt_chain Whether this addition is part of a longer set
         *     of element additions.
         */
        addChild(element: goog.graphics.ext.Element, opt_chain?: boolean): void;

        /**
         * Remove an element from the group.
         * @param {goog.graphics.ext.Element} element The element to remove.
         */
        removeChild(element: goog.graphics.ext.Element): void;

        /**
         * Calls the given function on each of this component's children in order.  If
         * `opt_obj` is provided, it will be used as the 'this' object in the
         * function when called.  The function should take two arguments:  the child
         * component and its 0-based index.  The return value is ignored.
         * @param {Function} f The function to call for every child component; should
         *    take 2 arguments (the child and its index).
         * @param {Object=} opt_obj Used as the 'this' object in f when called.
         */
        forEachChild(f: Function, opt_obj?: Object): void;

        /**
         * Transform the children that need to be transformed.
         * @protected
         */
        protected transformChildren(): void;

        /**
         * As part of the reset process, update child elements.
         */
        updateChildren(): void;

        /**
         * When adding an element, grow this group's bounds to fit it.
         * @param {!goog.graphics.ext.Element} element The added element.
         * @return {boolean} Whether the size of this group changed.
         * @private
         */
        private growToFit_(element: goog.graphics.ext.Element): boolean;

        /**
         * @return {number} The width of the element's coordinate space.
         */
        getCoordinateWidth(): number;

        /**
         * @return {number} The height of the element's coordinate space.
         */
        getCoordinateHeight(): number;

        /**
         * Remove all drawing elements from the group.
         */
        clear(): void;
    }
}
