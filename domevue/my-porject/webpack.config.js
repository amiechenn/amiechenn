var path = require('path')
var webpack = require('webpack')
var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: './src/main.js',//值可以是字符串、数组或对象
    output: {
        path: path.resolve(__dirname, './src'),//Webpack结果存储
        publicPath: './',//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: 'build.js'
    },
     plugins: [
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './src/assets/icon'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './src/assets/sprites/sprite.png'),
                css: path.resolve(__dirname, './src/assets/sprites/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
            //自己加的
            ,
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
            ,
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader!"
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'assets': path.resolve(__dirname, './static'), 
        }
    },
    devServer: {//webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true//实时刷新
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

