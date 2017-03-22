const Attributes = require('../../../../../../drupal/attributes');

let items = require('../../../../../paragraph/wide-event-product-section/test/default/data/paragraphs');

let sections = items.map(function (item) {
  return {
    id: item.bundle() + '_' + item.id(),
    title: item.title.items[0]
  }
});

module.exports = [
  {
    attributes: new Attributes(),
    items: items,
    show_section_links: true,
    sections: sections
  }
];