/// <reference path="../../../globals.d.ts"/>
/// <reference path="./abstractrange.d.ts"/>

declare module 'goog:goog.dom.AbstractMultiRange' {
    import alias = goog.dom.AbstractMultiRange;
    export default alias;
}

declare namespace goog.dom {
    /**
     * Creates a new multi range with no properties.  Do not use this
     * constructor: use one of the goog.dom.Range.createFrom* methods instead.
     * @extends {goog.dom.AbstractRange}
     */
    class AbstractMultiRange extends __AbstractMultiRange {}
    abstract class __AbstractMultiRange extends goog.dom.__AbstractRange {
        /**
         */
        constructor();
    }
}
