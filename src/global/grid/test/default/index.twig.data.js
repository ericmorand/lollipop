module.exports = function (plugin) {
  let blocks = [];

  for (let i = 0; i < 24; i++) {
    let color = (16700000 + (i * 2000)).toString(16);
    let length = color.length;
    let diff = 6 - length;

    for (let j = 0; j < diff; j++) {
      color = '0' + color;
    }

    blocks.push(
      {
        label: (i + 1),
        color: '#' + color
      }
    );
  }

  return {
    demo: {
      title: 'global/grid demo',
      class: 'global--grid--demo'
    },
    fixtures: [
      {
        blocks: blocks
      }
    ]
  }
};