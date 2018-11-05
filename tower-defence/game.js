function create() {

  //Scale the game to the device it's on
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  game.shoot = game.add.audio('shoot');
  game.gameOver = game.add.audio('gameOver');
  //game.gameOver.stop();

  game.enemyList = [];
  game.bumperList = [];

  game.objectGroup = game.add.group();
  game.textGroup = game.add.group();

  game.levels = ['level1', 'level2']
  game.map = game.add.tilemap(game.levels[game.currentLevel]);
  game.map.addTilesetImage('tilesheet', 'tilesheet');
  game.map.createLayer('Tile Layer 1');
  createMapObjects(game.map);

  game.money = 20;
  game.moneyText = game.add.bitmapText(25, 25, 'font', 'super');
  game.textGroup.add(game.moneyText);

  game.popupText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'a;sldkfjas;ldkfja;skldfj;askld');
  game.textGroup.add(game.popupText);
  game.popupText.anchor.set(0.5, 0.5);
  game.popupText.scale.set(3, 3);
  game.popupText.visible = false;

  game.victory = false;
  game.defeat = false;
  game.gameWon = false

  game.towerMenu = new TowerPicker(game.width, 0);

}

function update() {
  game.moneyText.text = '$' + game.money;

  game.world.bringToTop(game.objectGroup);
  game.world.bringToTop(game.textGroup);

  if(game.base.hp <= 0 && !game.victory) {
    game.popupText.scale.set(3, 3);
    game.popupText.visible = true;
    game.popupText.text = "GAME OVER!\nBut its not end!"
    game.popupText.align = "center"
    game.defeat = true
    //game.gameOver.play();
    for(i = 0; i < game.enemyList.length; i++) {
      game.enemyList[i].kill();
    }
  }

  if(game.enemyList.length <= 0 && !game.defeat && !game.victory) {
    game.popupText.scale.set(2.5, 2.5);
    game.popupText.visible = true;
    game.popupText.text = "CONGRATULATIONS!\nClick to next level"
    game.popupText.align = "center"
    game.victory = true;
    if(game.currentLevel < game.levels.length - 1){
      game.currentLevel++;
    } else {
      game.currentLevel = 0;
      game.gameWon = true;
    }
    localStorage.setItem('level', game.currentLevel);
  }

  if(game.input.activePointer.isDown) {
    if(game.gameWon){
      game.state.start('ending');
    } else if(game.victory || game.defeat) {
      game.state.restart();
    }
  }
}

function createMapObjects(map) {
  for(i = 0; i < map.objects["Object Layer 1"].length; i++) {
    var object = map.objects["Object Layer 1"][i];

    if(object.type === "bumper") {
      var newBumper = game.add.sprite(object.x, object.y, null);
      newBumper.width = object.width;
      newBumper.height = object.height;
      newBumper.direction = object.properties.direction;
      game.bumperList.push(newBumper);
    }

    if(object.gid === 88) {
      new Enemy(object.x + 32, object.y - 32)
    }

    if(object.gid === 77) {
      new Speeder(object.x + 32, object.y - 32)
    }

    if(object.gid === 75) {
      game.base = new Base(object.x + 32, object.y - 32)
    }

    if(object.gid === 91) {
      new TowerBase(object.x + 32, object.y - 32)
    }
  }
}
