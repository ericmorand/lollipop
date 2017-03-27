module.exports = function (plugin) {
  let data = require('../../default/index.twig.data')(plugin);

  let fixture = data.fixture;

  fixture.title = 'Product available';

  fixture.check_commerce = function() {
    return function () {
      return 'available-online';
    }
  };

  fixture.get_price = function() {
    return function (sku) {
      return {
        price: 'CHF1234',
        availability: 'AVAILABLE'
      };
    }
  };

  let loremIpsum = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ultrices augue. Proin metus orci, condimentum imperdiet diam id, congue pulvinar nisl. Etiam dignissim nunc eget magna varius finibus. Etiam luctus velit nunc, sed tempor erat euismod eget. Proin lacus quam, placerat sit amet magna vitae, efficitur dictum dolor. Fusce non ipsum felis. Nullam porta nibh a tellus laoreet, ac imperdiet quam mollis. Nunc vitae auctor ex, vel ornare elit.</p><p>Quisque dignissim dui sem, id posuere leo consequat non.\nIn vehicula vulputate tortor et posuere. Etiam vestibulum ut libero vel rhoncus. Etiam rutrum non augue eu fermentum. Donec at dignissim lectus. Curabitur et dolor mi. Quisque id pharetra libero. Donec id tellus accumsan, ultricies erat sed, dapibus massa. Nunc rutrum metus a sem tempor consectetur. Pellentesque a libero laoreet, venenatis arcu quis, pharetra ex.</p>';

  fixture.content.field_flash_sale_subtitle = '<p>Calibre Heuer 02</p><p>Automatic Chronograph</p>';
  fixture.content.field_flash_sale_description = '<p>100 M - 42 MM</p><p>CBE2110.FC8226</p>';
  fixture.content.field_flash_sale_main_image = '<img src="https://www.preprod.tagheuer.com//sites/default/files/styles/flash_sale_main_image/public/2017-03/TH_Autavia_BK_MM-2.png">';
  fixture.content.field_flash_sale_hashtag = '#happyautavia';
  fixture.content.field_flash_sale_right_desc = '1500 happy clients';

  fixture.content.field_flash_sale_product_desc = [
    {
      paragraph: {
        field_flash_sale_p_orientation: [
          {
            value: 'image_left'
          }
        ]
      },
      content: {
        field_flash_sale_p_title: 'Lorem ipsum',
        field_flash_sale_p_text: loremIpsum,
        field_flash_sale_p_image: [
          '<img src="//placehold.it/1920x1080">'
        ]
      }
    },
    {
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
          '<img src="//placehold.it/1920x1080">'
        ]
      }
    }
  ];

  return {
    demo: data.demo,
    fixtures: [fixture]
  };
};
