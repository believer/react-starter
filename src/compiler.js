var babel = require('babel-core');
var fs = require('fs');
var origJs = require.extensions['.js'];

function transform (filename) {
  var content = fs.readFileSync(filename, 'utf8');
  return babel.transform(content, {
    'presets':  ['es2015', 'stage-0', 'react']
  }).code;
}

// Install the compiler.
require.extensions['.js'] = function (module, filename) {
  // optimization: code in a distribution should never go through JSX compiler.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }

  return module._compile(transform(filename), filename);
};

require.extensions['.css'] = function () {
  return null;
};
