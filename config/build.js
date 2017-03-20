const merge = require('deepmerge');
const path = require('path');

let tmpPath = 'tmp';
let distPath = 'dist';

let jsConfig =  require('./plugin/javascript');

jsConfig.transform.push(['babelify', {
  presets: ['es2015']
}]);

jsConfig.transform.push(['uglifyify', {
  global: true
}]);

module.exports = {
  componentRoot: 'src',
  componentManifest: 'component.json',
  plugins: {
    js: {
      module: require('stromboli-plugin-javascript'),
      config: jsConfig,
      entry: 'index.js',
      output: 'wide-event.js'
    },
    css: {
      module: require('stromboli-plugin-sass'),
      config: merge({}, require('./plugin/sass'), {
        sourceMap: false,
        sourceComments: false
      }),
      entry: 'index.scss',
      output: 'wide-event.css'
    },
    html: {
      module: require('stromboli-plugin-twig'),
      config: merge({}, require('./plugin/twig')),
      entry: 'index.twig'
    }
  },
  postcss: {
    plugins: [
      require('cssnano')({
        discardDuplicates: true
      }),
      require('postcss-copy')({
        src: path.resolve('.'),
        dest: distPath,
        inputPath: function (decl) {
          return path.resolve('.');
        },
        template: function (fileMeta) {
          return 'assets/' + fileMeta.hash + '.' + fileMeta.ext;
        },
        relativePath: function (dirname, fileMeta, result, options) {
          return path.dirname(fileMeta.sourceInputFile);
        },
        hashFunction: function (contents) {
          // sha256
          const createSha = require('sha.js');

          return createSha('sha256').update(contents).digest('hex');
        }
      })
    ]
  },
  paths: {
    tmp: tmpPath,
    dist: distPath
  }
};
