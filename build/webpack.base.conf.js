const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        // 省略扩展名，比方说import index from '../js/index'会默认去找index文件，然后找index.js,index.vue,index.json文件
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
        // 使用别名  使用上面的resolve函数，意思就是用@代替src的绝对路径
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name: 'image/[name][hash].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                // use: ['css-loader'] vue-style-loader!
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ['css-loader', 'less-loader']
                })
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}