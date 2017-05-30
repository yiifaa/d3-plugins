var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    src = path.resolve(__dirname, '../src'),
    build = path.resolve(__dirname, '../build')

module.exports = {
    
    entry : {
        graph: './src/graph.es6',
        force: './src/forceTest.es6',
        world: './src/world.es6'
    },
   
    
    output : {
        filename : '[name].js',
        //  不可配置为绝对路径
        //publicPath: "http://localhost:8080/dist/",
        publicPath: "/dist/",
        path : build,
        //  umd包含了对amd、commonjs、var等多种规范的支持  
        libraryTarget : 'var'  
    },
    
     externals: {
        'd3' : 'd3'
      },
     
    devtool: '#source-map',
    
    devServer: {
        inline: true    
    },   
    
    module: {
        loaders: [
            /* ES6编译 */
            {
                test: /\.es6$/,                
                include: src,
                exclude: /(node_modules|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                        //presets: ['env'],
                        //plugins: ['transform-runtime']
                    }
                }
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader?sourceMap"
                }, {
                    loader: "sass-loader?sourceMap",
                    options: {
                        //  includePaths: ["absolute/path/a", "absolute/path/b"]
                        sourceMap: true,
                        sourceMapContents: true,
                        sourceMapEmbed: true
                    }
                }]
        }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(html|tpl)$/,
                loader: "html-loader"
            }
        ]
    },   
   
    resolve: {
    }
}