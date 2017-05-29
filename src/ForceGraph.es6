import * as d3 from 'd3'

class ForceGraph {
        
    constructor(options) {
        this.size = {
            width : 960,
            height: 640
        }
        //  初始化Force
        //  位置布局
        this.posForce = null
        //  连接布局
        this.linkForce = null
        //  节点布局
        this.bodyForce = null
        //  绘制上下文
        this.context = d3.select(options.el)
        //  存放连接关系,必须先渲染，便于放在底层
        this.linkContext = this.context
                               .append("g")
                               .attr("class", "links")     
        //  存放节点
        this.nodeContext = this.context
                               .append("g")
                               .attr("class", "nodes")
         
        //  节点数据
        this.nodes = options.nodes
        //  连接数据
        this.links = options.links
        //  初始化模拟器
        this.simulation = d3.forceSimulation()
                            .nodes(this.nodes)
        //  初始化
        this.init()
    }
    
    /**
      * 初始化必要属性
      */
    init () {
        this.initPosForce()
        this.initBodyForce()
        this.initLinkForce()
        this.simulation.force('pos_force', this.posForce)
                       .force('body_force', this.bodyForce)
        //  如果存在连接布局
        if(this.linkForce) {
            this.simulation.force('link_force', this.linkForce)
            this.renderLinks()
        }
        this.renderNodes()
        //  触发调整布局
        this.simulation.on('tick.force', () => {
            this.renderNodesPos()
            this.renderLinksPos()
        })
        //  解析结束事件
        this.simulation.on('end.force', () => {
            //  初始化拖拽           
            this.initDrag()
            this.initZoom()
        })
    }    
    
}

Object.assign(ForceGraph.prototype, {
    
    /**
     *  初始化位置布局
     */
    initPosForce () {
        let cx = this.size.width / 2,
            cy = this.size.height / 2
        this.posForce = d3.forceCenter(cx, cy)
    },
    
    /**
     *  初始化节点布局
     */
    initBodyForce () {
       this.bodyForce = d3.forceManyBody().strength(-60) 
    },
    
     /**
     *  初始化连接布局
     */
    initLinkForce () {
        if(this.links !== undefined) {
            this.linkForce = d3.forceLink(this.links)
                               .distance(200)
                               .id(data => data.id)
        }        
    },
      
    /**
     *  渲染节点
     */
    renderNodes()  {
        //  所有的node节点
        this.nodeDoms = this.nodeContext
                            .selectAll("circle")
                            .data(this.nodes)
                            .enter()
                            .append("circle")
                            .attr("r", data => data.strong * 2)
                            .attr("fill", "red")        
    },
    
    renderNodesPos () {
        this.nodeDoms.attr("cx", d => d.x)          
                     .attr("cy", d => d.y)
    },
    
    /**
     *  渲染连接关系
     */
    renderLinks () {
         this.linkDoms = this.linkContext
                            .selectAll('line')
                            .data(this.links)
                            .enter()
                            .append('line')
                            .attr('stroke-width', 2)
                            .attr('stroke', 'green')
    },
    
    /**
     *  渲染连接关系的位置
     */
    renderLinksPos () {
       this.linkDoms.each(function(d) {           
           let x1 = d.source.x, 
               y1 = d.source.y, 
               x2 = d.target.x, 
               y2 = d.target.y
           //   开始节点
           if(d.source.scale !== undefined) {
                let scale = d.source.scale || 1,
                    tx = d.source.tx || 0,
                    ty = d.source.ty || 0
                x1 = x1 * scale + tx
                y1 = y1 * scale + ty               
            }
            //  结束节点   
            if(d.target.scale !== undefined) {
                let scale = d.target.scale || 1,
                    tx = d.target.tx || 0,
                    ty = d.target.ty || 0
                x2 = x2 * scale + tx
                y2 = y2 * scale + ty               
            }
            //  添加属性
            d3.select(this).attr('x1', x1)
                           .attr('y1', y1)
                           .attr('x2', x2)
                           .attr('y2', y2)
       })
    },
    
    /**
     *  初始化拖拽
     */
    initDrag () {
        let start_x, 
            start_y,
            _this = this
        //  拖拽开始
        function dragStart(d) {
            if (!d3.event.active) {
              _this.simulation.alphaTarget(0.3).restart()
            }
            //  节点必需
            d.fx = d.x
            d.fy = d.y
        }
        
        /**
          * 拖拽过程中
          */
        function dragDrag(d) {
            d.fx = d3.event.x
            d.fy = d3.event.y
        }
 
        function dragEnd(data) {
            if (!d3.event.active) {
                _this.simulation.alphaTarget(0)
            }
            data.fx = null
            data.fy = null
        }
        let dragHandler = d3.drag()
            .on('start', dragStart)
            .on('drag', dragDrag)
            .on('end', dragEnd)
        //  其所有的节点启用
        dragHandler(this.nodeDoms)
    },
    
    /**
     *  初始化缩放
     */
    initZoom () {
        let zoomHander = d3.zoom()
                           .scaleExtent([0.5, 2])
                           .on("zoom", function (data, index, els) {
                                 let transform = d3.zoomTransform(this),
                                     scale = transform.k,
                                     tx = transform.x,
                                     ty = transform.y
                                 data.scale = scale
                                 data.tx = tx
                                 data.ty = ty
                                 d3.select(this).attr("transform", transform)
                           })
        zoomHander(this.nodeDoms)
    }
    
})

export default ForceGraph