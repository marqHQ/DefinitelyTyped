/// <reference path="../../globals.d.ts"/>

/**
 * A hook for overriding the define values in uncompiled mode.
 *
 * In uncompiled mode, `CLOSURE_UNCOMPILED_DEFINES` may be defined before
 * loading base.js.  If a key is defined in `CLOSURE_UNCOMPILED_DEFINES`,
 * `goog.define` will use the value instead of the default value.  This
 * allows flags to be overwritten without compilation (this is normally
 * accomplished with the compiler's "define" flag).
 *
 * Example:
 * <pre>
 *   var CLOSURE_UNCOMPILED_DEFINES = {'goog.DEBUG': false};
 * </pre>
 *
 * @type {Object<string, (string|number|boolean)>|undefined}
 */
declare let CLOSURE_UNCOMPILED_DEFINES: {[key: string]: string|number|boolean}|undefined;

/**
 * A hook for overriding the define values in uncompiled or compiled mode,
 * like CLOSURE_UNCOMPILED_DEFINES but effective in compiled code.  In
 * uncompiled code CLOSURE_UNCOMPILED_DEFINES takes precedence.
 *
 * Also unlike CLOSURE_UNCOMPILED_DEFINES the values must be number, boolean or
 * string literals or the compiler will emit an error.
 *
 * While any @define value may be set, only those set with goog.define will be
 * effective for uncompiled code.
 *
 * Example:
 * <pre>
 *   var CLOSURE_DEFINES = {'goog.DEBUG': false} ;
 * </pre>
 *
 * @type {Object<string, (string|number|boolean)>|undefined}
 */
declare let CLOSURE_DEFINES: {[key: string]: string|number|boolean}|undefined;

/**
 * A hook for overriding the base path.
 * @type {string|undefined}
 */
declare let CLOSURE_BASE_PATH: string|undefined;

/**
 * Whether to attempt to load Closure's deps file. By default, when uncompiled,
 * deps files will attempt to be loaded.
 * @type {boolean|undefined}
 */
declare let CLOSURE_NO_DEPS: boolean|undefined;

/**
 * A function to import a single script. This is meant to be overridden when
 * Closure is being run in non-HTML contexts, such as web workers. It's defined
 * in the global scope so that it can be set before base.js is loaded, which
 * allows deps.js to be imported properly.
 *
 * The function is passed the script source, which is a relative URI. It should
 * return true if the script was imported, false otherwise.
 * @type {(function(string): boolean)|undefined}
 */
declare let CLOSURE_IMPORT_SCRIPT: (((_0: string) => boolean))|undefined;

/**
 * Provides a hook for loading a file when using Closure's goog.require() API
 * with goog.modules.  In particular this hook is provided to support Node.js.
 *
 * @type {(function(string):string)|undefined}
 */
declare let CLOSURE_LOAD_FILE_SYNC: (((_0: string) => string))|undefined;

/**
 * A hook for modifying the default behavior goog.getCssName. The function
 * if present, will receive the standard output of the goog.getCssName as
 * its input.
 *
 * @type {(function(string):string)|undefined}
 */
declare let CLOSURE_CSS_NAME_MAP_FN: (((_0: string) => string))|undefined;

/**
 * To use CSS renaming in compiled mode, one of the input files should have a
 * call to goog.setCssNameMapping() with an object literal that the JSCompiler
 * can extract and use to replace all calls to goog.getCssName(). In uncompiled
 * mode, JavaScript code should be loaded before this base.js file that declares
 * a global variable, CLOSURE_CSS_NAME_MAPPING, which is used below. This is
 * to ensure that the mapping is loaded before any calls to goog.getCssName()
 * are made in uncompiled mode.
 *
 * A hook for overriding the CSS name mapping.
 * @type {!Object<string, string>|undefined}
 */
declare let CLOSURE_CSS_NAME_MAPPING: {[key: string]: string}|undefined;

declare module goog {
    const DEBUG: boolean;

    /**
     * Reference to the global context.  In most cases this will be 'window'.
     * @const
     * @suppress {newCheckTypes}
     */
    const global: any;

