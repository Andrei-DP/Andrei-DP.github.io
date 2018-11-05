function codakidCheckCollision(object1, object2) {

  var obj1X = object1.x + object1.width/2;
  var obj1Y = object1.y + object1.height/2;
  var obj2X = object2.x + object2.width/2;
  var obj2Y = object2.y + object2.height/2;
  var distance = Phaser.Math.distance(obj1X, obj1Y, obj2X, obj2Y);
  if(distance < object1.size + object2.size)
  {
    return true;
  }
  else
    return false;
}

//Create global array for all effects
var effects = {

  effectList: [],

  update: function() {

    for(var i = 0; i < this.effectList.length; i++)
    {
      if(!this.effectList[i].dead)
        this.effectList[i].update();
      else {
        this.effectList.splice(i, 1);
      }
    }

  }

};

function AutoScreenShake(duration, magnitude, taper) {

  if(typeof duration === 'undefined') {duration = 5;}
  if(typeof magnitude === 'undefined') {magnitude = 20;}
  this.duration = duration;
  this.magnitude = magnitude;
  this.taper = taper;
  this.dead = false;
  effects.effectList.push(this);

}
AutoScreenShake.prototype.update = function() {
  if(this.duration > 0)
  {
    screenShake(this.magnitude);
    this.duration--;
    if(this.taper)
      this.magnitude *= 0.85;
  }
  else {
    stopShake();
    this.dead = true;
  }
};

function screenShake(magnitude) {

  if(typeof magnitude === 'undefined') {magnitude = 0;}
  var shakeX = game.rnd.integerInRange(-magnitude,magnitude);
  var shakeY = game.rnd.integerInRange(-magnitude,magnitude);
  game.world.setBounds(shakeX, shakeY, game.width+shakeX, game.height+shakeY);

}

function stopShake() {
  game.world.setBounds(0, 0, game.width, game.height);
}

function ExplosionParticle(x, y, image, irregular) {

  if(typeof irregular === 'undefined') {irregular = false;}

  if(irregular)
    this.speed = game.rnd.between(16, 24);
  else {
    this.speed = 20;
  }

  Phaser.Sprite.call(this, game, x, y, image);
  game.add.existing(this);
  this.xSpeed = game.rnd.between(-this.speed, this.speed);
  this.ySpeed = Math.sqrt(this.speed*this.speed - this.xSpeed*this.xSpeed) * game.rnd.pick([-1,1]);
  this.angle = Phaser.Math.angleBetween(0, 0, this.xSpeed, this.ySpeed) * (180/Math.PI) + 90;

}
ExplosionParticle.prototype = Object.create(Phaser.Sprite.prototype);

ExplosionParticle.prototype.update = function() {

  this.x += this.xSpeed;
  this.y += this.ySpeed;
  this.alpha -= 0.03;

  if(this.alpha <= 0)
    this.destroy();

};
