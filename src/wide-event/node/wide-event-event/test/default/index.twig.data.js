module.exports = function (plugin) {
  require('../../../../../drupal/twig-extend')(plugin.twig);

  return {
    demo: {
      title: 'node/wide-event-event demo',
      class: 'node--wide-event-event--demo'
    },
    fixtures: {
      'as-content': {
        node: require('./data/nodes')[0]
      },
      'as-page': {
        node: require('./data/nodes')[1]
      }
    }
  };
};
