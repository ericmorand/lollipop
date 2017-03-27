module.exports = {
  transform: [
    ['strictify'],
    ['stringify', {
      appliesTo: {
        includeExtensions: ['html']
      }
    }],
    ['aliasify', {
      aliases: {
        // 'three': '/home/ericmorandcross/Projects/tag-heuer/html/wide-event--design-implementation/src/components/block/event-countdown/js/lib/three70.js',
        // 'leapjs': '/home/ericmorandcross/Projects/tag-heuer/html/wide-event--design-implementation/src/components/block/event-countdown/js/lib/leap-0.6.4.js',
        // 'leapjs-plugins': '/home/ericmorandcross/Projects/tag-heuer/html/wide-event--design-implementation/src/components/block/event-countdown/js/lib/leap-plugins-0.1.10.js'
      }
    }]
  ],
  plugin: [
    [require('glslify-require')]
  ]
};
