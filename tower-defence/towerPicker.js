function TowerPicker(x, y) {
  game.towers = ['tower', 'slowTower', 'explosionTower'];
  game.towerSelected = 0;
  game.towerButtons = [];

  var buttonX = x;
  var buttonY = y;

  for(var i = 0; i < game.towers.length; i++) {
    game.towerButtons[i] = game.add.button(buttonX, buttonY, 'towerMenuBackground', this.pickTower, {towerNum: i});
    game.towerButtons[i].anchor.set(1, 0);
    var towerSprite = game.add.sprite(game.towerButtons[i].centerX, game.towerButtons[i].centerY, game.towers[i]);
    towerSprite.anchor.set(0.5, 0.5);
    buttonY += 70;
  }

  game.towerSelection = game.add.sprite(x, y, 'towerMenuSelection');
  game.towerSelection.anchor.set(1, 0);
}

TowerPicker.prototype.pickTower = function(towerNum) {
  game.towerSelection.y = game.towerButtons[this.towerNum].y;
  game.towerSelected = this.towerNum;
}
