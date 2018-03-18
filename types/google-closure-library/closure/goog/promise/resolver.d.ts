/// <reference path="../../../globals.d.ts"/>
/// <reference path="./promise.d.ts"/>

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
