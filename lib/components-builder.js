const fs = require('fs-extra');
const log = require('log-util');
const merge = require('merge');
const path = require('path');

const chokidar = require('chokidar');
const Stromboli = require('stromboli');
const write = require('../lib/write');

class Builder extends Stromboli {
  constructor() {
    super();

    this.componentsWatchers = new Map();
    this.config = null;
  };

  start(config) {
    let that = this;

    that.config = config;

    return super.start(that.config);
  }

  // pluginPreRenderComponent(plugin, component) {
  //
  //   let that = this;
  //
  //   let promises = [];
  //
  //   // close watchers
  //   let watcher = null;
  //
  //   if (that.componentsWatchers.has(component.name)) {
  //     let componentWatchers = that.componentsWatchers.get(component.name);
  //
  //     if (componentWatchers.has(plugin.name)) {
  //       that.info('WATCHER FOR COMPONENT', component.name, 'AND PLUGIN', plugin.name, 'WILL BE CLOSED');
  //
  //       watcher = componentWatchers.get(plugin.name);
  //
  //       promises.push(watcher.close());
  //     }
  //   }
  //
  //   return Promise.all(promises);
  // };

  pluginRenderComponent(plugin, component) {
    let that = this;

    that.warn('> ', plugin.name, 'rendering of', component.name, 'started');

    return super.pluginRenderComponent(plugin, component).then(
      function (component) {
        // write plugin render result browser-sync server directory
        let renderResult = component.renderResults.get(plugin.name);

        return write.writeRenderResult(renderResult, that.getRenderResultWritePath(component, plugin)).then(
          function (files) {
            let endDate = new Date();

            that.warn('< ', plugin.name, 'rendering of', component.name, 'finished in', endDate.ge);

            return {
              component: component,
              binaries: files.binaries,
              dependencies: dependencies,
            };
          }
        )
      },
      function (err) {
        console.log(err);
      }
    )
  };

  getRenderResultWritePath(component, plugin) {
    return path.join(this.config.browserSync.server, component.name, plugin.name);
  };

  /**
   *
   * @param files {[String]}
   * @param listener {Function}
   * @returns {Promise}
   */
  getWatcher(files, listener) {
    let that = this;

    return chokidar.watch(files, that.config.chokidar).on('all', function (type, file) {
      that.info(file, type);

      listener.apply(that);
    });
  };
}

module.exports = Builder;