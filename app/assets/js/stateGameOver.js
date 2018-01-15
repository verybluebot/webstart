/*!
 * hungry-dragon
 * Hungry dragon game made in Phaser
 * https://github.com/verybluebot
 * @author Blue Bot
 * @version 1.0.0
 * Copyright 2018. MIT licensed.
 */
'use strict';

var StateGameOver = {
  preload: function preload() {
    game.load.spritesheet('buttons', 'assets/img/ui/buttons.png', 265, 75);
    game.load.spritesheet('dragon', 'assets/img/main/dragon.png', 120, 85, 4);
  },

  create: function create() {

    this.replayButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'buttons', this.replay, this, 1, 0, 1);
    this.replayButton.anchor.set(0.5, 0.5);

    // Dragon
    this.dragon = game.add.sprite(game.world.centerX, game.world.centerY, 'dragon');
    this.dragon.anchor.add(0.5, 0.5);
    this.dragon.scale.x = -1;
    game.stage.backgroundColor = '#26c9ff';

    // create dragon animation
    this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
    this.dragon.animations.play('fly');
  },
  update: function update() {},

  replay: function replay() {
    game.state.start('StateMain');
  }
};