const merge = require('deepmerge');
const path = require('path');

let tmpPath = 'tmp';
let distPath = 'dist';

let jsConfig = require('./plugin/javascript');

jsConfig.transform.push(['babelify', {
  presets: ['es2015']
}]);

jsConfig.transform.push(['uglifyify', {
  global: true
}]);

class TwigDepsPlugin {
  render(entry, output) {
    return new Promise(function (fulfill, reject) {
      const TwigDeps = require('twig-deps');

      let renderResult = {
        dependencies: []
      };

      let depper = new TwigDeps();

      require('../src/drupal/twig-extend')(depper.twig);

      depper.on('data', function (dep) {
        renderResult.dependencies.push(dep);
      });

      depper.on('error', function (err) {
        console.log('ERR', err);
      });

      depper.on('finish', function (dep) {
        fulfill(renderResult);
      });

      depper.end(entry);
    });
  }
}

module.exports = {
  componentRoot: 'src',
  componentManifest: 'component.json',
  plugins: {
    js: {
      module: require('stromboli-plugin-javascript'),
      config: jsConfig,
      entry: 'index.js',
      output: 'wide.js'
    },
    css: {
      module: require('stromboli-plugin-sass'),
      config: merge({}, require('./plugin/sass'), {
        sourceMap: false,
        sourceComments: false
      }),
      entry: 'index.scss',
      output: 'wide.css'
    },
    html: {
      module: TwigDepsPlugin,
      entry: 'index.twig'
    }
  },
  postcss: {
    plugins: [
      require('cssnano')({
        discardDuplicates: true,
        zindex: false // https://github.com/ben-eb/gulp-cssnano/issues/8
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
