module.exports = function (plugin) {
  let data = require('../../default/index.twig.data')(plugin);

  let fixture = data.fixture;

  fixture.title = 'Product not available';

  fixture.check_commerce = function() {
    return function () {
      return 'not-available-online';
    }
  };

  fixture.get_price = function() {
    return function (sku) {
      return {
        price: 'CHF1234',
        availability: 'NOT AVAILABLE'
      };
    }
  };

  return {
    demo: data.demo,
    fixtures: [fixture]
  };
};
