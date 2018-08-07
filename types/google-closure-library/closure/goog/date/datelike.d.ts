/// <reference path="../../../globals.d.ts"/>
/// <reference path="./date.d.ts"/>

declare module 'goog:goog.date.DateLike' {
    import alias = goog.date.DateLike;
    export default alias;
}

declare namespace goog.date {
    /**
     * @typedef {(Date|goog.date.Date)}
     */
    type DateLike = goog.GlobalDate|goog.date.Date;
}
