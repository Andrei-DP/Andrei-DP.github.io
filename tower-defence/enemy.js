function Enemy(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'enemy');
  this.animations.add('walk');
  this.animations.play('walk', 4, true);
  this.anchor.set(0.5, 0.5);
  game.objectGroup.add(this);
  game.add.existing(this);

  game.enemyList.push(this);


  this.topSpeed = 2
  this.speed = 3;
  this.angle = 90;

  this.direction = "right";

  this.hp = 25
  this.value = 5

  this.distanceTravelled = 0
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.update = function() {
  this.move()
  this.distanceTravelled += this.speed
  if(this.hp <= 0) {
    this.kill(true);
  }

  if(collides(this, game.base)) {
    game.base.hp -= 1
    game.camera.shake(0.005, 50);
    this.kill(false)
  }

  for(i = 0; i < game.bumperList.length; i++) {
    var bumper = game.bumperList[i]
    if(collides(this, bumper)) {
      this.hitBumper(bumper);
      this.direction = bumper.direction
    }
  }
  if(this.speed < this.topSpeed) {
    this.speed += 0.05;
  }
}

Enemy.prototype.kill = function(dropMoney) {
  if(dropMoney) {
    game.money += this.value;
    new FloatingText(this.x, this.y, "+$" + this.value);
  }
  if(game.base.hp <= 0){
    var explosion = game.add.sprite(this.x, this.y, 'explosion');
    game.time.events.add(150, function(){explosion.destroy();})
  }
  var index = game.enemyList.indexOf(this);
  game.enemyList.splice(index, 1);
  this.destroy();
}

Enemy.prototype.move = function() {

  if(this.direction === "up"){
    this.angle = 0;
    this.y -= this.speed;
  }
  else if(this.direction === "down"){
    this.angle = 180;
    this.y += this.speed;
  }
  else if(this.direction === "right"){
    this.angle = 90;
    this.x += this.speed;
  }
  else if(this.direction === "left"){
    this.angle = -90;
    this.x -= this.speed;
  }

}

Enemy.prototype.hitBumper = function(bumper) {
  this.direction = bumper.direction
}

Enemy.prototype.slow = function() {
  this.speed = this.topSpeed/10;
}

Enemy.prototype.blink = function() {
  this.alpha = 0.5;
  game.time.events.add(75, function(){this.alpha = 1;}, this);
}
