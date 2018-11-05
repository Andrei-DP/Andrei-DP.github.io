var gameState = {preload: preload, create: create, update: update}
var menuState = {preload: menuPreload, create: menuCreate, update: menuUpdate}
var shopState = {preload: shopPreload, create: shopCreate, update: shopUpdate}

//This first line creates our game object.
var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', menuState);
var player;

//Load all of your textures and sounds
function preload() {



}

//Do all of your initial setup
function create() {

  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  game.mainMusic = game.add.audio('mainMusic');
  game.coinSound = game.add.audio('coinSound');
  game.loseSound = game.add.audio('lose');
  game.blowUpSound = game.add.audio('blowUp');

  game.mainMusic.play('', 0, 0.5, true);

  game.background = game.add.tileSprite(0, 0, 960, 640, 'background');

  game.enemyGroup = game.add.group();
  game.coinGroup = game.add.group();

  makePlayer();

  spawnCoins();

  spawnPowerup();

  game.gameOverText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'Game Over\nTap to Restart');
  game.gameOverText.anchor.setTo(0.5, 0.5);
  game.gameOverText.align = 'center';
  game.gameOverText.visible = false;

  game.shopButton = game.add.button(game.world.centerX, game.world.centerY + 100, 'button',
    function() {
      game.state.start('shop');
      game.mainMusic.stop();
    }
  );

  game.shopButton.anchor.setTo(0.5, 0.5);
  game.shopButton.text = game.add.bitmapText(game.shopButton.x, game.shopButton.y - 10, 'font', 'SHOP')
  game.shopButton.text.anchor.setTo(0.5, 0.5);
  game.shopButton.visible = false;
  game.shopButton.text.visible = false;

  game.score = 0;
  game.scoreText = game.add.bitmapText(25, 25, 'font', 'bla bla bla');
  increaseScore();

  if(!localStorage.getItem('robotHighScore'))
  {
    game.highScore = 0;
  }
  else {
    game.highScore = localStorage.getItem('robotHighScore');
  }
  game.highScoreText = game.add.bitmapText(25, 60, 'font', 'Best ' + game.highScore.toString());
  game.highScoreText.scale.setTo(0.75, 0.75);


  if(!localStorage.getItem('robotCoinScore'))
  {
    game.coinScore = 0;
  }
  else {
    game.coinScore = localStorage.getItem('robotCoinScore');
  }
  game.coinScoreText = game.add.bitmapText(960-25, 25, 'font', 'ha ha ha');
  game.coinScoreText.anchor.setTo(1, 0);

  spawnEnemy();

}

//Write all of your continuous game logic here
function update() {

  game.background.tilePosition.x -= 4;

  if(game.input.activePointer.justPressed() && game.isGameOver)
  {
    restart();
  }

  game.scoreText.text = 'Score ' + game.score.toString();
  game.coinScoreText.text = 'Coins ' + game.coinScore.toString();

  effects.update();

}
