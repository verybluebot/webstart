const StateMain = {
  preload: function() {
    game.load.spritesheet('dragon', 'assets/img/main/dragon.png', 120, 85, 4);
    game.load.image('background', 'assets/img/main/background.png');
    game.load.spritesheet('balloon', 'assets/img/main/thought.png');

    game.load.spritesheet('candy', 'assets/img/main/candy.png', 52, 50, 8);
  },

  create: function() {

    this.top = 0;
    score = 0;

    // Dragon
    this.dragon = game.add.sprite(0, 0, 'dragon');

    // create dragon animation
    this.dragon.animations.add('fly', [0,1,2,3], 12, true);
    this.dragon.animations.play('fly');

    // start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bottom = game.height - 146;

    // Background
    this.background = game.add.tileSprite(0, game.height - 480, game.width, 480, 'background');
    this.dragon.bringToTop();

    // Candies
    this.candies = game.add.group();
    this.candies.createMultiple(40, 'candy');
    this.candies.setAll('checkWorldBounds', true);
    this.candies.setAll('outOfBoundsKill', true);

    // thought
    this.ballon = game.add.image(0, 0, 'balloon');
    this.think = game.add.image(36, 26, 'candy');

    this.balloonGroup = game.add.group();
    this.balloonGroup.add(this.ballon);
    this.balloonGroup.add(this.think);

    this.balloonGroup.scale.x = 0.5;
    this.balloonGroup.scale.y = 0.5;

    this.balloonGroup.x = 50;

    // text
    this.scoreText = game.add.text(this.world.centerX, 90, '0');
    this.scoreText.fill = '#000';
    this.scoreText.fontSize = 64;
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreLabel = game.add.text(this.world.centerX, 40, 'Score');
    this.scoreLabel.fill = '#000';
    this.scoreLabel.fontSize = 32;
    this.scoreLabel.anchor.set(0.5, 0.5);

    game.physics.enable([this.dragon, this.candies], Phaser.Physics.ARCADE);

    this.dragon.body.gravity.y = 500;
    this.dragon.body.immovable = true;


    this.background.autoScroll(-100, 0);

    // set listeners
    this.setLisetners();

    // select the next candy to eat
    this.resetThink();
  },

  update: function() {
    game.physics.arcade.collide(this.dragon, this.candies, null, this.eatCandy, this);

    this.balloonGroup.y = this.dragon.y - 40;
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

  setLisetners: function() {
    game.time.events.loop(Phaser.Timer.SECOND, this.fireCandy, this);
  },

  resetThink: function() {
    const selectedCandy = game.rnd.integerInRange(0, 7);
    this.think.frame = selectedCandy;
  },

  eatCandy: function(dragon, candy) {
    if (candy.frame === this.think.frame) {

      candy.kill();
      score++;
      this.scoreText.text = score;
      this.resetThink();

    } else {
      candy.kill();
      game.state.start('StateGameOver');
      this.resetThink();
    }
  },

  fireCandy: function() {
    const candy = this.candies.getFirstDead();
    const yy = game.rnd.integerInRange(0, game.height - 90);
    const xx = game.width - 100;
    const type = game.rnd.integerInRange(0, 7);

    candy.frame = type;
    candy.reset(xx, yy);
    candy.enable = true;
    candy.body.velocity.x = -200;
  },

  flap: function() {
    this.dragon.body.velocity.y = -350;
  }
};