    /**
     * Defines a named value. In uncompiled mode, the value is retrieved from
     * CLOSURE_DEFINES or CLOSURE_UNCOMPILED_DEFINES if the object is defined and
     * has the property specified, and otherwise used the defined defaultValue.
     * When compiled the default can be overridden using the compiler
     * options or the value set in the CLOSURE_DEFINES object.
     *
     * @param {string} name The distinguished name to provide.
     * @param {string|number|boolean} defaultValue
     */
    function define(name: string, defaultValue: string|number|boolean): void;

    /**
     * Defines a namespace in Closure.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * The presence of one or more goog.provide() calls in a file indicates
     * that the file defines the given objects/namespaces.
     * Provided symbols must not be null or undefined.
     *
     * In addition, goog.provide() creates the object stubs for a namespace
     * (for example, goog.provide("goog.foo.bar") will create the object
     * goog.foo.bar if it does not already exist).
     *
     * Build tools also scan for provide/require/module statements
     * to discern dependencies, build dependency files (see deps.js), etc.
     *
     * @see goog.require
     * @see goog.module
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part".
     */
    function provide(name: string): void;

    /**
     * Defines a module in Closure.
     *
     * Marks that this file must be loaded as a module and claims the namespace.
     *
     * A namespace may only be defined once in a codebase. It may be defined using
     * goog.provide() or goog.module().
     *
     * goog.module() has three requirements:
     * - goog.module may not be used in the same file as goog.provide.
     * - goog.module must be the first statement in the file.
     * - only one goog.module is allowed per file.
     *
     * When a goog.module annotated file is loaded, it is enclosed in
     * a strict function closure. This means that:
     * - any variables declared in a goog.module file are private to the file
     * (not global), though the compiler is expected to inline the module.
     * - The code must obey all the rules of "strict" JavaScript.
     * - the file will be marked as "use strict"
     *
     * NOTE: unlike goog.provide, goog.module does not declare any symbols by
     * itself. If declared symbols are desired, use
     * goog.module.declareLegacyNamespace().
     *
     *
     * See the public goog.module proposal: http://goo.gl/Va1hin
     *
     * @param {string} name Namespace provided by this file in the form
     *     "goog.package.part", is expected but not required.
     * @return {void}
     */
    function module(name: string): void;

    /**
     * Marks that the current file should only be used for testing, and never for
     * live code in production.
     *
     * In the case of unit tests, the message may optionally be an exact namespace
     * for the test (e.g. 'goog.stringTest'). The linter will then ignore the extra
     * provide (if not explicitly defined in the code).
     *
     * @param {string=} opt_message Optional message to add to the error that's
     *     raised when used in production code.
     */
    function setTestOnly(opt_message?: string): void;

    /**
     * Forward declares a symbol. This is an indication to the compiler that the
     * symbol may be used in the source yet is not required and may not be provided
     * in compilation.
     *
     * The most common usage of forward declaration is code that takes a type as a
     * function parameter but does not need to require it. By forward declaring
     * instead of requiring, no hard dependency is made, and (if not required
     * elsewhere) the namespace may never be required and thus, not be pulled
     * into the JavaScript binary. If it is required elsewhere, it will be type
     * checked as normal.
     *
     * Before using goog.forwardDeclare, please read the documentation at
     * https://github.com/google/closure-compiler/wiki/Bad-Type-Annotation to
     * understand the options and tradeoffs when working with forward declarations.
     *
     * @param {string} name The namespace to forward declare in the form of
     *     "goog.package.part".
     */
    function forwardDeclare(name: string): void;

    /**
     * Returns an object based on its fully qualified external name.  The object
     * is not found if null or undefined.  If you are using a compilation pass that
     * renames property names beware that using this function will not find renamed
     * properties.
     *
     * @param {string} name The fully qualified name.
     * @param {Object=} opt_obj The object within which to look; default is
     *     |goog.global|.
     * @return {?} The value (object or primitive) or, if not found, null.
     */
    function getObjectByName(name: string, opt_obj?: Object): any;

