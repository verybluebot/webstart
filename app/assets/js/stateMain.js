/*!
 * hungry-dragon
 * Hungry dragon game made in Phaser
 * https://github.com/verybluebot
 * @author Blue Bot
 * @version 1.0.0
 * Copyright 2018. MIT licensed.
 */
'use strict';

var StateMain = {
  preload: function preload() {
    game.load.spritesheet('dragon', 'assets/img/main/dragon.png', 120, 85, 4);
    game.load.image('background', 'assets/img/main/background.png');
  },

  create: function create() {

    this.top = 0;

    // Dragon
    this.dragon = game.add.sprite(0, 0, 'dragon');

    // create dragon animation
    this.dragon.animations.add('fly', [0, 1, 2, 3], 12, true);
    this.dragon.animations.play('fly');

    // start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bottom = game.height - 146;

    // Background
    this.background = game.add.tileSprite(0, game.height - 480, game.width, 480, 'background');
    this.dragon.bringToTop();

    game.physics.enable(this.dragon, Phaser.Physics.ARCADE);

    this.dragon.body.gravity.y = 500;

    this.background.autoScroll(-100, 0);
  },

  update: function update() {

    if (game.input.activePointer.isDown) {
      this.flap();
    }

    if (this.dragon.y < this.top) {
      this.dragon.y = this.top;
      this.dragon.body.velocity.y = 0;
    }

    if (this.dragon.y > this.bottom) {
      this.dragon.y = this.bottom;
      this.dragon.body.gravity.y = 0;
    } else {
      this.dragon.body.gravity.y = 500;
    }
  },

  flap: function flap() {
    this.dragon.body.velocity.y = -350;
  }
};