var width = 960,
    height = 720,
    cx = width / 2,
    cy = height / 2,
    projection = d3.geoOrthographic()
                   .center([0, 0])
                   .translate([cx, cy])
                   .scale(width / (1 * Math.PI))
                   //.clipAngle(20)
                   .rotate([0, 0, 0]),
    path = d3.geoPath().projection(projection),
    svg = d3.select('#canvas')

const colors = ['#CDE', 'limegreen', '#CDE', '#CDE', 'orange', 'orangered', '#CDE',               'red', 'limegreen', 'orange', '#CDE'];

svg.append('g')
   .attr('class', 'grid')
   .append('path')
   .datum(d3.geoGraticule())
   .attr('class', 'graticule')
   .attr('d', path)
   .attr('stroke-width', '1px')
   .attr('stroke', '#EEE')


d3.json('worlds.json', datas => {
    let features = datas.features
    //  projection.fitExtent([[10, 10], [width - 10, height - 10]], datas)
    svg.append('g')
       .attr('class', 'map')
       .selectAll('.country')
       .data(features)
       .enter()
       .append('path')
       .attr('class', 'country')
       .attr('d', path)
       .attr('id', d => d.id)
       //.attr('fill', '#cde')
       .attr('fill', () => {
                 let index = Math.round(Math.random() * 10)
                 return d3.color(colors[index])
            })
    var i = 0,
        step = 1
    var timerId;
    function redraw() {
        let proj = projection.rotate([step * i, 0, 0]),
            path = d3.geoPath().projection(projection)
            
            //grid = d3.select('.grid')
        //grid.
        svg.select('g.map')
           .selectAll('.country')
           .data(features)
           .attr('d', path)           
        i ++
        timerId = requestAnimationFrame(redraw)
    }
    requestAnimationFrame(redraw)
    
    var animation;
    function update() {
        d3.select('h1').text(Date.now())
        animation = requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
    setTimeout(() => {
        cancelAnimationFrame(animation)
    }, 10 * 1000)
    
    
})

