const Attributes = require('drupal-attribute');

module.exports = function (plugin) {
  return {
    demo: {
      title: 'field/wide-event-event--livestream demo',
      class: 'field--wide-event-event--livestream--demo'
    },
    fixtures: {
      link: {
        content: '<a href="#">Lorem ipsum</a>',
        attributes: new Attributes(),
      }
    }
  };
};
