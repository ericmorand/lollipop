document.addEventListener('DOMContentLoaded', function (event) {
  let scope = document.querySelector('.page-node-type-flash-sale');

  if (scope) {
    let $ = require('jquery');
    let jQuery = $;

    global.jQuery = jQuery;

    require('bootstrap');

    let sku = scope.querySelector('#edit-sku').value;
    let form = document.querySelector('#wide-flashsale-popin-form');
    let countrySelector = form.querySelector('#edit-country-popin');
    let languageSelector = form.querySelector('#edit-language');
    let currentCountry = null;
    let currentLanguage = null;

    // fetch the main header language icon
    let languageIcon = scope.querySelector('#main-header .region-icon-menu .icon-nav a.icon-language');
    let mobileLanguageIcon = scope.querySelector('#main-header .region-main-menu .main-nav a.icon-language');

    // @see http://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type
    let cloneNode = function(node) {
      let nodeClone = node.cloneNode(true);

      node.parentNode.replaceChild(nodeClone, node);

      return nodeClone;
    };

    let setPopinCurrency = function() {
      let currency = countrySelector.getAttribute('data-currency-' + currentCountry);

      let currencyScope = form.querySelector('.currency');

      if (currency) {
        currencyScope.querySelector('span').textContent = currency;
        currencyScope.style.display = null;
      }
      else {
        currencyScope.querySelector('span').textContent = '';
        currencyScope.style.display = null;
      }
    };

    languageIcon = cloneNode(languageIcon);
    mobileLanguageIcon = cloneNode(mobileLanguageIcon);

    // fetch the flash-sale modal
    let flashSaleModal = scope.querySelector('.wide-flash-sale--node--wide-flash-sale-flash-sale > .popin-lang');

    let openFlashSaleModal = function () {
      $(flashSaleModal).modal();
    };

    let refreshProductInformations = function () {
      setPopinCurrency();

      jQuery.ajax({
        url: '/ws/flashsale/get-price',
        type: 'get',
        dataType: 'json',
        async: true,
        data: {
          'sku': sku,
          'language': currentLanguage,
          'country': currentCountry
        },
        success: function (data) {
          let cartScopes = scope.querySelectorAll('.slider-watch-cart');
          
          cartScopes.forEach(function(cartScope) {
            let buttonScope = cartScope.querySelector('.event-watch-cart-btn');
            let priceScope = cartScope.querySelector('.slider-watch-price');

            if (data.price.price) {
              priceScope.textContent = data.price.price + '*';
            }
            else {
              priceScope.textContent = '';
            }

            if (data.price.availability === 'AVAILABLE') {
              buttonScope.setAttribute('href', '/int-ch/checkout/cart?product=' + sku + '&country=' + currentCountry + '&language=' + currentLanguage);
              cartScope.style.display = null;
            }
            else {
              buttonScope.setAttribute('href', null);
              cartScope.style.display = 'none';
            }
          });

          // update form values
          countrySelector.value = currentCountry;

          let selectedValue = 0;

          for (let i = 0; i < languageSelector.options.length; i++) {
            let option = languageSelector.options[i];

            if (option.getAttribute('data-langcode') === currentLanguage) {
              selectedValue = option.value;
            }
          }

          languageSelector.value = selectedValue;
        }
      });
    };

    if (flashSaleModal) {
      [languageIcon, mobileLanguageIcon].forEach(function(node) {
        node.addEventListener('click', function (event) {
          event.preventDefault();

          openFlashSaleModal();
        });
      });
    }

    let init = function() {
      countrySelector.addEventListener('change', function(event) {
        currentCountry = countrySelector.value;

        refreshProductInformations();
      });

      languageSelector.addEventListener('change', function(event) {
        currentLanguage = languageSelector.options[languageSelector.selectedIndex].getAttribute('data-langcode');

        refreshProductInformations();
      });

      // fetch the config
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
            currentCountry = config.country;
            currentLanguage = config.language;

            refreshProductInformations();
          }
        }
      });
    };

    // region hack
    // todo: remove this ugly hack once the back-end is able to handle the for submission by himself
    // todo: for now, it's been confirmed by Hervé TUBALDO and Guillaume DOUTRE that hacking the submission is the way to go
    let sapientForm = document.querySelector('#sapient-settings-form');
    let formSubmitButton = form.querySelector('input[type="submit"]');

    formSubmitButton.addEventListener('click', function (event) {
      event.preventDefault();

      let nodeid = form.querySelector("#edit-nodeid").value;

      sapientForm.querySelector('#edit-country').value = currentCountry;
      sapientForm.querySelector('#edit-language').value = currentLanguage;

      // fetch the product informations
      jQuery.ajax({
        url: '/ws/flashsale/set-sale-config',
        type: 'post',
        dataType: 'json',
        async: true,
        data: {
          'sku': sku,
          'language': currentLanguage,
          'country': currentCountry,
          'nodeid': nodeid
        },
        success: function (data) {
          document.location = data.redire;
        }
      });

      return false;
    });
    // endregion hack

    init();
  }
});

module.exports = {};