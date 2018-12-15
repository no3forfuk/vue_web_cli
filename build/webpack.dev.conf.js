const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//模拟数据后台服务器
const express = require('express');
const app = express();

const router = express.Router();

const apiRouter = express.Router();

app.use(router);
app.use('/api', apiRouter);
module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html', filename: 'index.html'}),
    ],
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        contentBase: './dist',
        before(app) {
            const bodyParser = require('body-parser');
            const rp = require('request-promise');
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());
            // var baseUrl = 'http://test.bantangtv.com';
            var baseUrl = 'http://www.redhorsehe.com';
            const go = function (requset, response) {
                var method = requset.method;
                var options;
                if (method == 'GET') {
                    options = {
                        "method": method,
                        "qs": requset.query,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": requset.headers
                    }
                }
                if (method == 'POST') {
                    options = {
                        "method": method,
                        "body": requset.body,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": requset.headers
                    }
                }
                rp(options).then(data => {
                    response.json(data)
                }).catch(err => {
                    throw err;
                })
            }
        },
        // proxy: {
        //     '/api': {  //使用"/api"来代替"http://f.apiplus.c"
        //         target: 'http://47.99.223.173:8080', //源地址
        //         changeOrigin: true, //改变源
        //         pathRewrite: {
        //             '^/api': 'http://47.99.223.173:8080' //路径重写
        //         }
        //     }
        // },
    }
})