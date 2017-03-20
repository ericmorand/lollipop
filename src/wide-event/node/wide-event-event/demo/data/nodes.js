const Attributes = require('../../../../../drupal/attributes');

module.exports = [
  {
    title: 'Node',
    attributes: new Attributes(),
    fields: {
      body: require('../../../../field/wide-event-event--body/demo/data/fields'),
      productSection: require('../../../../field/wide-event-event--product-section/demo/data/fields')
    },
    page: false,
    label: 'Lorem ipsum'
  },
  {
    title: 'Node as page',
    attributes: new Attributes(),
    fields: {
      body: require('../../../../field/wide-event-event--body/demo/data/fields'),
      productSection: require('../../../../field/wide-event-event--product-section/demo/data/fields')
    },
    page: true,
    label: 'Lorem ipsum'
  }
];