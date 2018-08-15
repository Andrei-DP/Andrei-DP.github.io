function Enemy(x, y, speed, image) {

  Phaser.Sprite.call(this, game, x, y, image);

  game.enemyGroup.add(this);

  this.size = 40

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('walk')
  this.animations.play('walk', 4, true)

  this.speed = speed;

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.update = function() {

  this.x -= this.speed;
  if(this.x < -150)
  {
    this.destroy();
  }

  if(checkCollision(this, player) && !game.isGameOver)
  {
    if(player.safe)
    {
      for(var i = 0; i < 65; i++)
      {
        var particle = new ExplosionParticle(this.x, this.y, 'explosion', true);
      }

      var scrShake = new AutoScreenShake(30, 40, true);

      player.stopShield();
      this.destroy();
      game.blowUpSound.play();
    }
    else {
      gameOver();
    }
  }

};

function ZigZagger(x, y, speed) {

  Enemy.call(this, x, y, speed, 'zigZagEnemy');

}
ZigZagger.prototype = Object.create(Enemy.prototype)

ZigZagger.prototype.update = function() {

  Enemy.prototype.update.call(this);

  this.y = Math.sin(this.x * 0.01) * 225 + 300;

}

function Chaser(x, y, speed) {

  Enemy.call(this, x, y, speed, 'chaserEnemy')

  this.ySpeed = 0;

  this.maxSpeed = 5;

  this.acc = 0.1;

}

Chaser.prototype = Object.create(Enemy.prototype);

Chaser.prototype.update = function() {

  Enemy.prototype.update.call(this)

  if(this.y < player.y)
  {
    if(this.ySpeed < this.maxSpeed)
    {
      this.ySpeed += this.acc;
    }
  }
  else {
    if(this.ySpeed > -this.maxSpeed)
    {
      this.ySpeed -= this.acc;
    }
  }

  this.y += this.ySpeed;

}

function Speeder(y) {

  Enemy.call(this, 3000, y, 30, 'speederEnemy');

  this.warning = game.add.sprite(880, y, 'warning');
  this.warning.anchor.setTo(0.5, 0.5);
  this.warning.flash = function() {

    if(this.visible)
    {
      this.visible = false;
    }
    else {
      this.visible = true;
    }

    game.time.events.add(200, this.flash, this)

  }
  this.warning.flash()

  game.time.events.add(2000,
    function() {
      this.warning.destroy()
    },
    this
  );

}

Speeder.prototype = Object.create(Enemy.prototype);

Speeder.prototype.update = function() {

  Enemy.prototype.update.call(this);

  if(this.x < 900)
  {
    this.warning.destroy();
  }

}
