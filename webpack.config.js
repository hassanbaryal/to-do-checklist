const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    }, 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].main.js',
        clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Checklist',
        filename: 'index.html',
        template: './src/template.html',
      })  
    ],
}