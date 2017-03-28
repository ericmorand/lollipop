require('../../src');
require('../../../../node/wide-flash-sale-flash-sale/src');

let mockjax = require('jquery-mockjax')(require('jquery'), global);

mockjax({
  url: '/ws/flashsale/get-sale-config',
  type: 'get',
  dataType: 'json',
  responseText: {
    config: {
      country: 'uk',
      language: 'en-gb'
    }
  }
});

mockjax({
  url: '/ws/flashsale/get-price',
  type: 'get',
  dataType: 'json',
  responseText: {
    price: {
      price: '1234.56',
      availability: 'AVAILABLE'
    }
  }
});


mockjax({
  url: '/ws/flashsale/set-sale-config',
  type: 'post',
  dataType: 'json',
  responseText: {
    redire: '#'
  }
});
