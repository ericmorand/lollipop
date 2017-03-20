const Attributes = require('../../../../drupal/attributes');

module.exports = function(plugin) {
  return {
    demo: {
      title: 'field/wide-event-product-section--tag demo',
      class: 'field--wide-event-product-section--tag--demo'
    },

    fields: [
      {
        attributes: new Attributes(),
        items: [
          'A tag',
          'a lower case tag',
          'AN UPPER CASE TAG',
          'A Camel Case Tag'
        ]
      }
    ]
  };
};
