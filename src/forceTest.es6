import ForceGraph from './ForceGraph.es6'

let nodes = [{
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

let links = [{
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

let forceGrapth = new ForceGraph({
    el: '#canvas',
    nodes,
    links
})