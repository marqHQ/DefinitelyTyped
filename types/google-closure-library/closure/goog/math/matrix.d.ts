/// <reference path="../../../globals.d.ts"/>
/// <reference path="./size.d.ts"/>

declare module 'goog:goog.math.Matrix' {
    import alias = goog.math.Matrix;
    export default alias;
}

declare namespace goog.math {
    /**
     * Class for representing and manipulating matrices.
     *
     * The entry that lies in the i-th row and the j-th column of a matrix is
     * typically referred to as the i,j entry of the matrix.
     *
     * The m-by-n matrix A would have its entries referred to as:
     *   [ a0,0   a0,1   a0,2   ...   a0,j  ...  a0,n ]
     *   [ a1,0   a1,1   a1,2   ...   a1,j  ...  a1,n ]
     *   [ a2,0   a2,1   a2,2   ...   a2,j  ...  a2,n ]
     *   [  .      .      .            .          .   ]
     *   [  .      .      .            .          .   ]
     *   [  .      .      .            .          .   ]
     *   [ ai,0   ai,1   ai,2   ...   ai,j  ...  ai,n ]
     *   [  .      .      .            .          .   ]
     *   [  .      .      .            .          .   ]
     *   [  .      .      .            .          .   ]
     *   [ am,0   am,1   am,2   ...   am,j  ...  am,n ]
     *
     * @struct
     * @final
     */
    class Matrix extends __Matrix {}
    abstract class __Matrix {
        /**
         * @param {!goog.math.Matrix|!Array<!Array<number>>|!goog.math.Size|number} m
         *     A matrix to copy, a 2D-array to take as a template, a size object for
         *     dimensions, or the number of rows.
         * @param {number=} opt_n Number of columns of the matrix (only applicable if
         *     the first argument is also numeric).
         */
        constructor(m: goog.math.Matrix|number[][]|goog.math.Size|number, opt_n?: number);

        /**
         * Internal array representing the matrix.
         * @type {!Array<!Array<number>>}
         * @private
         */
        private array_: number[][];

        /**
         * After construction the Matrix's size is constant and stored in this object.
         * @type {!goog.math.Size}
         * @private
         */
        private size_: goog.math.Size;

        /**
         * Returns a new matrix that is the sum of this and the provided matrix.
         * @param {goog.math.Matrix} m The matrix to add to this one.
         * @return {!goog.math.Matrix} Resultant sum.
         */
        add(m: goog.math.Matrix): goog.math.Matrix;

        /**
         * Appends the given matrix to the right side of this matrix.
         * @param {goog.math.Matrix} m The matrix to augment this matrix with.
         * @return {!goog.math.Matrix} A new matrix with additional columns on the
         *     right.
         */
        appendColumns(m: goog.math.Matrix): goog.math.Matrix;

        /**
         * Appends the given matrix to the bottom of this matrix.
         * @param {goog.math.Matrix} m The matrix to augment this matrix with.
         * @return {!goog.math.Matrix} A new matrix with added columns on the bottom.
         */
        appendRows(m: goog.math.Matrix): goog.math.Matrix;

        /**
         * Returns whether the given matrix equals this matrix.
         * @param {goog.math.Matrix} m The matrix to compare to this one.
         * @param {number=} opt_tolerance The tolerance when comparing array entries.
         * @return {boolean} Whether the given matrix equals this matrix.
         */
        equals(m: goog.math.Matrix, opt_tolerance?: number): boolean;

        /**
         * Returns the determinant of this matrix.  The determinant of a matrix A is
         * often denoted as |A| and can only be applied to a square matrix.
         * @return {number} The determinant of this matrix.
         */
        getDeterminant(): number;

        /**
         * Returns the inverse of this matrix if it exists or null if the matrix is
         * not invertible.
         * @return {goog.math.Matrix} A new matrix which is the inverse of this matrix.
         */
        getInverse(): goog.math.Matrix;

