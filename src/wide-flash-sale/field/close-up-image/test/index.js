require('../src');

let AOS = require('aos');

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    easing: 'ease-out-cubic',
    offset: 250,
    duration: 600,
    disable: window.innerWidth < 1024
  });
}, false);

module.exports = {};