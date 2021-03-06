module.exports = function (plugin) {
  let data = require('../default/index.twig.data')(plugin);

  let sampleContent = 'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.';

  let fonts = [
    {
      name: 'Secondary',
      mixin: 'SecondaryFont',
      styles: [
        'normal',
        'italic'
      ],
      weights: [
        'normal',
        '700'
      ],
      content: sampleContent
    }
  ];

  return {
    demo: data.demo,
    fonts: fonts
  };
};
