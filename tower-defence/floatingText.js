function FloatingText(x, y, text) {
  Phaser.BitmapText.call(this, game, x, y, 'font', text, 16, 'center');
  game.add.existing(this);
  game.textGroup.add(this)
}
FloatingText.prototype = Object.create(Phaser.BitmapText.prototype);

FloatingText.prototype.update = function() {
  this.y -= 1;
  this.alpha -= 0.01;
  if(this.alpha === 0) {
    this.destroy();
  }
};
