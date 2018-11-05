function Bullet(x, y, directionX, directionY, angle, damage) {
  Phaser.Sprite.call(this, game,x, y, 'gasterBullet');
  game.add.existing(this)
  this.anchor.set(0.5, 0.5);
  game.objectGroup.add(this);
  this.directionX = directionX;
  this.directionY = directionY;

  this.damage = damage;

  this.angle = angle
  game.shoot.play();
}
Bullet.prototype = Object.create(Phaser.Sprite.prototype);

Bullet.prototype.update = function() {
  this.x += this.directionX;
  this.y += this.directionY;
  for(var i = 0; i < game.enemyList.length; i++) {
    if(collides(this, game.enemyList[i])) {
      game.enemyList[i].hp -= this.damage;
      game.enemyList[i].blink();
      this.destroy();
    }
  }

  if(this.alive && !this.inWorld) {
    this.destroy();
  }

}
