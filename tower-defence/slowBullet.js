function SlowBullet(x, y, directionX, directionY, angle, damage) {
  Bullet.call(this, x, y, directionX, directionY, angle, damage);
  this.loadTexture('slowBullet');
}
SlowBullet.prototype = Object.create(Bullet.prototype);

SlowBullet.prototype.update = function() {
  this.x += this.directionX;
  this.y += this.directionY;
  for(var i = 0; i < game.enemyList.length; i++) {
    if(collides(this, game.enemyList[i])) {
      game.enemyList[i].blink();
      game.enemyList[i].hp -= this.damage;
      game.enemyList[i].slow()
      this.destroy();
    }
  }

  if(this.alive && !this.inWorld) {
    this.destroy();
  }

}
