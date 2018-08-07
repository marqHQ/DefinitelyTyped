/// <reference path="../../../globals.d.ts"/>

declare module 'goog:goog.vec' {
    export = goog.vec;
}

declare module 'goog:goog.vec.Number' {
    import alias = goog.vec.Number;
    export default alias;
}

declare module 'goog:goog.vec.Float64' {
    import alias = goog.vec.Float64;
    export default alias;
}

declare module 'goog:goog.vec.Float32' {
    import alias = goog.vec.Float32;
    export default alias;
}

declare module 'goog:goog.vec.ArrayType' {
    import alias = goog.vec.ArrayType;
    export default alias;
}

declare module 'goog:goog.vec.AnyType' {
    import alias = goog.vec.AnyType;
    export default alias;
}

declare namespace goog.vec {
    /** @typedef {!Float32Array} */
    type Float32 = Float32Array;

    /** @typedef {!Float64Array} */
    type Float64 = Float64Array;

    /** @typedef {!Array<number>} */
    interface Number extends Array<number> {}

    /** @typedef {!goog.vec.Float32|!goog.vec.Float64|!goog.vec.Number} */
    type AnyType = goog.vec.Float32|goog.vec.Float64|goog.vec.Number;

    /**
     * @deprecated Use AnyType.
     * @typedef {!Float32Array|!Array<number>}
     */
    type ArrayType = Float32Array|number[];

    /**
     * For graphics work, 6 decimal places of accuracy are typically all that is
     * required.
     *
     * @type {number}
     * @const
     */
    const EPSILON: number;
}