        /**
         * Transforms this matrix into reduced row echelon form.
         * @return {!goog.math.Matrix} A new matrix reduced row echelon form.
         */
        getReducedRowEchelonForm(): goog.math.Matrix;

        /**
         * @return {!goog.math.Size} The dimensions of the matrix.
         */
        getSize(): goog.math.Size;

        /**
         * Return the transpose of this matrix.  For an m-by-n matrix, the transpose
         * is the n-by-m matrix which results from turning rows into columns and columns
         * into rows
         * @return {!goog.math.Matrix} A new matrix A^T.
         */
        getTranspose(): goog.math.Matrix;

        /**
         * Retrieves the value of a particular coordinate in the matrix or null if the
         * requested coordinates are out of range.
         * @param {number} i The i index of the coordinate.
         * @param {number} j The j index of the coordinate.
         * @return {?number} The value at the specified coordinate.
         */
        getValueAt(i: number, j: number): number|null;

        /**
         * @return {boolean} Whether the horizontal and vertical dimensions of this
         *     matrix are the same.
         */
        isSquare(): boolean;

        /**
         * Sets the value at a particular coordinate (if the coordinate is within the
         * bounds of the matrix).
         * @param {number} i The i index of the coordinate.
         * @param {number} j The j index of the coordinate.
         * @param {number} value The new value for the coordinate.
         */
        setValueAt(i: number, j: number, value: number): void;

        /**
         * Performs matrix or scalar multiplication on a matrix and returns the
         * resultant matrix.
         *
         * Matrix multiplication is defined between two matrices only if the number of
         * columns of the first matrix is the same as the number of rows of the second
         * matrix. If A is an m-by-n matrix and B is an n-by-p matrix, then their
         * product AB is an m-by-p matrix
         *
         * Scalar multiplication returns a matrix of the same size as the original,
         * each value multiplied by the given value.
         *
         * @param {goog.math.Matrix|number} m Matrix/number to multiply the matrix by.
         * @return {!goog.math.Matrix} Resultant product.
         */
        multiply(m: goog.math.Matrix|number): goog.math.Matrix;

        /**
         * Returns a new matrix that is the difference of this and the provided matrix.
         * @param {goog.math.Matrix} m The matrix to subtract from this one.
         * @return {!goog.math.Matrix} Resultant difference.
         */
        subtract(m: goog.math.Matrix): goog.math.Matrix;

        /**
         * @return {!Array<!Array<number>>} A 2D internal array representing this
         *     matrix.  Not a clone.
         */
        toArray(): number[][];

        /**
         * Returns the signed minor.
         * @param {number} i The row index.
         * @param {number} j The column index.
         * @return {number} The cofactor C[i,j] of this matrix.
         * @private
         */
        private getCofactor_(i: number, j: number): number;

        /**
         * Returns the determinant of this matrix.  The determinant of a matrix A is
         * often denoted as |A| and can only be applied to a square matrix.  Same as
         * public method but without validation.  Implemented using Laplace's formula.
         * @return {number} The determinant of this matrix.
         * @private
         */
        private getDeterminant_(): number;

        /**
         * Returns the determinant of the submatrix resulting from the deletion of row i
         * and column j.
         * @param {number} i The row to delete.
         * @param {number} j The column to delete.
         * @return {number} The first minor M[i,j] of this matrix.
         * @private
         */
        private getMinor_(i: number, j: number): number;

        /**
         * Returns a submatrix contained within this matrix.
         * @param {number} i1 The upper row index.
         * @param {number} j1 The left column index.
         * @param {number=} opt_i2 The lower row index.
         * @param {number=} opt_j2 The right column index.
         * @return {!goog.math.Matrix} The submatrix contained within the given bounds.
         * @private
         */
        private getSubmatrixByCoordinates_(i1: number, j1: number, opt_i2?: number, opt_j2?: number): goog.math.Matrix;

