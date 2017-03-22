document.addEventListener('DOMContentLoaded', function (event) {
  let page = document.querySelector('.page-node-type-flash-sale');

  if (page) {
    // fetch the main header language icon
    let languageIcon = page.querySelector('#main-header .region-icon-menu .icon-nav a.icon-language');

    // @see http://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
    let languageIconClone = languageIcon.cloneNode(true);

    languageIcon.parentNode.replaceChild(languageIconClone, languageIcon);

    languageIcon = languageIconClone;

    // fetch the flash-sale modal
    let flashSaleModal = page.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale > .popin-lang');

    if (languageIcon && flashSaleModal) {
      languageIcon.addEventListener('click', function (event) {
        event.preventDefault();

        let $ = jQuery = require('jquery');

        require('bootstrap');

        // fetch
        $(flashSaleModal).modal();
      });
    }
  }

  // region hack
  // todo: remove this ugly hack once the back-end is able to handle the for submission by himself
  // todo: for now, it's been confirmed by Hervé TUBALDO and Guillaume DOUTRE that hacking the submission is the way to go
  let form = document.querySelector('#wide-flashsale-popin-form');
  let sapientForm = document.querySelector('#sapient-settings-form');
  let formSubmitButton = form.querySelector('input[type="submit"]');

  formSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();

    let country = form.querySelector('#edit-country-popin').value;
    let language = form.querySelector('#edit-language').value;

    sapientForm.querySelector('#edit-country').value = country;
    sapientForm.querySelector('#edit-language').value = language;
    sapientForm.submit();

    return false;
  });
  // endregion hack
});

module.exports = {};