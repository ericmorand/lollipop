let Attributes = require('drupal-attribute');

module.exports = function(plugin) {
  return {
    demo: {
      title: 'field/close-up-image demo',
      class: 'field-close-up-image-demo'
    },
    items: [
      {
        attributes: new Attributes(),
        image: {
          src: '//placehold.it/1024x768'
        }
      },
      {
        attributes: new Attributes(),
        image: {
          src: '//placehold.it/768x1024/123456'
        }
      },
      {
        attributes: new Attributes(),
        image: {
          src: '//placehold.it/768x768/654321'
        }
      }
    ]
  };
};
