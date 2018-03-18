import './closure/goog/array/array';
import './closure/goog/object/object';

goog.array.last([1, 2, 3]); // $ExpectType number
goog.object.clone({a: 1, b: '2'}); // $ExpectType {a:number, b:string}
