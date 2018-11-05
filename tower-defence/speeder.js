function Speeder(x, y) {
  Enemy.call(this, x, y);
  this.loadTexture('speeder');
  this.topSpeed = 6
  this.hp = 23
  this.value = 6;
}
Speeder.prototype = Object.create(Enemy.prototype);
