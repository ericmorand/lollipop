document.addEventListener('DOMContentLoaded', function (event) {
  let scope = document.querySelector('.page-node-type-flash-sale');

  if (scope) {
    let $ = require('jquery');
    let jQuery = $;

    global.jQuery = jQuery;

    require('bootstrap');

    let sku = scope.querySelector('#edit-sku').value;

    // fetch the main header language icon
    let languageIcon = scope.querySelector('#main-header .region-icon-menu .icon-nav a.icon-language');

    // @see http://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
    let languageIconClone = languageIcon.cloneNode(true);

    languageIcon.parentNode.replaceChild(languageIconClone, languageIcon);

    languageIcon = languageIconClone;

    // fetch the flash-sale modal
    let flashSaleModal = scope.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale > .popin-lang');

    let openFlashSaleModal = function () {
      // fetch
      $(flashSaleModal).modal();
    };

    let refreshProductInformations = function (sku, country, language) {
      jQuery.ajax({
        url: '/ws/flashsale/get-price',
        type: 'get',
        dataType: 'json',
        async: true,
        data: {
          'sku': sku,
          'language': language,
          'country': country
        },
        success: function (data) {
          let priceScope = scope.querySelector('.slider-watch-price');

          if (data.price.price) {
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

    // fetch if the popin should be displayed
    jQuery.ajax({
      url: '/ws/flashsale/get-sale-config',
      type: 'get',
      dataType: 'json',
      async: true,
      data: {
        'sku': sku
      },
      success: function (data) {
        let config = data.config;

        if (!config.country || !config.language) {
          openFlashSaleModal();
        }
        else {
          refreshProductInformations(sku, config.country, config.language);
        }
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
      let select = form.querySelector('#edit-language');
      let language = select.options[select.selectedIndex].getAttribute('data-langcode');
      let nodeid = form.querySelector("#edit-nodeid").value;

      sapientForm.querySelector('#edit-country').value = country;
      sapientForm.querySelector('#edit-language').value = language;

      // fetch the product informations
      jQuery.ajax({
        url: '/ws/flashsale/set-sale-config',
        type: 'post',
        dataType: 'json',
        async: true,
        data: {
          'sku': sku,
          'language': language,
          'country': country,
          'nodeid': nodeid
        },
        success: function (ret) {
          document.location = ret.redire;
        }
      });

      return false;
    });
    // endregion hack
  }
});

module.exports = {};