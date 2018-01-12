import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import NodeExternals from 'webpack-node-externals'

var clientConfig = () => ({
  entry: './src/client.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.client.js'
  },
  module: {
      rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.html$/, loader: 'html-loader' }
      ]
  },
  devtool: 'source-map',
  devServer: {
      contentBase: './dist'
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      })
  ]
})

var serverConfig = () => ({ 
    entry: './src/server.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.server.js'
    },
    module: {
      rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    target: 'node',   
    node: {
        __dirname: false
    }, 
    externals: [ new NodeExternals() ]
})

export default [ clientConfig, serverConfig ]
