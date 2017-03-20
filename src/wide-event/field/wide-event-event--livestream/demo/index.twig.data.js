const Attributes = require('../../../../drupal/attributes');

module.exports = function (plugin) {
  return {
    demo: {
      title: 'field/wide-event-event--livestream demo',
      class: 'field--wide-event-event--livestream--demo'
    },
    attributes: new Attributes(),
    items: [
      {
        content: 'porsche'
      },
      {
        content: 'tagheuer'
      }
    ]
  };
};