    /**
     * Globalizes a whole namespace, such as goog or goog.lang.
     *
     * @param {!Object} obj The namespace to globalize.
     * @param {Object=} opt_global The object to add the properties to.
     * @deprecated Properties may be explicitly exported to the global scope, but
     *     this should no longer be done in bulk.
     */
    function globalize(obj: Object, opt_global?: Object): void;

    /**
     * Adds a dependency from a file to the files it requires.
     * @param {string} relPath The path to the js file.
     * @param {!Array<string>} provides An array of strings with
     *     the names of the objects this file provides.
     * @param {!Array<string>} requires An array of strings with
     *     the names of the objects this file requires.
     * @param {boolean|!Object<string>=} opt_loadFlags Parameters indicating
     *     how the file must be loaded.  The boolean 'true' is equivalent
     *     to {'module': 'goog'} for backwards-compatibility.  Valid properties
     *     and values include {'module': 'goog'} and {'lang': 'es6'}.
     */
    function addDependency(
        relPath: string, provides: string[], requires: string[], opt_loadFlags?: boolean|{[key: string]: string}
    ): void;

    /**
     * Implements a system for the dynamic resolution of dependencies that works in
     * parallel with the BUILD system. Note that all calls to goog.require will be
     * stripped by the compiler.
     * @see goog.provide
     * @param {string} name Namespace to include (as was given in goog.provide()) in
     *     the form "goog.package.part".
     * @return {?} If called within a goog.module file, the associated namespace or
     *     module otherwise null.
     */
    function require(name: string): any;

    /**
     * Path for included scripts.
     * @type {string}
     */
    let basePath: string;

    /**
     * Null function used for default values of callbacks, etc.
     * @return {void} Nothing.
     */
    function nullFunction(): void;

    /**
     * When defining a class Foo with an abstract method bar(), you can do:
     * Foo.prototype.bar = goog.abstractMethod
     *
     * Now if a subclass of Foo fails to override bar(), an error will be thrown
     * when bar() is invoked.
     *
     * @type {!Function}
     * @throws {Error} when invoked to indicate the method should be overridden.
     */
    function abstractMethod(): void;

    /**
     * Adds a `getInstance` static method that always returns the same
     * instance object.
     * @param {!Function} ctor The constructor for the class to add the static
     *     method to.
     * @suppress {missingProperties} 'instance_' isn't a property on 'Function'
     *     but we don't have a better type to use here.
     */
    function addSingletonGetter(ctor: Function): void;

    /**
     * True if goog.dependencies_ is available.
     * @const {boolean}
     */
    const DEPENDENCIES_ENABLED: any /*missing*/;

    /**
     * @package {?boolean}
     * Visible for testing.
     */
    let hasBadLetScoping: any /*missing*/;

    /**
     * @return {boolean}
     * @package Visible for testing.
     */
    function useSafari10Workaround(): boolean;

    /**
     * @param {string} moduleDef
     * @return {string}
     * @package Visible for testing.
     */
    function workaroundSafari10EvalBug(moduleDef: string): string;

    /**
     * @param {function(?):?|string} moduleDef The module definition.
     */
    function loadModule(moduleDef: ((_0: any) => any)|string): void;

    /**
     * This is a "fixed" version of the typeof operator.  It differs from the typeof
     * operator in such a way that null returns 'null' and arrays return 'array'.
     * @param {?} value The value to get the type of.
     * @return {string} The name of the type.
     */
    function typeOf(value: any): string;

    /**
     * Returns true if the specified value is an array.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    function isArray(val: any): val is any[];

    /**
     * Returns true if the object looks like an array. To qualify as array like
     * the value needs to be either a NodeList or an object with a Number length
     * property. Note that for this function neither strings nor functions are
     * considered "array-like".
     *
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an array.
     */
    function isArrayLike(val: any): boolean;

    /**
     * Returns true if the object looks like a Date. To qualify as Date-like the
     * value needs to be an object and have a getFullYear() function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a like a Date.
     */
    function isDateLike(val: any): boolean;

