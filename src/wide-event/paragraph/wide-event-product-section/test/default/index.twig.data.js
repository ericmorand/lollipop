const Attributes = require('drupal-attribute');

module.exports = function (plugin) {
  return {
    demo: {
      title: 'paragraph/wide-event-product-section demo',
      class: 'paragraph--wide-event-product-section--demo'
    },
    attributes: new Attributes,
    paragraphs: require('./data/paragraphs')
  };
};
