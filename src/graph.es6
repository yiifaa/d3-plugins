import * as d3 from 'd3-selection'

/****/
Object.defineProperty(d3.selection.prototype, 'length', {
    get : function() {
        return this.size()
    }
})

export default d3