    /**
     * Returns true if the specified value is a function.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is a function.
     */
    function isFunction(val: any): val is Function;

    /**
     * Returns true if the specified value is an object.  This includes arrays and
     * functions.
     * @param {?} val Variable to test.
     * @return {boolean} Whether variable is an object.
     */
    function isObject(val: any): val is {[key: string]: any}; // TODO: isObject is also true for arrays

    /**
     * Gets a unique ID for an object. This mutates the object so that further calls
     * with the same object as a parameter returns the same value. The unique ID is
     * guaranteed to be unique across the current session amongst objects that are
     * passed into `getUid`. There is no guarantee that the ID is unique or
     * consistent across sessions. It is unsafe to generate unique ID for function
     * prototypes.
     *
     * @param {Object} obj The object to get the unique ID for.
     * @return {number} The unique ID for the object.
     */
    function getUid(obj: Object): number;

    /**
     * Whether the given object is already assigned a unique ID.
     *
     * This does not modify the object.
     *
     * @param {!Object} obj The object to check.
     * @return {boolean} Whether there is an assigned unique id for the object.
     */
    function hasUid(obj: Object): boolean;

    /**
     * Removes the unique ID from an object. This is useful if the object was
     * previously mutated using `goog.getUid` in which case the mutation is
     * undone.
     * @param {Object} obj The object to remove the unique ID field from.
     */
    function removeUid(obj: Object): void;

    /**
     * Adds a hash code field to an object. The hash code is unique for the
     * given object.
     * @param {Object} obj The object to get the hash code for.
     * @return {number} The hash code for the object.
     * @deprecated Use goog.getUid instead.
     */
    function getHashCode(obj: Object): number;

    /**
     * Removes the hash code field from an object.
     * @param {Object} obj The object to remove the field from.
     * @deprecated Use goog.removeUid instead.
     */
    function removeHashCode(obj: Object): void;

    /**
     * Clones a value. The input may be an Object, Array, or basic type. Objects and
     * arrays will be cloned recursively.
     *
     * WARNINGS:
     * <code>goog.cloneObject</code> does not detect reference loops. Objects that
     * refer to themselves will cause infinite recursion.
     *
     * <code>goog.cloneObject</code> is unaware of unique identifiers, and copies
     * UIDs created by <code>getUid</code> into cloned results.
     *
     * @param {*} obj The value to clone.
     * @return {*} A clone of the input value.
     * @deprecated goog.cloneObject is unsafe. Prefer the goog.object methods.
     */
    function cloneObject(obj: any): any;

    /**
     * A native implementation of goog.bind.
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @private
     */
    function bindNative_(fn: any /* jsdoc error */, selfObj: any /* jsdoc error */, var_args: any /* jsdoc error */):
        void;

    /**
     * A pure-JS implementation of goog.bind.
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @private
     */
    function bindJs_(fn: any /* jsdoc error */, selfObj: any /* jsdoc error */, var_args: any /* jsdoc error */): void;

    /**
     * Partially applies this function to a particular 'this object' and zero or
     * more arguments. The result is a new function with some arguments of the first
     * function pre-filled and the value of this 'pre-specified'.
     *
     * Remaining arguments specified at call-time are appended to the pre-specified
     * ones.
     *
     * Also see: {@link #partial}.
     *
     * Usage:
     * <pre>var barMethBound = goog.bind(myFunction, myObj, 'arg1', 'arg2');
     * barMethBound('arg3', 'arg4');</pre>
     *
     * @param {?function(this:T, ...)} fn A function to partially apply.
     * @param {T} selfObj Specifies the object which this should point to when the
     *     function is run.
     * @param {...*} var_args Additional arguments that are partially applied to the
     *     function.
     * @return {!Function} A partially-applied form of the function goog.bind() was
     *     invoked as a method of.
     * @template T
     * @suppress {deprecated} See above.
     */
    function bind<T, R>(fn: (this: T, ...args) => R, selfObj: T, ...var_args: any[]): (...args: any[]) => R;

