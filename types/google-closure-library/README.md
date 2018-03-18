# [Google Closure Library](https://github.com/google/closure-library)

## Loading Closure Library

Unlike most npm packages, the Closure Library is very large, loads into the global namespace, and has its own module
system (as Closure Library predates npm).

### goog.require + automatic type inclusion

All type declarations are loaded via TS's automatic type inclusion. (See TS
[typing options](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types) for details
on compiler options.)

Code is loaded at runtime via `goog.require`.

```typescript
import 'google-closure-library';

goog.require('goog.array');
goog.require('goog.crypt.Sha1');

goog.array.last([1, 2, 3]);
new goog.crypt.Sha1().digest();
```

### goog.require + manual type inclusion

The same as above but include the types manually.

```typescript
/// <reference types="google-closure-library/all"/>
import 'google-closure-library';

goog.require('goog.array');
goog.require('goog.crypt.Sha1');

goog.array.last([1, 2, 3]);
new goog.crypt.Sha1().digest();
```

### module imports

Load modules by path. This is better for tsc and language service performance, as it loads only the selected typings,
rather than all 6MB of declartions.

```typescript
import 'google-closure-library';
import 'google-closure-library/closure/goog/array/array';
import 'google-closure-library/closure/goog/crypt/sha1';

goog.array.last([1, 2, 3]);
new goog.crypt.Sha1().digest();
```

### `goog:` namespace

If using the Google Closure Compiler, you may use `goog:`-namespaced module imports of Closure symbols. See
[google-closure-library-modules](../google-closure-library-modules).

## Inheritance

TypeScript follows the ES practice of inherting statics. However, Closure's goog.inherits() does not do this.

To resolve this discrepancy. each class's static members are on the class declaration, but instance members are in
dummy base class prefixed with `__`. Any closure subclasses inherit from this dummy class, which does not have the
static members.

Unless you are writing declarations for goog.inherits() code, you should not ever use the `__` classes.

## JSDoc

JSDoc annotations have been kept, excluding @constructor but including access modifiers and @type. It is helpful to see
the Closure Library's intent.

In Closure Library, the class and constructor documentation are made together. Docs have been placed on the class,
except for @param annotations which are on the constructor.

## Maintenance

This project was initially generated using a modified version of
[typescript-closure-tools](https://github.com/lucidsoftware/typescript-closure-tools), with inspiration from
[closure-ts](https://github.com/teppeis/closure-ts), and [clutz](https://github.com/angular/clutz).

This tooling could continue to be used to update the TypeScript declarations. However, this would miss the ability to
use advanced features from TypeScript's type system.

For example, consider goog.array.zip

```typescript
// Original JS
/**
 * @param {...!IArrayLike<?>} var_args
 * @return {!Array<Array<?>>}
 */
goog.array.zip = function(var_args) {
    // ...
};

// Generated TS declaration
function zip(...var_args: IArrayLike<any>[]): any[][];
```

We can add specialized overloads, for better static typing.

```typescript
function zip<A1>(a1: IArrayLike<A1>): [A1][];
function zip<A1, A2>(a1: IArrayLike<A1>, a2: IArrayLike<A2>): [A1, A2][];
function zip<A1, A2, A3>(a1: IArrayLike<A1>, a2: IArrayLike<A2>, a3: IArrayLike<A3>): [A1, A2, A3][];
```

If a symbol is added to the Closure Library, please also update [google-closure-library-modules](../google-closure-library-modules).
