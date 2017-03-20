const Attributes = require('../../../../drupal/attributes');

module.exports = function(plugin) {
  require('../../../../drupal/twig-extend')(plugin.twig);

  return {
    demo: {
      title: 'wide-flash-sale/node/wide-flash-sale-flash-sale demo',
      class: 'wide-flash-sale--node--wide-flash-sale-flash-sale--demo'
    },
    attributes: new Attributes()
  };
};
