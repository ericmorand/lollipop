module.exports = function (plugin) {
  require('../../../../drupal/twig-extend')(plugin.twig);

  return {
    demo: {
      title: 'block/event-countdown demo',
      class: 'block--event-countdown--demo'
    },
    blocks: [
      {
        start_timestamp: 1488931200000,
        end_timestamp: 1490227200000,
        currentTimestamp: 1489931200000,
        event: {
          body: null,
          title: 'Without body',
          date_range: '23 - 30 March 2017'
        }
      },
      {
        start_timestamp: 1488931200000,
        end_timestamp: 1490227200000,
        currentTimestamp: 1489931200000,
        event: {
          body: 'Lorem ipsum',
          title: 'With body',
          date_range: '23 - 30 March 2017'
        }
      },
      {
        start_timestamp: 1490227200000,
        end_timestamp: 1488931200000,
        currentTimestamp: 1489931200000,
        event: {
          title: 'End timestamp lower than start timestamp',
          date_range: '23 - 30 March 2017'
        }
      }
    ]
  };
};
