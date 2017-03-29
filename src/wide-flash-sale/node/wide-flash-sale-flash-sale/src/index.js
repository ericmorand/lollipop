let AOS = require('aos');

require('../../../modal/src');

document.addEventListener('DOMContentLoaded', function () {
  let scope = document.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale');

  if (scope) {
    AOS.init({
      easing: 'ease-out-cubic',
      offset: 250,
      duration: 600,
      disable: window.innerWidth < 1024
    });
  }

  // pdf preview
  let anchor = scope.querySelector('a.slider-watch-image');

  if (anchor) {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();

      let modal = scope.querySelector('.wide-flash-sale--modal.pdf-preview');

      let jQuery = require('jquery');

      jQuery(modal).modal();
    });
  }
}, false);

module.exports = {};