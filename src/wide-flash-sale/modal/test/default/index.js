require('../../src');

document.addEventListener('DOMContentLoaded', function(event) {
  let jQuery = require('jquery');
  let fixtures = document.querySelectorAll('.wide-flash-sale--modal--demo--fixture');

  fixtures.forEach(function(fixture) {
    fixture.querySelector('button.open').addEventListener('click', function(event) {
      let modal = fixture.querySelector('.wide-flash-sale--modal');

      if (modal) {
        jQuery(modal).modal();
      }
    });
  });
});

require('../../src');
