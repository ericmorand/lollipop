'use strict';

const log = require('log-util');
const merge = require('merge');

const ComponentsBuilder = require('./lib/components-builder');
const StyleguideBuilder = require('./lib/styleguide-builder');

let demoBuilderConfig = require('./config/demo');

class Builder extends ComponentsBuilder {
  start(config) {
    let that = this;
    let pkg = require('./package.json');
    let length = Math.max(pkg.description.length, pkg.name.length);

    log.info(('=').repeat(length));
    log.info(pkg.name);
    log.info(pkg.version);
    log.info(pkg.description);
    log.info(('=').repeat(length));

    that.config = config;

    return super.start(config).then(
      function (components) {
        // browser-sync
        return new Promise(function (fulfill, reject) {
          let processComponentAtIndex = function (index) {
            let component = components[index];
            let browserSync = require('browser-sync').create(component.name);
            let browserSyncConfig = merge({}, that.config.browserSync);

            browserSyncConfig.server = browserSyncConfig.server + '/' + component.name;

            browserSync.init(browserSyncConfig, function (err, bs) {
              component.bs = browserSync;
              component.url = '/html';
              component.port = bs.options.get('port');

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
        }).then(
          function (components) {
            // styleguide build
            let styleguideBuilder = new StyleguideBuilder();
            let styleguideBuilderConfig = require('./config/styleguide');
            let componentsData = components.map(function (component) {
              return {
                name: component.name,
                url: component.url,
                port: component.port
              }
            });

            styleguideBuilderConfig.plugins.index.config.data = {
              title: pkg.description,
              components: componentsData
            };

            return styleguideBuilder.start(styleguideBuilderConfig);
          }
        );
      },
      function (err) {
        console.log(err);
      }
    );
  };
}

let stromboli = new Builder();

stromboli.start(demoBuilderConfig);
