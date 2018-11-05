function SlowTower(x, y) {
  Tower.call(this, x, y);
  this.loadTexture('slowTower')
  this.bulletDamage = 0.5;
  this.shootTimerMax = 20
  this.range = 200
}
SlowTower.prototype = Object.create(Tower.prototype);

SlowTower.prototype.shoot = function() {
  var targetPosition = this.predictTargetPosition(this.target);
  var direction = Phaser.Point.subtract(targetPosition, this);
  direction.normalize();
  direction.multiply(this.bulletSpeed, this.bulletSpeed);

  var angle = Phaser.Math.angleBetweenPoints(this, targetPosition);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;


  new SlowBullet(this.x, this.y, direction.x, direction.y, this.angle, this.bulletDamage);
};

SlowTower.prototype.upgrade = function() {
  if(this.level === 1){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 20);
      this.level = 2;
      game.money -= 20;
      this.loadTexture('slowTowerl2');
      this.shootTimerMax = 15;
      this.bulletDamage = 0.4
    }
  }
  else if(this.level === 2){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 30);
      this.level = 3;
      game.money -= 30;
      this.loadTexture('slowTowerl3');
      this.shootTimerMax = 3;
      this.bulletDamage = 0.2
    }
  }
}
