import * as d3 from 'd3'


let datas = [{
    id : 1, 
    username : '蔡英文',
    strong: 15
}, {
    
    id : 2, 
    username : '陈水扁',
    strong: 10
}, {
    id : 3, 
    username : '李登辉',
    strong: 10
}, {
    id : 4, 
    username : '柯文哲',
    strong: 8
}, {
    id : 5, 
    username : '何智辉',
    strong: 8
}, {
    id : 6, 
    username : '郝柏村',
    strong: 8
}, {
    id : 7, 
    username : '郁慕明',
    strong: 8
}, {
    id : 8, 
    username : '马英九',
    strong: 5
}, {
    id : 9, 
    username : '宋楚瑜',
    strong: 5
}, {
    id : 10, 
    username : '吕秀莲',
    strong: 5
}]

let link_data = [{
    source : 1,
    target : 3
}, {
    source : 1,
    target : 2
}, {
    source : 1,
    target : 4
}, {
    source : 2,
    target : 5
}, {
    source : 2,
    target : 6
}, {
    source : 2,
    target : 7
}, {
    source : 3,
    target : 8
}, {
    source : 3,
    target : 9
}, {
    source : 3,
    target : 10
}]

let width = 960,
    height = 640,
    cx = width / 2,
    cy = height / 2,
    bodyForce = d3.forceManyBody().strength(-60),
    linkForce = d3.forceLink(link_data)
                  .distance(200)
                  .id(data => data.id),
    sim = d3.forceSimulation()
            .nodes(datas),
            
    svg = d3.select('#canvas')

sim.force('body_force', bodyForce) 
    
   .force("center_force", d3.forceCenter(cx, cy))
.force('links', linkForce)
            //.force('links', linkForce)

let links = svg.append('g')
               .attr('class', 'links')
               .selectAll('line')
               .data(link_data)
               .enter()
               .append('line')
               .attr('stroke-width', 2)
               .attr('stroke', 'green')
            
let nodes = svg.append("g")
               .attr("class", "nodes")
               .selectAll("circle")
               .data(datas)
               .enter()
               .append("circle")
               .attr("r", data => data.strong * 2)
               .attr("fill", "red")



let tickAction = function() {
    //  console.log(nodes.size())
    nodes
        .attr("cx", function(d) {
            return d.x; 
        })
        .attr("cy", function(d) { return d.y; })
    
    links.attr('x1', d => d.source.x)
         .attr('y1', d => d.source.y)
         .attr('x2', d => d.target.x)
         .attr('y2', d => d.target.y)
    /**
    links.attr('x1', d => {
        if(d.source.scale !== undefined) {
            let scale = d.source.scale || 1,
                tx = d.source.tx || 0,
                ty = d.source.ty || 0,
                x = d.source.x,
                rx = x * scale + tx 
            return rx
        }
        return d.source.x
    })
    .attr('y1', d => {
        if(d.source.scale !== undefined) {
            let scale = d.source.scale || 1,
                    tx = d.source.tx || 0,
                    ty = d.source.ty || 0,
                    x = d.source.x,
                    y = d.source.y,
                    ry = y * scale + ty 
                return ry
        }
        return d.source.y
    })
         .attr('x2', d => {
        if(d.target.scale !== undefined) {
            let scale = d.target.scale || 1,
                    tx = d.target.tx || 0,
                    ty = d.target.ty || 0,
                    x = d.target.x,
                    y = d.target.y,
                    rx = x * scale + tx
                return rx
        }
        return d.target.x
    })
         .attr('y2', d => {
        if(d.target.scale !== undefined) {
            let scale = d.target.scale || 1,
                    tx = d.target.tx || 0,
                    ty = d.target.ty || 0,
                    x = d.target.x,
                    y = d.target.y,
                    ry = y * scale + ty 
                return ry
        }
        return d.target.y
    })
    **/
}



sim.on('tick.nodes', tickAction)
sim.on('end.nodes', () => {
    //  console.log(arguments)
    console.log(sim.alpha(), sim.alphaTarget())
})

let start_x, start_y 
function drag_start(d) {
  if (!d3.event.active) sim.alphaTarget(0.3).restart();

  d.fx = d.x;
  d.fy = d.y;
}
 
function drag_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;

  /**
  d.fx = d.fx + (d3.event.x - d.fx) / scale
  d.fy = d.fy + (d3.event.y - d.fy) / scale
  **/
  /**
  .attr("cx", d.x = start_x + ((d3.event.x - start_x) / current_scale) )
        .attr("cy", d.y = start_y + ((d3.event.y - start_y) / current_scale));
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  **/
}
 
function drag_end(data) {
  if (!d3.event.active) sim.alphaTarget(0);
  data.fx = null;
  data.fy = null;
    /**
    if(data.transform) {
        d3.select(this).attr('transform', data.transform)
    }
    **/
    /**
    let s = data.scale || 1,
        x = data.tx || 0,
        y = data.ty || 0
     
    zoom.scaleTo(d3.select(this), s)
    zoom.translateBy(d3.select(this), x, y)
    **/
   
}
var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);
drag_handler(nodes)

/****/
var zoom = d3.zoom()
var zoom_handler = zoom.scaleExtent([0.5, 2])
    .on("zoom", zoom_actions);

function zoom_actions(data, index, otherEl){
    //  指向当前结点
    var transform = d3.zoomTransform(this),
        scale = transform.k,
        tx = transform.x,
        ty = transform.y
    data.scale = scale
    data.tx = tx
    data.ty = ty
    d3.select(this).attr("transform", transform)
    //d3.select(this).attr("transform", d3.event.transform)
    //console.log(this)
    //console.log(d3.event)
  //circles.attr("transform", d3.event.transform);
}
zoom_handler(nodes)



setTimeout(() => {      
    datas.push( {
        id : 11,
        username : '魏道明',
        strong: 5,
        x : cx,
        y : cy
    })   
    link_data.push({
        source: 1,
        target: 11
    })
    svg.select('g.nodes')
       .selectAll('circle')
       .data(datas)
       .enter()
       .append("circle")
       .attr("r", data => data.strong * 2)
       .attr("fill", "red")
    svg.select('g.links')
       .selectAll('line')
       .data(link_data)
       .enter()
       .append('line')
       .attr('stroke-width', 2)
       .attr('stroke', 'green')
    
    nodes = svg.select('g.nodes').selectAll('circle')
    links = svg.select('g.links').selectAll('line')
    //  添加节点
    
    sim.nodes(datas)
    //linkForce.force(0.5)
    //linkForce.initialize(datas)
    linkForce.links(link_data)
    //sim.force('links', linkForce)
    sim.alpha(0.3).restart()
    //sim.restart()
}, 5000)
