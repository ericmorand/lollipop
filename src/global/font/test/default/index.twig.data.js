module.exports = function (plugin) {
  let sampleContent = 'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.';

  let fonts = [
    {
      name: 'Primary',
      mixin: 'PrimaryFont',
      styles: [
        'normal',
        'italic'
      ],
      weights: [
        '100',
        'normal',
        '700'
      ],
      content: sampleContent
    }
  ];

  return {
    demo: {
      title: 'global/font demo',
      class: 'global--font--demo'
    },
    fonts: fonts
  };
};