    /**
     * Like goog.bind(), except that a 'this object' is not required. Useful when
     * the target function is already bound.
     *
     * Usage:
     * var g = goog.partial(f, arg1, arg2);
     * g(arg3, arg4);
     *
     * @param {Function} fn A function to partially apply.
     * @param {...*} var_args Additional arguments that are partially applied to fn.
     * @return {!Function} A partially-applied form of the function goog.partial()
     *     was invoked as a method of.
     */
    function partial(fn: Function, ...var_args: any[]): Function;

    /**
     * Copies all the members of a source object to a target object. This method
     * does not work on all browsers for all objects that contain keys such as
     * toString or hasOwnProperty. Use goog.object.extend for this purpose.
     * @param {Object} target Target.
     * @param {Object} source Source.
     */
    function mixin(target: Object, source: Object): void;

    /**
     * @return {number} An integer value representing the number of milliseconds
     *     between midnight, January 1, 1970 and the current time.
     */
    function now(): number;

    /**
     * Evals JavaScript in the global scope.  In IE this uses execScript, other
     * browsers use goog.global.eval. If goog.global.eval does not evaluate in the
     * global scope (for example, in Safari), appends a script tag instead.
     * Throws an exception if neither execScript or eval is defined.
     * @param {string} script JavaScript string.
     */
    function globalEval(script: string): void;

    /**
     * Handles strings that are intended to be used as CSS class names.
     *
     * This function works in tandem with @see goog.setCssNameMapping.
     *
     * Without any mapping set, the arguments are simple joined with a hyphen and
     * passed through unaltered.
     *
     * When there is a mapping, there are two possible styles in which these
     * mappings are used. In the BY_PART style, each part (i.e. in between hyphens)
     * of the passed in css name is rewritten according to the map. In the BY_WHOLE
     * style, the full css name is looked up in the map directly. If a rewrite is
     * not specified by the map, the compiler will output a warning.
     *
     * When the mapping is passed to the compiler, it will replace calls to
     * goog.getCssName with the strings from the mapping, e.g.
     *     var x = goog.getCssName('foo');
     *     var y = goog.getCssName(this.baseClass, 'active');
     *  becomes:
     *     var x = 'foo';
     *     var y = this.baseClass + '-active';
     *
     * If one argument is passed it will be processed, if two are passed only the
     * modifier will be processed, as it is assumed the first argument was generated
     * as a result of calling goog.getCssName.
     *
     * @param {string} className The class name.
     * @param {string=} opt_modifier A modifier to be appended to the class name.
     * @return {string} The class name or the concatenation of the class name and
     *     the modifier.
     */
    function getCssName(className: string, opt_modifier?: string): string;

    /**
     * Sets the map to check when returning a value from goog.getCssName(). Example:
     * <pre>
     * goog.setCssNameMapping({
     *   "goog": "a",
     *   "disabled": "b",
     * });
     *
     * var x = goog.getCssName('goog');
     * // The following evaluates to: "a a-b".
     * goog.getCssName('goog') + ' ' + goog.getCssName(x, 'disabled')
     * </pre>
     * When declared as a map of string literals to string literals, the JSCompiler
     * will replace all calls to goog.getCssName() using the supplied map if the
     * --process_closure_primitives flag is set.
     *
     * @param {!Object} mapping A map of strings to strings where keys are possible
     *     arguments to goog.getCssName() and values are the corresponding values
     *     that should be returned.
     * @param {string=} opt_style The style of css name mapping. There are two valid
     *     options: 'BY_PART', and 'BY_WHOLE'.
     * @see goog.getCssName for a description.
     */
    function setCssNameMapping(mapping: Object, opt_style?: string): void;

