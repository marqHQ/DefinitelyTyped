/// <reference path="../../../globals.d.ts"/>
/// <reference path="./promise.d.ts"/>

declare module 'goog:goog.promise.Resolver' {
    import alias = goog.promise.Resolver;
    export default alias;
}

declare namespace goog.promise {
    interface Resolver<TYPE> {
        /**
         * The promise that created this resolver.
         * @type {!goog.Promise<TYPE>}
         */
        promise: goog.Promise<TYPE>;

        /**
         * Resolves this resolver with the specified value.
         * @type {function((TYPE|goog.Promise<TYPE>|Thenable)=)}
         */
        resolve: (_0: TYPE|IThenable<TYPE>) => void;

        /**
         * Rejects this resolver with the specified reason.
         * @type {function(*=): void}
         */
        reject: (_0: any) => void;
    }
}
