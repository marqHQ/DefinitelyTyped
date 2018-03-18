/// <reference path="../../../../../globals.d.ts"/>

declare namespace exports {
    /**
     * History:
     *
     * IE11 is still using Trident, the traditional engine for IE.
     * Edge is using EdgeHTML, a fork of Trident. We are seeing the same issue
     * on IE-11 (reported in 2017), so treat IE the same as Edge for now.
     *
     * We used to do polling for Opera (only) with an 250ms interval, because Opera
     * only fires readyState == INTERACTIVE once. Opera switched to WebKit in 2013,
     * and then to Blink (chrome).
     *
     * TODO(user): check the raw UA string to keep polling for old, mobile operas
     * that may still be affected. For old Opera, double the polling interval
     * to 250ms.
     *
     * @return {boolean} True if polling is required with XHR.
     */
    function isPollingRequired(): boolean;

    /**
     * How often to poll (in MS) for changes to responseText in browsers that don't
     * fire onreadystatechange during incremental loading of the response body.
     *
     * @return {number|undefined} The polling interval (MS) for the current U-A;
     * or undefined if polling is not supposed to be enabled.
     */
    function getPollingInterval(): number|undefined;
}
