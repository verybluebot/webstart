let game;

window.onload = () => {
  if (screen.width > 1000) {
    game = new Phaser.Game(640, 480, Phaser.AUTO, 'ph_game');
  } else {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'ph_game');
  }

  game.state.add('StateMain', StateMain);
  game.state.start('StateMain');
};
