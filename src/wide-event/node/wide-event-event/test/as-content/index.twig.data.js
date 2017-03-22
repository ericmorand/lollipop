module.exports = function(plugin) {
  let data = require('../default/index.twig.data')(plugin);

  return {
    demo: data.demo,
    fixtures: [
      data.fixtures['as-content']
    ]
  }
};