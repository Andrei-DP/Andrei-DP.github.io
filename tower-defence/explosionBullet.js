function ExplosionBullet(x, y, directionX, directionY, angle, damage) {
  Bullet.call(this, x, y, directionX, directionY, angle, damage);
  this.loadTexture('explosionBullet')
}

ExplosionBullet.prototype = Object.create(Bullet.prototype);

ExplosionBullet.prototype.update = function() {
  this.x += this.directionX;
  this.y += this.directionY;
  for(var i = 0; i < game.enemyList.length; i++) {
    if(collides(this, game.enemyList[i])) {
      this.explode();
      this.destroy();
    }
  }

  if(this.alive && !this.inWorld) {
    this.destroy();
  }

}

ExplosionBullet.prototype.explode = function() {
  var explosion = game.add.sprite(this.x, this.y, 'explosion');
  explosion.anchor.set(0.5, 0.5);
  for(var i = 0; i < game.enemyList.length; i++) {
    if(collides(explosion, game.enemyList[i])) {
      game.enemyList[i].blink();
      game.enemyList[i].hp -= this.damage
    }
  }

  game.time.events.add(100, function(){explosion.destroy();});
}
