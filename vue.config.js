module.exports = {
    // publicPath:process.env.NODE_ENV === 'development' ? '/' : '/ya',
    devServer:{
//         // 设置proxy后你要代理的地址，然后真正的接口访问当前服务器
//         // 地址http://localhost
        proxy:'http://localhost:3000'
        // proxy:{
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{
        //             "^/api":'/api'
        //         }
        //     }
        // }
    }
}