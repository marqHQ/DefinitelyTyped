# [Google Closure Library](https://github.com/google/closure-library) modules

These typings are for importing [google-closure-library](../google-closure-library) via `goog:`-namespaced symbols.

## Requirements

The [Google Closure Compiler](https://github.com/google/closure-compiler) loads `goog:`-packages from Closure symbols.

These typing require Closure Compiler or a compatible bundler/module system.

## Setup

Add a [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in
tsconfig.json. Assuming you've installed the npm package at the same level as the tsconfig,

```json
{
    "compilerOptions": {
        "paths": {
            "goog:*": [
                "node_modules/@types/google-closure-library-modules/a/*",
                "node_modules/@types/google-closure-library-modules/b/*"
            ]
        }
    }
}
```

(Multiple values for the path mapping are due to case-insensitive duplicates in Closure symbols.)

## Use

```typescript
import * as array from 'goog:goog.array';
import Sha1 from 'goog:goog.crypt.Sha1';

array.last([1, 2, 3]);
new Sha1().digest();
```
