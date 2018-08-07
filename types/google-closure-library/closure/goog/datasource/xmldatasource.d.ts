/// <reference path="../../../globals.d.ts"/>
/// <reference path="./datasource.d.ts"/>
/// <reference path="../uri/uri.d.ts"/>
/// <reference path="../events/event.d.ts"/>
/// <reference path="../net/xhrio.d.ts"/>

declare module 'goog:goog.ds.XmlHttpDataSource' {
    import alias = goog.ds.XmlHttpDataSource;
    export default alias;
}

declare module 'goog:goog.ds.XmlDataSource' {
    import alias = goog.ds.XmlDataSource;
    export default alias;
}

declare namespace goog.ds {
    /**
     * Data source whose backing is an xml node
     *
     * @extends {goog.ds.DataNode}
     */
    class XmlDataSource extends __XmlDataSource {}
    abstract class __XmlDataSource extends goog.ds.__DataNode {
        /**
         * @param {Node} node The XML node. Can be null.
         * @param {goog.ds.XmlDataSource} parent Parent of XML element. Can be null.
         * @param {string=} opt_name The name of this node relative to the parent node.
         *
         */
        constructor(node: Node, parent: goog.ds.XmlDataSource, opt_name?: string);

        /**
         * Set the current root nodeof the data source.
         * Can be an attribute node, text node, or element node
         * @param {Node} node The node. Can be null.
         *
         * @private
         */
        private setNode_(node: Node): void;

        /**
         * Creates the DataNodeList with the child nodes for this element.
         * Allows for only building list as needed.
         *
         * @private
         */
        private createChildNodes_(): void;

        /**
         * Creates the DataNodeList with the attributes for the element
         * Allows for only building list as needed.
         *
         * @private
         */
        private createAttributes_(): void;
    }

    /**
     * Data source whose backing is an XMLHttpRequest,
     *
     * A URI of an empty string will mean that no request is made
     * and the data source will be a single, empty node.
     *
     * @extends {goog.ds.XmlDataSource}
     * @final
     */
    class XmlHttpDataSource extends __XmlHttpDataSource {}
    abstract class __XmlHttpDataSource extends goog.ds.__XmlDataSource {
        /**
         * @param {(string|goog.Uri)} uri URL of the XMLHttpRequest.
         * @param {string} name Name of the datasource.
         *
         * implements goog.ds.XmlHttpDataSource.
         */
        constructor(uri: string|goog.Uri, name: string);

        /**
         * Default load state is NOT_LOADED
         * @private
         */
        private loadState_: any /*missing*/;

        /**
         * Handles the completion of an XhrIo request. Dispatches to success or load
         * based on the result.
         * @param {!goog.events.Event} e The XhrIo event object.
         * @private
         */
        private complete_(e: goog.events.Event): void;

        /**
         * Success result. Checks whether valid XML was returned
         * and sets the XML and loadstate.
         *
         * @param {!goog.net.XhrIo} xhr The successful XhrIo object.
         * @private
         */
        private success_(xhr: goog.net.XhrIo): void;

        /**
         * Failure result
         *
         * @private
         */
        private failure_(): void;
    }
}

declare namespace goog.ds.XmlDataSource {
}
