'use strict';

const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const log = require('log-util');
const merge = require('merge');
const path = require('path');

const Stromboli = require('stromboli');
const ComponentsBuilder = require('./lib/components-builder');
const StyleguideBuilder = require('./lib/styleguide-builder');
const BrowserSync = require('browser-sync');

const demoBuilderConfig = require('./config/demo');

class MasterBuilder extends ComponentsBuilder {

}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let masterBuilder = new MasterBuilder();

  masterBuilder.start(demoBuilderConfig).then(
    function (result) {
      console.log(result);

      components.forEach(function (component) {
        cluster.fork({
          component: JSON.stringify(component)
        });
      });
    }
  );

  masterBuilder.pluginRenderComponentDidEnd = function (worker, plugin, component, binaries, dependencies) {
    let self = this;

    // watch dependencies
    let watcher = null;

    if (!self.componentsWatchers.has(component.name)) {
      self.componentsWatchers.set(component.name, new Map());
    }

    let componentWatchers = self.componentsWatchers.get(component.name);

    self.info('WATCHER WILL WATCH', dependencies, 'USING PLUGIN', plugin.name);

    watcher = self.getWatcher(dependencies, function () {
      self.info('WATCHER FOR COMPONENT', component.name, 'AND PLUGIN', plugin.name, 'WILL BE CLOSED');

      this.close();

      worker.send({
        type: 'renderComponent',
        plugin: plugin.name
      })
    });

    componentWatchers.set(plugin.name, watcher);

    // reload Browsersync
    let bs = BrowserSync.get(component.name);

    if (bs) {
      binaries.forEach(function (binary) {
        if (path.extname(binary) !== '.map') {
          bs.reload(binary);
        }
      });
    }
  };

  cluster.on('message', function (worker, message, handle) {
    if (message.type === 'pluginRenderComponent') {
      masterBuilder.pluginRenderComponentDidEnd(worker, message.plugin, message.component, message.binaries, message.dependencies);
    }
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  let component = JSON.parse(process.env.component);

  console.log(`Worker ${process.pid} started ${component.name}`);

  let workerBuilder = new ComponentsBuilder();
  let pluginRenderComponent = workerBuilder.pluginRenderComponent;

  workerBuilder.pluginRenderComponent = function (plugin, component) {
    return pluginRenderComponent.call(workerBuilder, plugin, component).then(
      function (result) {
        process.send({
          type: 'pluginRenderComponent',
          component: {
            name: result.component.name
          },
          plugin: {
            name: plugin.name
          },
          binaries: result.binaries,
          dependencies: result.dependencies
        });
      }
    );
  };
}