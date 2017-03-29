const Attribute = require('drupal-attribute');

module.exports = function (plugin, name) {
  require('../../../../../drupal/twig-extend')(plugin.twig, name);

  let fixture = {
    attributes: new Attribute(),
    content_attributes: new Attribute(),
    label: 'label',
    sku_nid: 'WBC1391.BH0745',
    get_current_language: function () {
      return function () {
        return 'get_current_language()';
      }
    },
    translate: function () {
      return function (data) {
        return 'translate(' + data + ')';
      }
    },
    check_commerce: function () {
      return function () {
        return 'check_commerce()';
      }
    },
    get_price: function () {
      return function (sku) {
        return {
          price: 'get_price(' + sku + ').price',
          availability: 'get_price(' + sku + ').availability'
        };
      }
    },
    content: {
      field_flash_sale_subtitle: 'content.field_flash_sale_subtitle',
      field_flash_sale_description: 'content.field_flash_sale_description',
      field_flash_sale_main_image: '<img src="http://placehold.it/1920x1080?text=content.field_flash_sale_main_image">',
      field_flash_sale_hashtag: 'content.field_flash_sale_hashtag',
      field_flash_sale_right_desc: 'content.field_flash_sale_right_desc',
      field_flash_sale_video: 'content.field_flash_sale_video',
      field_flash_sale_footer_title: 'content.field_flash_sale_footer_title',
      field_flash_sale_footer_text: 'content.field_flash_sale_footer_text',
      field_flash_sale_product_desc: 'content.field_flash_sale_product_desc',
      field_flash_sale_images: 'content.field_flash_sale_images'
    },
    node: {
      field_flash_sale_background: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/123456?text=node.field_flash_sale_background.entity.uri.value'
          }
        }
      },
      field_flash_sale_desc_background: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/543210?text=node.field_flash_sale_desc_background.entity.uri.value'
          }
        }
      },
      field_flash_sale_header_back_l: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/feda30?text=node.field_flash_sale_header_back_l.entity.uri.value'
          }
        }
      },
      field_flash_sale_header_back_tr: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/fee9d0?text=node.field_flash_sale_header_back_tr.entity.uri.value'
          }
        }
      },
      field_flash_sale_header_back_r: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/fef970?text=node.field_flash_sale_header_back_r.entity.uri.value'
          }
        }
      },
      field_flash_sale_header_back_c: {
        entity: {
          uri: {
            value: 'placehold.it/1920x1080/543210?text=node.field_flash_sale_header_back_c.entity.uri.value'
          }
        }
      },
      field_flash_sale_sku: {
        value: 'node.field_flash_sale_sku.value'
      },
      field_flash_sale_preview: {
        entity: {
          fileuri: 'node.field_flash_sale_preview.entity.fileuri'
        }
      },
      field_flash_sale_pdf_url_preview: {
        value: 'node.field_flash_sale_pdf_url_preview.value'
      }
    },
    form: 'form',
    popin_flashsale: 'popin_flashsale'
  };

  return {
    demo: {
      title: 'wide-flash-sale/node/wide-flash-sale-flash-sale demo',
      class: 'wide-flash-sale--node--wide-flash-sale-flash-sale--demo'
    },
    fixture: fixture
  };
};
