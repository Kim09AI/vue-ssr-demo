const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: process.env.NODE_ENV || 'development',
    target: 'node',
    devtool: 'source-map',
    entry: {
        app: './src/entry-server.js'
    },
    output: {
        filename: 'server.bundle.js',
        // 使用module.exports的方式导出模块
        libraryTarget: 'commonjs2'
    },
    // 防止某些import的模块打包进bundle中，因为serverBundle运行在服务端，可以直接require，提升打包效率
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(css|styl|stylus)$/,
                // 服务端不处理css
                loader: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
            isServer: 'true',
            isClient: 'false'
        })
    ]
})
