const path=require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports={
    enter:{
        main:'./src',
        app:'./src/app.js',
        vendors: './src/vendors.js'
    }, 
    //enter 制定一个或多个入口起点，默认为 ./src
    output:{ 
        //output告诉webpack在哪里输出bundle文件，默认为 ./dist
        path:path.resolve(__dirname,'dist'),
        filename:"my-first-webpack.bundle.js"
    },
    module:{
        rule:[
            {
                test:/\.js$/,
                exports:'',
                 
            }
        ]
    },
    //loader 让webpack处理那些非javascript文件，loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
    modules:{
        rules:[
            {test:/\.test$/,use:'raw-loader'},
            {css:/\.css$/,use:'css-loader'}
        ]
    },
   // plugins从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
   //插件目的在于解决 loader 无法实现的其他事。
   plugins:[
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
   ]
}

    //多个target
    var serverConfig={
        target:"node",
        output:{
            path:path.resolve(__dirname,'dist'),
            filename:"sever-config.js"
        }
    }  // module.export=serverConfig


module.exports=config;