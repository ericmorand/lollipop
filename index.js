'use strict';

const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const log = require('log-util');
const merge = require('merge');
const path = require('path');

const chokidar = require('chokidar');
const Stromboli = require('stromboli');
const ComponentsBuilder = require('./lib/components-builder');
const StyleguideBuilder = require('./lib/styleguide-builder');
const BrowserSync = require('browser-sync');

const demoBuilderConfig = require('./config/demo');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let builder = new ComponentsBuilder();
  let watchers = new Map();

  let reload = function (component) {
    let bs = BrowserSync.has(component.name) ? BrowserSync.get(component.name) : null;

    if (bs) {
      let renderResult = component.renderResult;

      renderResult.binaries.forEach(function (binary) {
        if (path.extname(binary) !== '.map') {
          bs.reload(binary);
        }
      });
    }
  };

  let closeWatcher = function (component, worker) {
    let watcher = null;

    if (watchers.has(component.name)) {
      let componentWatchers = watchers.get(component.name);

      if (componentWatchers.has(worker.id)) {
        watcher = componentWatchers.get(worker.id);

        return watcher.close();
      }
    }

    return Promise.resolve(true);
  };

  let watch = function (component, files, worker) {
    builder.info('WATCHER WILL WATCH', files, 'USING WORKER', worker.id);

    let watcher = chokidar.watch(files, demoBuilderConfig.chokidar).on('all', function (type, file) {
      builder.info(file, type);

      if (file === '/home/ericmorand/Projects/lollipop/src/wide-flash-sale/node/wide-flash-sale-flash-sale/src/index.scss') {
        builder.warn('>>> WATCHER WILL SEND MESSAGE TO WORKER', worker.id);
      }

      worker.send({
        type: 'test'
      });
    });

    // store the watcher
    if (!watchers.has(component.name)) {
      watchers.set(component.name, new Map());
    }

    let componentWatchers = watchers.get(component.name);

    componentWatchers.set(worker.id, watcher);

    return watcher;
  };

  let h = function (component, plugin, worker) {
    // close watcher
    return closeWatcher(component, worker).then(
      function () {
        // reload BS
        reload(component);

        // watch again
        let renderResult = component.renderResult;
        let files = renderResult.sourceDependencies.concat(renderResult.binaryDependencies);

        watch(component, files, worker);
      }
    );
  };

  builder.start(demoBuilderConfig).then(
    function (components) {
      let self = builder;

      builder.warn('== START DONE');

      // browser-sync
      let bsPromise = new Promise(function (fulfill, reject) {
        let processComponentAtIndex = function (index) {
          let component = components[index];
          let browserSync = require('browser-sync').create(component.name);
          let browserSyncConfig = merge({}, self.config.browserSync);

          browserSyncConfig.server = browserSyncConfig.server + '/' + component.name;

          browserSync.init(browserSyncConfig, function (err, bs) {
            // component.url = '/html';
            // component.port = bs.options.get('port');

            index++;

            if (index < components.length) {
              processComponentAtIndex(index);
            }
            else {
              fulfill(components);
            }
          });
        };

        processComponentAtIndex(0);
      });

      bsPromise.then(
        function () {
          components.forEach(function (component) {
            let renderResults = component.renderResults;

            renderResults.forEach(function (renderResult, pluginName) {
              // fork
              let worker = cluster.fork({
                component: JSON.stringify({
                  name: component.name,
                  path: component.path
                }),
                plugin: JSON.stringify({
                  name: pluginName
                })
              });

              // watch
              let files = renderResult.sourceDependencies.concat(renderResult.binaryDependencies);

              watch(component, files, worker);
            });
          });
        }
      );
    }
  );

  cluster.on('message', function (worker, message, handle) {
    if (message.type === 'pluginRenderComponent') {
      h(message.component, message.plugin, worker);
    }
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log(`worker ${worker.process.pid} died`);
  });
}
else {
  let component = JSON.parse(process.env.component);
  let plugin = JSON.parse(process.env.plugin);
  let builder = new ComponentsBuilder();

  builder.warn(`Worker ${process.pid} started ${component.name}::${plugin.name}`);

  let pluginName = plugin.name;

  component.renderResults = new Map();

  builder.getPlugins(demoBuilderConfig).then(
    function (plugins) {
      let plugin = plugins.find(function (item) {
        return (item.name === pluginName);
      });

      if (plugin) {
        process.on('message', function (worker, message, handle) {
          console.log(process.pid, 'did receive', message);

          builder.pluginRenderComponent(plugin, component).then(
            function (component) {
              let renderResult = component.renderResults.get(plugin.name);

              process.send({
                type: 'pluginRenderComponent',
                component: {
                  name: component.name,
                  renderResult: renderResult
                },
                plugin: {
                  name: plugin.name
                }
              });
            }
          );
        });
      }
    },
    function(err) {
      console.log(err);
    }
  );
}