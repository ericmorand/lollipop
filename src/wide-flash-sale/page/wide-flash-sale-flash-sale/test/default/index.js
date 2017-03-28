require('../../src');
require('../../../../node/wide-flash-sale-flash-sale/src');

let mockjax = require('jquery-mockjax')(require('jquery'), global);

mockjax({
  url: '/ws/flashsale/get-sale-config',
  type: 'get',
  dataType: 'json',
  responseText: {
    config: {
      country: 'ch',
      language: 'en-gb'
    }
  }
});

mockjax({
  url: '/ws/flashsale/get-price',
  type: 'get',
  dataType: 'json',
  response: function(settings) {
    let availaibility = null;

    switch (settings.data.country) {
      case 'ch':
        availaibility = 'NOT AVAILABLE';
        break;
      default:
        availaibility = 'AVAILABLE';
    }

    this.responseText = {
      price: {
        price: '1234.56',
        availability: availaibility
      }
    };
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
