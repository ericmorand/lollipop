document.addEventListener('DOMContentLoaded', function (event) {
  let scope = document.querySelector('.page-node-type-flash-sale');

  if (scope) {
    const request = require('ajax-request');

    // fetch the main header language icon
    let languageIcon = scope.querySelector('#main-header .region-icon-menu .icon-nav a.icon-language');

    // @see http://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
    let languageIconClone = languageIcon.cloneNode(true);

    languageIcon.parentNode.replaceChild(languageIconClone, languageIcon);

    languageIcon = languageIconClone;

    // fetch the flash-sale modal
    let flashSaleModal = scope.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale > .popin-lang');

    let openFlashSaleModal = function () {
      let $ = jQuery = require('jquery');

      require('bootstrap');

      // fetch
      $(flashSaleModal).modal();
    };

    let refreshProductInformations = function (sku, country, language) {
      request({
        url: '/ws/flashsale/get-price',
        data: {
          'sku': sku,
          'language': language,
          'country': country
        }
      }, function (err, res, body) {
        // price
        if (data.price.price) {
          let priceScope = scope.querySelector('.slider-watch-price');

          priceScope.innerHtml = data.price.price + '*';
          priceScope.style.display = null;
        }
        else {
          priceScope.style.display = 'none';
        }

        // shop link
        let buttonScope = scope.querySelector('.event-watch-cart-btn');
        let shippingScope = scope.querySelector('.slider-watch-shipping-btn');

        if (data.price.availability == 'AVAILABLE') {
          buttonScope.setAttribute('href', '/int-ch/checkout/cart?product=' + sku + '&country=' + country + '&language=' + language);
          buttonScope.style.display = null;
          shippingScope.style.display = null;
        }
        else {
          buttonScope.setAttribute('href', null);
          buttonScope.style.display = 'none';
          shippingScope.style.display = 'none';
        }
      });
    };

    if (languageIcon && flashSaleModal) {
      languageIcon.addEventListener('click', function (event) {
        event.preventDefault();

        openFlashSaleModal();
      });
    }

    // region hack
    // todo: these things should be done in the back-end

    let sku = scope.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale').getAttribute('data-sku');

    // fetch if the popin should be displayed
    request({
      url: '/ws/flashsale/get-sale-config',
      data: {
        sku: sku
      }
    }, function (err, res, body) {
      if (!config.country || !config.language) {
        openFlashSaleModal();
      }
      else {
        refreshProductInformations(sku, config.country, config.language);
      }
    });
    // endregion

    // region hack
    // todo: remove this ugly hack once the back-end is able to handle the for submission by himself
    // todo: for now, it's been confirmed by Hervé TUBALDO and Guillaume DOUTRE that hacking the submission is the way to go
    let form = document.querySelector('#wide-flashsale-popin-form');
    let sapientForm = document.querySelector('#sapient-settings-form');
    let formSubmitButton = form.querySelector('input[type="submit"]');

    formSubmitButton.addEventListener('click', function (event) {
      event.preventDefault();

      let country = form.querySelector('#edit-country-popin').value;
      let language = form.querySelector('#edit-language').value;

      sapientForm.querySelector('#edit-country').value = country;
      sapientForm.querySelector('#edit-language').value = language;
      sapientForm.submit();

      // fetch the product informations
      request({
        url: '/ws/flashsale/set-sale-config',
        method: 'POST',
        data: {
          sku: sku,
          country: country,
          language: language
        }
      }, function (err, res, body) {
        console.log('RES', res);
      });

      return false;
    });
    // endregion hack
  }
});

module.exports = {};