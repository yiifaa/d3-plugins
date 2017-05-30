importScripts('d3.v4.min.js')

var width = 1600,
    height = 720,
    cx = width / 2,
    cy = height / 2,
    bodyForce = d3.forceManyBody().strength(-60),
    linkForce = d3.forceLink()
                  .distance(200)
                  .id(data => data.id),
    sim = d3.forceSimulation();



onmessage = function(ev) {
    var data = ev.data,
        nodes = data.nodes,
        links = data.links
    //
    linkForce.links(links)
    sim.nodes(nodes)
    sim.force('body_force', bodyForce)
       .force("center_force", d3.forceCenter(cx, cy))
       .force('link_force', linkForce)
    
    var tickHandler = function() {
        postMessage({
            nodes,
            links
        })
    }
    sim.on('tick.force', tickHandler)
    sim.on('end.force', function() {
        var max = {x : 0, y : 0},
            min = {x : 0, y : 0}
        nodes.forEach(function(item) {
            if(item.x > max.x) {
                max.x = item.x
            }
            if(item.y > max.y) {
                max.y = item.y
            }
            if(item.x < min.x) {
                min.x = item.x
            }
            if(item.y < min.y) {
                min.y = item.y
            }
        })
        postMessage({
            nodes,
            links,
            max,
            min,
            now : Date.now()
        })
    })
}