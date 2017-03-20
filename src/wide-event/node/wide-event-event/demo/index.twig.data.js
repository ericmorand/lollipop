module.exports = function(plugin) {
  require('../../../../drupal/twig-extend')(plugin.twig);

  return {
    demo: {
      title: 'node/wide-event-event demo',
      class: 'node--wide-event-event--demo'
    },
    sections: [
      {
        title: 'Event as content',
        node: require('./data/nodes')[0]
      },
      {
        title: 'Event as page',
        node: require('./data/nodes')[1]
      },
    ]
  };
};
