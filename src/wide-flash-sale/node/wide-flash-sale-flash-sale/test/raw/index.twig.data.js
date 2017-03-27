module.exports = function (plugin) {
  let data = require('../default/index.twig.data')(plugin);

  let fixture = data.fixture;

  fixture.title = 'Raw';

  return {
    demo: data.demo,
    fixtures: [fixture]
  };
};
