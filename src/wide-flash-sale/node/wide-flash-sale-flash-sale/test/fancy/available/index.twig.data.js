const DrupalAttribute = require('drupal-attribute');

module.exports = function (plugin) {
  let data = require('../../default/index.twig.data')(plugin);

  data.demo.title = 'Flash Sale node - Available product';

  let fixture = data.fixture;

  fixture.title = 'Product available';

  fixture.check_commerce = function () {
    return function () {
      return 'available-online';
    }
  };

  fixture.get_price = function () {
    return function (sku) {
      return {
        price: 'CHF1234',
        availability: 'AVAILABLE'
      };
    }
  };

  let loremIpsum = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ultrices augue. Proin metus orci, condimentum imperdiet diam id, congue pulvinar nisl. Etiam dignissim nunc eget magna varius finibus. Etiam luctus velit nunc, sed tempor erat euismod eget. Proin lacus quam, placerat sit amet magna vitae, efficitur dictum dolor. Fusce non ipsum felis. Nullam porta nibh a tellus laoreet, ac imperdiet quam mollis. Nunc vitae auctor ex, vel ornare elit.</p><p>Quisque dignissim dui sem, id posuere leo consequat non.\nIn vehicula vulputate tortor et posuere. Etiam vestibulum ut libero vel rhoncus. Etiam rutrum non augue eu fermentum. Donec at dignissim lectus. Curabitur et dolor mi. Quisque id pharetra libero. Donec id tellus accumsan, ultricies erat sed, dapibus massa. Nunc rutrum metus a sem tempor consectetur. Pellentesque a libero laoreet, venenatis arcu quis, pharetra ex.</p>';

  fixture.label = 'TAG HEUER AUTAVIA 2017 FR';
  fixture.node.field_flash_sale_background.entity.uri.value = 'tagheuer.tag-int.cross-systems.ch/sites/default/files/2017-03/bg-slider.jpg';
  fixture.node.field_flash_sale_desc_background.entity.uri.value = 'tagheuer.tag-int.cross-systems.ch/sites/default/files/2017-03/bg-section-05.jpg';
  fixture.node.field_flash_sale_pdf_url_preview.value = '<iframe src="//example.com"></iframe>';

  fixture.content.field_flash_sale_subtitle = '<p>Calibre Heuer 02</p><p>Automatic Chronograph</p>';
  fixture.content.field_flash_sale_description = '<p>100 M - 42 MM</p><p>CBE2110.FC8226</p>';
  fixture.content.field_flash_sale_main_image = '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_main_image/public/2017-03/autavia-1.png?itok=bW3TKxoJ" width="307" height="550">';
  fixture.content.field_flash_sale_hashtag = '#happyautavia';
  fixture.content.field_flash_sale_right_desc = '1500 happy clients';
  fixture.content.field_flash_sale_footer_title = 'Terms of sale';
  fixture.content.field_flash_sale_footer_text = loremIpsum;
  fixture.content.field_flash_sale_video = '<figure class="youtube-container youtube-container--responsive"><iframe src="https://www.youtube.com/embed/ihWK-XuecOI?wmode=opaque" width="100%" height="100%" id="youtube-field-player" class="youtube-field-player" title="Embedded video for TAG HEUER AUTAVIA 2017 FR" frameborder="0" allowfullscreen="">&lt;a href="https://www.youtube.com/embed/ihWK-XuecOI?wmode=opaque"&gt;Embedded video for TAG HEUER AUTAVIA 2017 FR&lt;/a&gt; </iframe></figure>';

  let productDescTemplate = require('../../../../../paragraph/flash-sale-description/src/index.twig');

  fixture.content.field_flash_sale_product_desc = [
    productDescTemplate.render({
      paragraph: {
        field_flash_sale_p_orientation: [
          {
            value: 'image_left'
          }
        ]
      },
      content: {
        field_flash_sale_p_title: 'Lorem ipsum dolor sit amet',
        field_flash_sale_p_text: loremIpsum,
        field_flash_sale_p_image: [
          '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_description_image/public/2017-03/about-01.jpg?itok=_m2xgthX" width="790" height="530">'
        ]
      }
    }),
    productDescTemplate.render({
      paragraph: {
        field_flash_sale_p_orientation: [
          {
            value: 'image_right'
          }
        ]
      },
      content: {
        field_flash_sale_p_title: 'Lorem ipsum',
        field_flash_sale_p_text: loremIpsum,
        field_flash_sale_p_image: [
          '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_description_image/public/2017-03/about-02.jpg?itok=Wu7qwrI9" width="1920" height="1080">'
        ]
      }
    })
  ].join();

  let closeUpImageTemplate = require('../../../../../field/close-up-image/src/index.twig');

  fixture.content.field_flash_sale_images = closeUpImageTemplate.render(
    {
      items: [
        {
          attributes: new DrupalAttribute(),
          content: '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_product_image/public/2017-03/tag-closeup-01.jpg?itok=eAU8WFCR">'
        },
        {
          attributes: new DrupalAttribute(),
          content: '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_product_image/public/2017-03/tag-closeup-02.jpg?itok=9xnc78qr">'
        },
        {
          attributes: new DrupalAttribute(),
          content: '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_product_image/public/2017-03/tag-closeup-03.jpg?itok=S4N2inp7">'
        },
        {
          attributes: new DrupalAttribute(),
          content: '<img src="http://tagheuer.tag-int.cross-systems.ch/sites/default/files/styles/flash_sale_product_image/public/2017-03/tag-closeup-04.jpg?itok=G0XFTnIy">'
        }
      ],
      field_name: 'content.field_flash_sale_images'
    }
  );

  return {
    demo: data.demo,
    fixtures: [fixture]
  };
};
