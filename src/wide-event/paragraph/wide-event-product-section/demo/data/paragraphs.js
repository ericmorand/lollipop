const Attributes = require('../../../../../drupal/attributes');

var results = [];

for (let i = 0; i < 4; i++) {
  results.push(
    {
      attributes: new Attributes(),
      id: function () {
        return i;
      },
      bundle: function () {
        return 'foo'
      },
      tag: {
        attributes: new Attributes(),
        items: [
          'Lorem'
        ]
      },
      title: {
        attributes: new Attributes(),
        items: [
          'Ipsum_' + i
        ]
      },
      product: require('../../../../field/wide-event-product-section--product/demo/data/fields')[i]
    }
  )
}

module.exports = results;