/// <reference path="closure/goog/base.d.ts"/>

declare const COMPILED: boolean;

type WorkerGlobalScope = any;

declare namespace goog {
    type GlobalDate = Date;

    type GlobalEvent = Event;

    type GlobalEventTarget = EventTarget;
}

type IArrayLike<V> = object&{
    [key: number]: V;
    length: number;
};

interface IThenable<R> {
    then<U>(onFulfilled: (value: R) => IThenable<U>, onRejected: (error: any) => IThenable<U>): IThenable<U>;
    then<U>(onFulfilled: (value: R) => IThenable<U>, onRejected?: (error: any) => U): IThenable<U>;
    then<U>(onFulfilled: (value: R) => U, onRejected: (error: any) => IThenable<U>): IThenable<U>;
    then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => U): IThenable<U>;
}

interface IDBKeyType {}

interface IDBDatabaseException {}
