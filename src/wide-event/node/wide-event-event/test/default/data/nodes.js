const Attributes = require('../../../../../../drupal/attributes');

module.exports = [
  {
    title: 'Node',
    attributes: new Attributes(),
    fields: {
      body: require('../../../../../field/wide-event-event--body/test/default/data/fields'),
      livestream: require('../../../../../field/wide-event-event--livestream/test/default/data/fields'),
      productSection: require('../../../../../field/wide-event-event--product-section/test/default/data/fields'),
    },
    page: false,
    label: 'Lorem ipsum'
  },
  {
    title: 'Node as page',
    attributes: new Attributes(),
    fields: {
      body: require('../../../../../field/wide-event-event--body/test/default/data/fields'),
      livestream: require('../../../../../field/wide-event-event--livestream/test/default/data/fields'),
      productSection: require('../../../../../field/wide-event-event--product-section/test/default/data/fields')
    },
    page: true,
    label: 'Lorem ipsum'
  }
];