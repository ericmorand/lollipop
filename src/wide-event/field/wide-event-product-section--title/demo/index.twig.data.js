const Attributes = require('../../../../drupal/attributes');

module.exports = function (plugin) {
  return {
    demo: {
      title: 'field/wide-event-product-section--title demo',
      class: 'field--wide-event-product-section--title--demo'
    },
    fields: [
      {
        attributes: new Attributes(),
        items: [
          'A title',
          'AN UPPER CASE TITLE'
        ]
      },
      {
        attributes: new Attributes(),
        items: [
          'a lower case title',
          'A Camel Case Title'
        ]
      }
    ]
  };
};
