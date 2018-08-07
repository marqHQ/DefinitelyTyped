/// <reference path="../../../globals.d.ts"/>
/// <reference path="./testcase.d.ts"/>

declare module 'goog:goog.testing.ShardingTestCase' {
    import alias = goog.testing.ShardingTestCase;
    export default alias;
}

declare namespace goog.testing {
    /**
     * A test case that runs tests in per-file shards.
     * @extends {goog.testing.TestCase}
     * @final
     */
    class ShardingTestCase extends __ShardingTestCase {}
    abstract class __ShardingTestCase extends goog.testing.__TestCase {
        /**
         * @param {number} shardIndex Shard index for this page,
         *     <strong>1-indexed</strong>.
         * @param {number} numShards Number of shards to split up test cases into.
         * @param {string=} opt_name The name of the test case.
         */
        constructor(shardIndex: number, numShards: number, opt_name?: string);

        /**
         * @type {number}
         * @private
         */
        private shardIndex_: number;

        /**
         * @type {number}
         * @private
         */
        private numShards_: number;

        /**
         * Whether we've actually partitioned the tests yet. We may execute twice
         * ('Run again without reloading') without failing.
         * @type {boolean}
         * @private
         */
        private sharded_: boolean;
    }
}

declare namespace goog.testing.ShardingTestCase {
    /**
     * Shards tests based on the test filename. Assumes that the filename is
     * formatted like 'foo_1of5_test.html'.
     * @param {string=} opt_name A descriptive name for the test case.
     */
    function shardByFileName(opt_name?: string): void;
}
