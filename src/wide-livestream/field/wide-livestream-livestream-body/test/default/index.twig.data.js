const Attributes = require('drupal-attribute');

module.exports = function (plugin) {
  return {
    demo: {
      title: 'wide-livestream/field/wide-livestream-livestream-body demo',
      class: 'wide-livestream--field--wide-livestream-livestream-body--demo'
    },
    fixtures: {
      story: {
        title: 'Story template, full header',
        content: '<div class="storify"><iframe src="//storify.com/ericmorandcross/getting-started/embed?border=false&template=story" width="100%" height="750" frameborder="no" allowtransparency="true"></iframe><script src="//storify.com/ericmorandcross/getting-started.js?border=false"></script><noscript>[<a href="//storify.com/ericmorandcross/getting-started" target="_blank">View the story "Getting started" on Storify</a>]</noscript></div>',
        attributes: new Attributes()
      },
      grid: {
        title: 'Grid template, full header',
        content: '<div class="storify"><iframe src="//storify.com/ericmorandcross/getting-started/embed?border=false&template=grid" width="100%" height="750" frameborder="no" allowtransparency="true"></iframe><script src="//storify.com/ericmorandcross/getting-started.js?border=false&template=grid"></script><noscript>[<a href="//storify.com/ericmorandcross/getting-started" target="_blank">View the story "Getting started" on Storify</a>]</noscript></div>',
        attributes: new Attributes()
      },
      slideshow: {
        title: 'Slideshow template, full header',
        content: '<div class="storify"><iframe src="//storify.com/ericmorandcross/getting-started/embed?border=false&template=slideshow" width="100%" height="750" frameborder="no" allowtransparency="true"></iframe><script src="//storify.com/ericmorandcross/getting-started.js?border=false&template=slideshow"></script><noscript>[<a href="//storify.com/ericmorandcross/getting-started" target="_blank">View the story "Getting started" on Storify</a>]</noscript></div>',
        attributes: new Attributes()
      }
    }
  };
};
