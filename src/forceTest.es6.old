var worker = new Worker('/ForceWorker.js')
var nodes = [],
    links = []

for(var i = 0, len = 300000; i < len; i ++) {
    nodes.push({
        id : i,
        name : 'user-' + i,
        strong : 5
    })
    let source = Math.floor(Math.random() * i) || 1,
        target = Math.floor(Math.random() * len) || len
    
    links.push({
        source,
        target
    })
}

nodes.push({
    id : len, 
    username : '蔡英文',
    strong: 15
})

worker.postMessage({
    nodes,
    links
})
var svg = d3.select('#canvas'),
    now = Date.now().valueOf(),
    init = false


worker.onmessage = function(event) {
    var nodes = event.data.nodes,
        links = event.data.links,
        min = event.data.min,
        com = event.data.now,
        max = event.data.max,
        index = 0,
        num = 10000, 
        len = 10
    
    
    
    
    //  加载完成了
    if(min && max) {
        var width = max.x - min.x,
            height = max.y - min.y;
        svg.attr('width', width)
        svg.attr('height', height)
        svg.attr('viewBox', min.x + ',' + min.y + ',' + width + ',' + height)
        console.log('layoutTime', com - now)
        // viewport
        console.log(width, height)
        
        var  linkDoms = svg.append('g')
                   .attr('class', 'links')
                   .selectAll('line')
                   .data(links)
                   .enter()
                   .append('line')
                   .attr('stroke-width', 2)
                   .attr('stroke', 'green'),
            nodeDoms = svg.append("g")
                       .attr("class", "nodes")
                       .selectAll("circle")
                       .data(nodes)
                       .enter()
                       .append("circle")
                       .attr("r", data => data.strong * 2)
                       .attr("fill", "red");
            nodeDoms.data(nodes).attr("cx", function(d) {
                return d.x; 
            })
            .attr("cy", function(d) { return d.y; })

            //
            linkDoms.data(links).attr('x1', d => d.source.x)
                 .attr('y1', d => d.source.y)
                 .attr('x2', d => d.target.x)
                 .attr('y2', d => d.target.y)
        console.log(Date.now().valueOf() - now)
        //
        
    }
    
    
}