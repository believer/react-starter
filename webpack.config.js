const path = require('path')
const production = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')

const packageJSON = require('./package')

const entry = [
  './src/index'
]

if (!production) {
  entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
}

const plugins = [
  new ExtractTextPlugin('style.css', {
    allChunks: true
  }),
  new webpack.DefinePlugin({
    __GLOBAL__: JSON.stringify({
      apiEndpoint: 'http://api-loggboken.iteamdev.se',
      title: packageJSON.title
    })
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|sv/),
  new webpack.ProvidePlugin({
    //'Promise': 'es6-promise',
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
  new TransferWebpackPlugin([
    { from: 'assets/images/', to: '.' }
  ], path.join(__dirname, 'src')),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin(
    'vendor', /* chunkName= */
    'vendor.bundle.js' /* filename= */
  )
]

if (production) {
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compressor: {
        warnings: false
      }
    }))
} else {
  // const LiveReloadPlugin = require('webpack-livereload-plugin')
  // plugins.push(new LiveReloadPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const preLoaders = production ? [] : [{
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: /node_modules/
}]

const sourceMap = production ? 'sourceMap=false' : 'sourceMap=true'

const config = {
  context: __dirname,
  devtool: production ? '#eval' : '#source-map',
  entry: {
    app: entry,
    vendor: [
      'react',
      'alt',
      'react-dom',
      'react-router',
      'moment',
      'history',
      'react-css-modules',
      'alt-utils/lib/connectToStores'
    ]
  },

  postcss: [
    require('postcss-import')({
      from: 'src'
    }),
    require('postcss-css-variables'),
    require('postcss-custom-media'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')({
      zindex: false
    })
  ],

  output: {
    path: path.join(__dirname, (production ? 'out/static' : 'static')),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: plugins,

  module: {
    preLoaders: preLoaders,
    loaders: [{
      test: /\.js$/,
      loader: `babel?${sourceMap}`,
      exclude: /node_modules/,
      presets: ['es2015', 'stage-0', 'react']
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&${sourceMap}&localIdentName=[name]__[local]___[hash:base64:5]!postcss`)
    }, {
      test: /\.(jpe?g|png|gif|svg)(\?.*$|$)/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)$/i,
      loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
    }]
  },

  resolve: {
    modulesDirectories: [
      'src/assets/styles',
      'src/components',
      'node_modules',
      'src'
    ],
    extensions: ['', '.js', '.css', '.less']
  }
}

module.exports = config
