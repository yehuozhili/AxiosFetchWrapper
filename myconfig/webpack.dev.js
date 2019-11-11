const path = require('path');
module.exports={
    mode:'development',
    devServer:{
        port :3002,//端口
        compress :true, //gzip提升速度
        contentBase:path.resolve(__dirname,'../dist')//启动服务会在dist下
    }
}
