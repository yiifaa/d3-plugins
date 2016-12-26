(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3-selection'], factory) :
    (factory((global.d3 = global.d3 || {}),global.d3));
}(this, function (exports,d3) { 'use strict';

    /****/
    Object.defineProperty(d3.selection.prototype, 'length', {
        get : function() {
            return this.size()
        }
    })

    Object.defineProperty(exports, '__esModule', { value: true });

}));