/*!
 * hungry-dragon
 * Hungry dragon game made in Phaser
 * https://github.com/verybluebot
 * @author Blue Bot
 * @version 1.0.0
 * Copyright 2018. MIT licensed.
 */
'use strict';

var game = void 0;

window.onload = function () {
  if (screen.width > 1000) {
    game = new Phaser.Game(640, 480, Phaser.AUTO, 'ph_game');
  } else {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'ph_game');
  }

  game.state.add('StateMain', StateMain);
  game.state.start('StateMain');
};