const StateStartGame = {
  preload: function () {
    game.load.spritesheet('buttons', 'assets/img/ui/buttons.png', 265, 75);
    game.load.spritesheet('dragon', 'assets/img/main/dragon.png', 120, 85, 4);

  },

  create: function () {

    this.startButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'buttons', this.start, this, 6, 7, 6);
    this.startButton.anchor.set(0.5, 0.5);

    // Dragon
    this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, 'dragon');
    this.dragon.anchor.add(0.5, 0.5);
    this.dragon.scale.x = -1;
    game.stage.backgroundColor = '#26c9ff';

    // create dragon animation
    this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
    this.dragon.animations.play('fly');

    // text
    this.titleText = game.add.text(game.world.centerX, 60, 'Hungry Dragon', {
      font: '50px Roboto Condensed',
      fill: '#00D900',
      stroke: '#222',
      strokeThickness: 4,
      align: 'center'
    });

    this.titleText.anchor.set(0.5, 0.5);
  },

  update: function() {

  },

  start: function() {
    game.state.start('StateMain');
  }
};
