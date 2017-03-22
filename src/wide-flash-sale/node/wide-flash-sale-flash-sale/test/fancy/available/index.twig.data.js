module.exports = function (plugin) {
  let data = require('../../default/index.twig.data')(plugin);

  let fixture = data.fixture;

  fixture.title = 'Product available';

  fixture.check_commerce = function() {
    return function () {
      return 'available-online';
    }
  };

  fixture.get_price = function() {
    return function (sku) {
      return {
        price: 'CHF1234',
        availability: 'AVAILABLE'
      };
    }
  };

  return {
    demo: data.demo,
    fixtures: [fixture]
  };
};
