function Shield(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'shield');

  game.add.existing(this);

  this.size = 30;

  this.anchor.setTo(0.5, 0.5);

}

Shield.prototype = Object.create(Phaser.Sprite.prototype);

Shield.prototype.update = function() {

  this.x -= 4

  if(checkCollision(this, player))
  {
    player.shield();
    this.destroy();
  }

}

function CoinMagnet(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'magnet');

  game.add.existing(this);

  this.size = 30;

  this.anchor.setTo(0.5, 0.5);

}

CoinMagnet.prototype = Object.create(Phaser.Sprite.prototype);

CoinMagnet.prototype.update = function() {

  this.x -= 4;

  if(checkCollision(this, player))
  {
    this.destroy();
    player.magnet()
  }

};

function Boom(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'boom');

  game.add.existing(this);

  this.size = 30;

  this.anchor.setTo(0.5, 0.5);

}
Boom.prototype = Object.create(Phaser.Sprite.prototype)

Boom.prototype.update = function() {

  this.x -= 4;

  if(checkCollision(this, player))
  {
    this.destroy();
    this.destroyEnemies();
  }

}

Boom.prototype.destroyEnemies = function() {

  while(game.enemyGroup.length)
  {
    for(var i = 0; i < 65; i++)
    {
      var particle = new ExplosionParticle(game.enemyGroup.getTop().x, game.enemyGroup.getTop().y, 'explosion', true);
    }

    var scrShake = new AutoScreenShake(30, 80, true);

    game.enemyGroup.getTop().destroy()

    game.blowUpSound.play();
  }

}
