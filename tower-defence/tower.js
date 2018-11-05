function Tower(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'tower');
  game.add.existing(this);
  this.anchor.set(0.5, 0.5);
  game.objectGroup.add(this);
  this.shootTimer = 0;
  this.shootTimerMax = 40;
  this.bulletSpeed = 19;
  this.bulletDamage = 2;
  this.range = 400;
  this.target = null;

  this.level = 1;
  this.inputEnabled = true;
  this.events.onInputDown.add(this.upgrade, this)
}

Tower.prototype = Object.create(Phaser.Sprite.prototype);

Tower.prototype.shoot = function() {
  var targetPosition = this.predictTargetPosition(this.target);
  var direction = Phaser.Point.subtract(targetPosition, this);
  direction.normalize();
  direction.multiply(this.bulletSpeed, this.bulletSpeed);

  var angle = Phaser.Math.angleBetweenPoints(this, targetPosition);
  angle = Phaser.Math.radToDeg(angle);
  this.angle = angle + 90;


  new Bullet(this.x, this.y, direction.x, direction.y, this.angle, this.bulletDamage);
};

Tower.prototype.update = function() {
  this.target = this.chooseTarget();
  if(this.shootTimer <= 0 && game.enemyList.length > 0 && this.target) {
    this.shoot();
    this.shootTimer = this.shootTimerMax;
  }
  this.shootTimer--;
};

Tower.prototype.predictTargetPosition = function(target) {
  var targetPosition = new Phaser.Point(target.x, target.y);
  for(var i = 0; i < 200; i++) {
    if(target.direction === "up") {
      targetPosition.y -= target.speed;
    }
    else if(target.direction === "down") {
      targetPosition.y += target.speed;
    }
    else if(target.direction === "left") {
      targetPosition.x -= target.speed;
    }
    else if(target.direction === "right") {
      targetPosition.x += target.speed;
    }
    var distanceToTarget = Phaser.Point.distance(this, targetPosition);
    if(distanceToTarget < i*this.bulletSpeed){
      return targetPosition
    }
  }
  return targetPosition
}

Tower.prototype.chooseTarget = function() {
  var targetEnemy = null
  for(var i = 0; i < game.enemyList.length; i++) {
    var checkEnemy = game.enemyList[i]
    var checkDistance = Phaser.Point.distance(this, checkEnemy)
    if(checkDistance < this.range){
      if(targetEnemy){
        if(checkEnemy.distanceTravelled > targetEnemy.distanceTravelled){
          targetEnemy = checkEnemy
        }
      }
      else {
        targetEnemy = checkEnemy;
      }
    }
  }
  return targetEnemy
}

Tower.prototype.upgrade = function() {
  if(this.level === 1){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 20);
      this.level = 2;
      game.money -= 20;
      this.loadTexture('towerl2');
      this.shootTimerMax = 30;
    }
  }
  else if(this.level === 2){
    if(game.money >= 20){
      new FloatingText(this.x, this.y, "-$" + 30);
      this.level = 3;
      game.money -= 30;
      this.loadTexture('towerl3');
      this.shootTimerMax = 20;
      this.range = 600
    }
  }
}
