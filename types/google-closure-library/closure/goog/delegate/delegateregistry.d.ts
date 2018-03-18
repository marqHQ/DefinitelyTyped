/// <reference path="../../../globals.d.ts"/>

declare namespace DelegateRegistry {
    /**
     * A delegate registry that allows multiple delegates, which must each have a
     * numeric priority specified when they are registered.  Iteration will start
     * with the highest number and proceed to the lowest number.  If two delegates
     * are added with the same priority, an error will be given in debug mode.
     * @see DelegateRegistry
     *
     * @extends {DelegateRegistryBase<T>}
     * @template T
     */
    let Prioritized: any /*missing*/;
}
