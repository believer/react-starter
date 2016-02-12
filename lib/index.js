const path = require('path')
const express = require('express')
const app = express()

const webpack = require('webpack')
const config = require('../webpack.config')
const compiler = webpack(config)

const port = process.env.PORT || 3000
const hostname = process.env.hostname || 'localhost'

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    children: false,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: true,
    chunkModules: false
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../index.html'))
})

app.listen(port, hostname, error => error ?
           console.error(error) :
           console.log(`listening at http://${hostname}:${port}`))
