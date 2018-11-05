function ExplosionTower(x, y) {
  Tower.call(this, x, y)
  this.loadTexture('explosionTower')
  this.shootTimerMax = 65;
  this.bulletDamage = 4
}

ExplosionTower.prototype = Object.create(Tower.prototype)

ExplosionTower.prototype.shoot = function() {
  var targetPosition = this.predictTargetPosition(this.target);
  var direction = Phaser.Point.subtract(targetPosition, this);
  direction.normalize();
  direction.multiply(this.bulletSpeed, this.bulletSpeed);

  var angle = Phaser.Math.angleBetweenPoints(this, targetPosition);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;


  new ExplosionBullet(this.x, this.y, direction.x, direction.y, this.angle, this.bulletDamage);
};

ExplosionTower.prototype.upgrade = function() {
  if(this.level === 1){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 20);
      this.level = 2;
      game.money -= 20;
      this.loadTexture('explosionTowerl2');
      this.shootTimerMax = 75;
      this.bulletDamage = 6
      this.range = 500
    }
  }
  else if(this.level === 2){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 30);
      this.level = 3;
      game.money -= 30;
      this.loadTexture('explosionTowerl3');
      this.shootTimerMax = 85;
      this.bulletDamage = 9
    }
  }
}
