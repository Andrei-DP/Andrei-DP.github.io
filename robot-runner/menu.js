function menuPreload() {

  game.load.spritesheet('player', 'assets/players/robot_blue.png', 114, 114);
  game.load.spritesheet('chimp', 'assets/players/chimp.png', 114, 114);
  game.load.spritesheet('astronaut', 'assets/players/astronaut_blue.png', 114, 114);
  game.load.spritesheet('pirate', 'assets/players/pirate_blue.png', 114, 114);
  game.load.spritesheet('superhero', 'assets/players/superhero_male.png', 114, 114);

  game.load.spritesheet('enemy1', 'assets/enemies/chomper.png', 114, 114);
  game.load.spritesheet('enemy2', 'assets/enemies/ghost.png', 114, 114);
  game.load.spritesheet('zigZagEnemy', 'assets/enemies/bat.png', 114, 114);
  game.load.spritesheet('enemy3', 'assets/enemies/zombie.png', 114, 114);
  game.load.spritesheet('chaserEnemy', 'assets/enemies/octopus.png', 114, 114);
  game.load.spritesheet('speederEnemy', 'assets/enemies/mine.png', 114, 114);
  game.load.image('warning', 'assets/ui/warning.png');

  game.load.image('background', 'assets/backgrounds/background4.png');
  game.load.image('shopBackground', 'assets/backgrounds/background3.png');

  game.load.bitmapFont('font', 'assets/fonts/font5.png', 'assets/fonts/font5.fnt');

  game.load.image('coin', 'assets/pickups/coin1.png');

  game.load.image('shield', 'assets/pickups/powerup2.png');
  game.load.image('magnet', 'assets/pickups/powerup1.png');
  game.load.image('boom', 'assets/pickups/powerup3.png')

  game.load.image('explosion', 'assets/effects/laserRed01.png')

  game.load.audio('mainMusic', 'assets/music/ScourgeOfUniverse.mp3');
  game.load.audio('coinSound', 'assets/soundFX/coin1.mp3');
  game.load.audio('lose', 'assets/soundFX/WarpJingle.mp3');
  game.load.audio('blowUp', 'assets/soundFX/fire.mp3');

  game.load.image('button', 'assets/ui/blankButton.png');
  game.load.image('backButton', 'assets/ui/back.png');
  game.load.image('lock', 'assets/ui/lock.png');

}

function menuCreate() {

  game.state.add('menu', menuState);
  game.state.add('game', gameState);
  game.state.add('shop', shopState)

  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  game.menuBackground = game.add.tileSprite(0, 0, 960, 640, 'background');

  var menuText = game.add.bitmapText(game.world.centerX, 175, 'font', 'ROBOT RUNNER');
  menuText.anchor.setTo(0.5, 0.5);
  menuText.scale.setTo(2.5, 2.5);

  var playButton = game.add.button(game.world.centerX, game.world.centerY, 'button',
    function() {
      game.state.start('game')
    }
  );

  playButton.anchor.setTo(0.5, 0.5);
  var playButtonText = game.add.bitmapText(playButton.x, playButton.y - 10, 'font', 'play');
  playButtonText.anchor.setTo(0.5, 0.5);
  playButtonText.scale.setTo(1.25, 1.25)


  if(!localStorage.getItem('robotSkinList'))
  {
    game.skinList = [true, false, false, false];
  }
  else {
    game.skinList = JSON.parse(localStorage.getItem('robotSkinList'));
  }
  game.currentSkin = 'player';

}

function menuUpdate() {

  game.menuBackground.tilePosition.x -= 2;

}
