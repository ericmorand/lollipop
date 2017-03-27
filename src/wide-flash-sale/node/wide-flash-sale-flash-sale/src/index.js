let AOS = require('aos');

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
}, false);

module.exports = {};