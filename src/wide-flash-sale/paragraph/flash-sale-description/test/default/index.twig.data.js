module.exports = function (plugin) {
  return {
    demo: {
      title: 'wide-flash-sale/paragraph/flash-sale-description demo',
      class: 'wide-flash-sale--paragraph--flash-sale-description--demo'
    },
    paragraphs: [
      {
        title: 'Lorem ipsum',
        image: '//placehold.it/1920x1080',
        orientation: 'image_left'
      },
      {
        title: 'Lorem ipsum',
        image: '//placehold.it/1080x1920',
        orientation: 'image_right'
      },
      {
        title: 'Lorem ipsum',
        image: '//placehold.it/640x640',
        orientation: 'image_left'
      }
    ]
  }
};
