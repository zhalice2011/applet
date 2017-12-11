
const { resolve } = require('path')
const r = url => resolve(__dirname,url)
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename:'[name].wxss'
})

const config = require('../config')

//暴露出去 需要配置的参数
module.exports= {
    devtool:false,
    output:{
        path:config.assetsPath,
        filename:'[name].js'
    },
    resolve: {
        alias:{
            utils:r('../utils/utils')
        }
    },
    module:{
        rules:[
            {
                test: /\.js$/,   //正则匹配所有js文件
                loader:'babel-loader',  //使用babel-loader进行编译
                exclude:/node_modules/, //排除node_modules不进行编译
                options: {
                    presets: [
                        'latest'  //最新的
                    ]
                }
            },
            {
                test: /\.sass$/,   //正则匹配所有sass文件
                use:extractSass.extract({
                    use:[
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'postcss-loader',
                            options:{
                                plugins:(loader)=>[
                                    require('autoprefixer')({ //自动加上前缀
                                        browsers:[
                                            'last 2 versions' //最新的2个版本
                                        ]

                                    })
                                ]
                            }
                        },
                        {
                            loader:'sass-loader',
                            options:{
                                indentedSyntax:true //缩进
                            }

                        }
                    ],
                    fallback:'style-loader'
                }),   //使用一个插件
            },
            {
                test: /\.mina$/,   //正则匹配所有js文件
                loader:'wechat-mina-loader',  //使用babel-loader进行编译
                options: {
                    dist:'./mina'
                }
            }
            
        ]
    },
    plugins:[ //插件
        extractSass,
        new CopyWebpackPlugin([
            {
                from : {
                  glob: 'pages/**/*.json',
                  to: ''
                } 
            }, 
            {
                from: 'static',
                to: 'static'
            }
            // {
            //     from :{
            //         glob:'pages/**/*.json', //pages下面的任意的json文件
            //         to:''
            //     }
            // },
            // {
            //     from :{  //将static下面的文件都复制到static
            //         static:'static', //pages下面的任意的json文件
            //         to:'static'   //复制到static
            //     }
            // },
            
        ]),
        new webpack.optimize.ModuleConcatenationPlugin(),//文件合并
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:false  //不生成sourceMap
        }),
        new ProgressPlugin() //进度条
    ]
}