    /**
     * Gets a localized message.
     *
     * This function is a compiler primitive. If you give the compiler a localized
     * message bundle, it will replace the string at compile-time with a localized
     * version, and expand goog.getMsg call to a concatenated string.
     *
     * Messages must be initialized in the form:
     * <code>
     * var MSG_NAME = goog.getMsg('Hello {$placeholder}', {'placeholder': 'world'});
     * </code>
     *
     * This function produces a string which should be treated as plain text. Use
     * {@link goog.html.SafeHtmlFormatter} in conjunction with goog.getMsg to
     * produce SafeHtml.
     *
     * @param {string} str Translatable string, places holders in the form {$foo}.
     * @param {Object<string, string>=} opt_values Maps place holder name to value.
     * @return {string} message with placeholders filled.
     */
    function getMsg(str: string, opt_values?: {[key: string]: string}): string;

    /**
     * Gets a localized message. If the message does not have a translation, gives a
     * fallback message.
     *
     * This is useful when introducing a new message that has not yet been
     * translated into all languages.
     *
     * This function is a compiler primitive. Must be used in the form:
     * <code>var x = goog.getMsgWithFallback(MSG_A, MSG_B);</code>
     * where MSG_A and MSG_B were initialized with goog.getMsg.
     *
     * @param {string} a The preferred message.
     * @param {string} b The fallback message.
     * @return {string} The best translated message.
     */
    function getMsgWithFallback(a: string, b: string): string;

    /**
     * Exposes an unobfuscated global namespace path for the given object.
     * Note that fields of the exported object *will* be obfuscated, unless they are
     * exported in turn via this function or goog.exportProperty.
     *
     * Also handy for making public items that are defined in anonymous closures.
     *
     * ex. goog.exportSymbol('public.path.Foo', Foo);
     *
     * ex. goog.exportSymbol('public.path.Foo.staticFunction', Foo.staticFunction);
     *     public.path.Foo.staticFunction();
     *
     * ex. goog.exportSymbol('public.path.Foo.prototype.myMethod',
     *                       Foo.prototype.myMethod);
     *     new public.path.Foo().myMethod();
     *
     * @param {string} publicPath Unobfuscated name to export.
     * @param {*} object Object the name should point to.
     * @param {Object=} opt_objectToExportTo The object to add the path to; default
     *     is goog.global.
     */
    function exportSymbol(publicPath: string, object: any, opt_objectToExportTo?: Object): void;

    /**
     * Exports a property unobfuscated into the object's namespace.
     * ex. goog.exportProperty(Foo, 'staticFunction', Foo.staticFunction);
     * ex. goog.exportProperty(Foo.prototype, 'myMethod', Foo.prototype.myMethod);
     * @param {Object} object Object whose static property is being exported.
     * @param {string} publicName Unobfuscated name to export.
     * @param {*} symbol Object the name should point to.
     */
    function exportProperty(object: Object, publicName: string, symbol: any): void;

    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * Usage:
     * <pre>
     * function ParentClass(a, b) { }
     * ParentClass.prototype.foo = function(a) { };
     *
     * function ChildClass(a, b, c) {
     *   ChildClass.base(this, 'constructor', a, b);
     * }
     * goog.inherits(ChildClass, ParentClass);
     *
     * var child = new ChildClass('a', 'b', 'see');
     * child.foo(); // This works.
     * </pre>
     *
     * @param {!Function} childCtor Child class.
     * @param {!Function} parentCtor Parent class.
     * @suppress {strictMissingProperties} superClass_ and base is not defined on
     *    Function.
     */
    function inherits(childCtor: Function, parentCtor: Function): void;

    /**
     * Call up to the superclass.
     *
     * If this is called from a constructor, then this calls the superclass
     * constructor with arguments 1-N.
     *
     * If this is called from a prototype method, then you must pass the name of the
     * method as the second argument to this function. If you do not, you will get a
     * runtime error. This calls the superclass' method with arguments 2-N.
     *
     * This function only works if you use goog.inherits to express inheritance
     * relationships between your classes.
     *
     * This function is a compiler primitive. At compile-time, the compiler will do
     * macro expansion to remove a lot of the extra overhead that this function
     * introduces. The compiler will also enforce a lot of the assumptions that this
     * function makes, and treat it as a compiler error if you break them.
     *
     * @param {!Object} me Should always be "this".
     * @param {*=} opt_methodName The method name if calling a super method.
     * @param {...*} var_args The rest of the arguments.
     * @return {*} The return value of the superclass method.
     * @suppress {es5Strict} This method can not be used in strict mode, but
     *     all Closure Library consumers must depend on this file.
     * @deprecated goog.base is not strict mode compatible.  Prefer the static
     *     "base" method added to the constructor by goog.inherits
     *     or ES6 classes and the "super" keyword.
     */
    function base(me: Object, opt_methodName?: any, ...var_args: any[]): any;

