function Base(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'base');
  game.add.existing(this);
  this.anchor.set(0.5, 0.5);
  game.objectGroup.add(this);


  this.hp = 10;
  this.healthBar = game.add.graphics(this.x, this.y)
  this.shakeOn = false
}
Base.prototype = Object.create(Phaser.Sprite.prototype)

Base.prototype.update = function() {
  this.healthBar.beginFill(0xFF0000);
  this.healthBar.drawRect(-40, -50, 80, 10);

  this.barWidth = this.hp/10 *80;
  this.healthBar.beginFill(0x00FF00);
  this.healthBar.drawRect(-40, -50, this.barWidth, 10);
}