        /**
         * Returns a new matrix equal to this one, but with row i and column j deleted.
         * @param {number} i The row index of the coordinate.
         * @param {number} j The column index of the coordinate.
         * @return {!goog.math.Matrix} The value at the specified coordinate.
         * @private
         */
        private getSubmatrixByDeletion_(i: number, j: number): goog.math.Matrix;

        /**
         * Returns whether the given coordinates are contained within the bounds of the
         * matrix.
         * @param {number} i The i index of the coordinate.
         * @param {number} j The j index of the coordinate.
         * @return {boolean} The value at the specified coordinate.
         * @private
         */
        private isInBounds_(i: number, j: number): boolean;

        /**
         * Matrix multiplication is defined between two matrices only if the number of
         * columns of the first matrix is the same as the number of rows of the second
         * matrix. If A is an m-by-n matrix and B is an n-by-p matrix, then their
         * product AB is an m-by-p matrix
         *
         * @param {goog.math.Matrix} m Matrix to multiply the matrix by.
         * @return {!goog.math.Matrix} Resultant product.
         * @private
         */
        private matrixMultiply_(m: goog.math.Matrix): goog.math.Matrix;

        /**
         * Scalar multiplication returns a matrix of the same size as the original,
         * each value multiplied by the given value.
         *
         * @param {number} m number to multiply the matrix by.
         * @return {!goog.math.Matrix} Resultant product.
         * @private
         */
        private scalarMultiply_(m: number): goog.math.Matrix;

        /**
         * Swaps two rows.
         * @param {number} i1 The index of the first row to swap.
         * @param {number} i2 The index of the second row to swap.
         * @private
         */
        private swapRows_(i1: number, i2: number): void;
    }
}

declare namespace goog.math.Matrix {
    /**
     * Creates a square identity matrix. i.e. for n = 3:
     * <pre>
     * [ 1 0 0 ]
     * [ 0 1 0 ]
     * [ 0 0 1 ]
     * </pre>
     * @param {number} n The size of the square identity matrix.
     * @return {!goog.math.Matrix} Identity matrix of width and height `n`.
     */
    function createIdentityMatrix(n: number): goog.math.Matrix;

    /**
     * Calls a function for each cell in a matrix.
     * @param {goog.math.Matrix} matrix The matrix to iterate over.
     * @param {function(this:T, number, number, number, !goog.math.Matrix)} fn
     *     The function to call for every element. This function
     *     takes 4 arguments (value, i, j, and the matrix)
     *     and the return value is irrelevant.
     * @param {T=} opt_obj The object to be used as the value of 'this'
     *     within `fn`.
     * @template T
     */
    function forEach<T>(
        matrix: goog.math.Matrix,
        fn: (this: T, _0: number, _1: number, _2: number, _3: goog.math.Matrix) => void,
        opt_obj?: T
    ): void;

    /**
     * Tests whether an array is a valid matrix.  A valid array is an array of
     * arrays where all arrays are of the same length and all elements are numbers.
     * @param {!Array<!Array<number>>} arr An array to test.
     * @return {boolean} Whether the array is a valid matrix.
     */
    function isValidArray(arr: number[][]): boolean;

    /**
     * Calls a function for every cell in a matrix and inserts the result into a
     * new matrix of equal dimensions.
     * @param {!goog.math.Matrix} matrix The matrix to iterate over.
     * @param {function(this:T, number, number, number, !goog.math.Matrix): number}
     *     fn The function to call for every element. This function
     *     takes 4 arguments (value, i, j and the matrix)
     *     and should return a number, which will be inserted into a new matrix.
     * @param {T=} opt_obj The object to be used as the value of 'this'
     *     within `fn`.
     * @return {!goog.math.Matrix} A new matrix with the results from `fn`.
     * @template T
     */
    function map<T>(
        matrix: goog.math.Matrix,
        fn: (this: T, _0: number, _1: number, _2: number, _3: goog.math.Matrix) => number,
        opt_obj?: T
    ): goog.math.Matrix;
}
