function TowerBase(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'towerBaseI');
  game.add.existing(this);
  this.anchor.set(0.5, 0.5);
  game.objectGroup.add(this);

  this.width = 64;
  this.height = 64;

  this.inputEnabled = true
  this.events.onInputDown.add(this.tap, this);

  this.cost = 10;
}

TowerBase.prototype = Object.create(Phaser.Sprite.prototype);

TowerBase.prototype.tap = function() {
  if(game.money >= this.cost)
  {
    new FloatingText(this.x, this.y, "-$" + this.cost);
    if(game.towerSelected === 0){
      new Tower(this.x, this.y);
    }
    else if(game.towerSelected === 1){
      new SlowTower(this.x, this.y);
    }
    else if(game.towerSelected === 2){
      new ExplosionTower(this.x, this.y);
    }
    this.destroy();
    game.money -= this.cost;
  }
}
