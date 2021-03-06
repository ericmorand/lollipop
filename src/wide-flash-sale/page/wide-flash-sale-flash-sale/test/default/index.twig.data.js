module.exports = function (plugin) {
  require('../../../../../drupal/twig-extend')(plugin.twig);

  let data = require('../../../../node/wide-flash-sale-flash-sale/test/default/index.twig.data')(plugin);

  data.fixture.popin_flashsale = '<select><option>test</option></select>';

  return {
    demo: {
      title: 'wide-flash-sale/page/wide-flash-sale-flash-sale demo',
      class: 'wide-flash-sale--page--wide-flash-sale-flash-sale--demo'
    },
    fixtures: [data.fixture]
  };
};
