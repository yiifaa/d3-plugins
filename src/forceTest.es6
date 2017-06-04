import ForceGraph from './ForceGraph.es6'

let nodes = [{
    id : 1, 
    username : '蔡英文',
    strong: 15,
    url : '1.jpg'
}, {
    
    id : 2, 
    username : '陈水扁',
    strong: 10,
    url : '2.jpg'
}, {
    id : 3, 
    username : '李登辉',
    strong: 10,
    url : '3.jpeg'
}, {
    id : 4, 
    username : '柯文哲',
    strong: 8,
    url : '4.jpg'
}, {
    id : 5, 
    username : '何智辉',
    strong: 8,
    url : '5.jpg'
}, {
    id : 6, 
    username : '郝柏村',
    strong: 8,
    url : '6.jpg'
}, {
    id : 7, 
    username : '郁慕明',
    strong: 8,
    url : '7.jpg'
}, {
    id : 8, 
    username : '马英九',
    strong: 5,
    url : '8.jpeg'
}, {
    id : 9, 
    username : '宋楚瑜',
    strong: 5,
    url : '9.jpg'
}, {
    id : 10, 
    username : '吕秀莲',
    strong: 5,
    url : '10.png'
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
    //links,
    startTime: Date.now()
})