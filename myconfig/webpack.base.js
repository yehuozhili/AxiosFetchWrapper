const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin= require('html-webpack-plugin');

module.exports = (env) => {
    let isdev = env.development;
    const base = {
        entry: path.resolve(__dirname, '../src/index.js'),
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'../dist')
        },
        plugins:[
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/index.html'),
                filename:'index.html',
                minify:!isdev && {
                    removeAttributeQuotes:true,
                    collapseWhitespace:true
                }
            })
        ]
    }    
    if(isdev){
        return merge(base,dev);
    }else{
        return merge(base,prod);
    }
}
