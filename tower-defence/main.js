var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', { preload: preload, create: menuCreate, update: null }, false, false);
game.currentLevel = 0

function preload() {
  game.load.image('tower', 'assets/towers/SciFiTower01.png');
  game.load.image('towerl2', 'assets/towers/SciFiTower01L2.png');
  game.load.image('towerl3', 'assets/towers/SciFiTower01L3.png');
  game.load.image('slowTower', 'assets/towers/SciFiTower02.png');
  game.load.image('slowTowerl2', 'assets/towers/SciFiTower02L2.png');
  game.load.image('slowTowerl3', 'assets/towers/SciFiTower02L3.png');
  game.load.image('explosionTower', 'assets/towers/SciFiTower03.png');
  game.load.image('explosionTowerl2', 'assets/towers/SciFiTower03L2.png');
  game.load.image('explosionTowerl3', 'assets/towers/SciFiTower03L3.png');
  game.load.image('bullet', 'assets/bullets/SciFiProjectile01.png');
  game.load.image('gasterBullet', 'assets/bullets/SciFiProjectile01.png');
  game.load.image('slowBullet', 'assets/bullets/SciFiProjectile02.png');
  game.load.image('explosionBullet', 'assets/bullets/SciFiProjectile03.png');
  game.load.image('explosion', 'assets/bullets/explosion.png');
  game.load.spritesheet('enemy', 'assets/enemies/MLEnemy.png', 64, 64, 2);
  game.load.spritesheet('speeder', 'assets/enemies/SciFiEnemy02.png', 64, 64, 2);
  game.load.image('base', 'assets/tiles/Antenna.png');
  game.load.image('towerBaseI', 'assets/tiles/BuildPoint.png');

  game.load.image('towerMenuBackground', 'assets/towers/towerMenuBackground.png');
  game.load.image('towerMenuSelection', 'assets/towers/towerMenuSelection.png');

  game.load.image('tilesheet', 'assets/tilesheet.png');
  game.load.tilemap('level1', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('level2', 'levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.bitmapFont('font', 'assets/fonts/font3.png', 'assets/fonts/font3.fnt')

  game.load.image('mainMenuBackground', 'assets/menu/mainMenuBackground.png');
  game.load.image('newGameButton', 'assets/menu/BtnNewGame.png');
  game.load.image('continueButton', 'assets/menu/BtnContinue.png');

  game.load.image('endingBackground', 'assets/menu/endingBackground.png');
  game.load.image('mainMenuButton', 'assets/menu/BtnmMainMenu.png');

  game.load.audio('shoot', 'assets/sounds/blaster.wav');
  game.load.audio('gameOver', 'assets/sounds/GameOver.wav'); //Tile LayerObject Layer
}

function menuCreate() {
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  var background = game.add.sprite(0, 0, 'mainMenuBackground');

  var newGameButton = game.add.button(game.world.centerX, game.world.centerY, 'newGameButton', newGame);
  newGameButton.anchor.set(0.5, 0.5)

  var continueButton = game.add.button(game.world.centerX, game.world.centerY + 160, 'continueButton', continueGame);
  continueButton.anchor.set(0.5, 0.5)

  game.state.add('game', {preload: null, create: create, update: update});
  game.state.add('ending', {preload: null, create: endingCreate, update: null});
  game.state.add('mainMenu', {preload: null, create: menuCreate, update: null})
}

function newGame() {
  game.state.start('game');
}

function continueGame() {
  if(localStorage.getItem('level')) {
    game.currentLevel = localStorage.getItem('level');
  game.state.start('game');
  }
}

function endingCreate() {
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  var background = game.add.sprite(0, 0, 'endingBackground');

  var mainMenuButton = game.add.button(game.world.centerX, game.world.centerY, 'mainMenuButton', restartGame);
  mainMenuButton.anchor.set(0.5, 0.5)
}

function restartGame(){
  game.state.start('mainMenu');
}