    /**
     * Allow for aliasing within scope functions.  This function exists for
     * uncompiled code - in compiled code the calls will be inlined and the aliases
     * applied.  In uncompiled code the function is simply run since the aliases as
     * written are valid JavaScript.
     *
     *
     * @param {function()} fn Function to call.  This function can contain aliases
     *     to namespaces (e.g. "var dom = goog.dom") or classes
     *     (e.g. "var Timer = goog.Timer").
     */
    function scope(fn: () => void): void;

    /**
     * Creates a restricted form of a Closure "class":
     *   - from the compiler's perspective, the instance returned from the
     *     constructor is sealed (no new properties may be added).  This enables
     *     better checks.
     *   - the compiler will rewrite this definition to a form that is optimal
     *     for type checking and optimization (initially this will be a more
     *     traditional form).
     *
     * @param {Function} superClass The superclass, Object or null.
     * @param {goog.defineClass.ClassDescriptor} def
     *     An object literal describing
     *     the class.  It may have the following properties:
     *     "constructor": the constructor function
     *     "statics": an object literal containing methods to add to the constructor
     *        as "static" methods or a function that will receive the constructor
     *        function as its only parameter to which static properties can
     *        be added.
     *     all other properties are added to the prototype.
     * @return {!Function} The class constructor.
     */
    function defineClass(superClass: Function, def: goog.defineClass.ClassDescriptor): Function;

    /**
     * Sealing classes breaks the older idiom of assigning properties on the
     * prototype rather than in the constructor. As such, goog.defineClass
     * must not seal subclasses of these old-style classes until they are fixed.
     * Until then, this marks a class as "broken", instructing defineClass
     * not to seal subclasses.
     * @param {!Function} ctr The legacy constructor to tag as unsealable.
     */
    function tagUnsealableClass(ctr: Function): void;

    /**
     * Name for unsealable tag property.
     * @const @private {string}
     */
    const UNSEALABLE_CONSTRUCTOR_PROPERTY_: any /*missing*/;

    /** @struct @constructor @final */
    function Transpiler(): void;

    /**
     * A debug loader is responsible for downloading and executing javascript
     * files in an unbundled, uncompiled environment.
     *
     * @struct @constructor
     */
    class DebugLoader {}

    /** @param {!goog.DebugLoader} loader */
    function registerDebugLoader(loader: goog.DebugLoader): void;
}

declare module goog.module {
    /**
     * @param {string} name The module identifier.
     * @return {?} The module exports for an already loaded module or null.
     *
     * Note: This is not an alternative to goog.require, it does not
     * indicate a hard dependency, instead it is used to indicate
     * an optional dependency or to access the exports of a module
     * that has already been loaded.
     * @suppress {missingProvide}
     */
    function get(name: string): any;

    /**
     * Provide the module's exports as a globally accessible object under the
     * module's declared name.  This is intended to ease migration to goog.module
     * for files that have existing usages.
     * @suppress {missingProvide}
     */
    function declareLegacyNamespace(): void;
}

declare module goog.defineClass {
    /**
     * @typedef {{
     *   constructor: (!Function|undefined),
     *   statics: (Object|undefined|function(Function):void)
     * }}
     */
    interface ClassDescriptor {
        constructor: Function|undefined;
        statics: Object|undefined|((_0: Function) => void);
    }
}

declare module goog.DebugLoader {
    /**
     * Whether the browser is IE9 or earlier, which needs special handling
     * for deferred modules.
     * @const @private {boolean}
     */
    const IS_OLD_IE_: any /*missing*/;
}
