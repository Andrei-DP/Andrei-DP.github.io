function spawnEnemy() {

  var x = 1000;
  var y = game.rnd.between(50, 590);
  var speed = game.rnd.between(4, 10);
  var image = 'enemy' + game.rnd.between(1, 3);
  var enemyType = game.rnd.between(1, 100);

  if(enemyType < 50)
  {
    var enemy = new Enemy(x, y, speed, image);
  }
  else if(enemyType < 80)
  {
    var zig = new ZigZagger(x, y, speed);
  }
  else if(enemyType < 100)
  {
    var chaser = new Chaser(x, y, speed);
  }
  else
  {
    var speeder = new Speeder(y);
  }
  var time;

  if(game.score < 15) {
    time = 3000
  }
  else if(game.score < 30) {
    time = 2500
  }
  else if(game.score < 45) {
    time = 2000
  }
  else if(game.score < 60) {
    time = 1500
  }
  else {
    time = 1000
  }

  game.time.events.add(time, spawnEnemy, this);

  console.log(time, game.score)

}

function checkCollision(object1, object2) {

  var distance = Phaser.Math.distance(object1.x, object1.y, object2.x, object2.y);

  if(distance <= object1.size + object2.size)
  {
    return true;
  }
  else {
    return false;
  }

}

function gameOver() {

  game.background.tint = 0xFF0000;

  player.destroy();

  game.gameOverText.visible = true;

  game.shopButton.visible = true;
  game.shopButton.text.visible = true;

  game.isGameOver = true;

  if (game.score > game.highScore) {

    game.highScore = game.score;
    game.highScoreText.text = 'Best ' + game.highScore;

  }

  game.loseSound.play();

  saveGame()

}

function restart() {

  game.background.tint = 0xFFFFFF;

  makePlayer();

  game.gameOverText.visible = false;

  game.shopButton.visible = false;
  game.shopButton.text.visible = false;

  game.isGameOver = false;

  game.score = 0;

  while(game.enemyGroup.length)
  {
    game.enemyGroup.getTop().destroy();
  }

  while(game.coinGroup.length > 0)
  {
    game.coinGroup.getTop().destroy();
  }

}

function increaseScore() {

  if(!game.isGameOver)
  {
    game.score++;
  }

  game.time.events.add(1000, increaseScore, this);

}

function spawnCoins() {

  var randomNumber = game.rnd.between(1, 2);
  var randomY = game.rnd.between(100, 550);

  if(randomNumber === 1)
  {
    game.coinSpawner.zigzag(1000, randomY);
  }
  if(randomNumber === 2) {
    game.coinSpawner.diamond(1000, randomY);
  }

  game.time.events.add(5000, spawnCoins, this);

}

function spawnPowerup() {

  randY = game.rnd.between(50, 590);
  randPowerup = game.rnd.between(1, 3)

  if(randPowerup === 1)
  {
    var shield = new Shield(1000, randY)
  }
  if(randPowerup === 2)
  {
    var cnMagnet = new CoinMagnet(1000, randY)
  }
  if(randPowerup === 3)
  {
    var boom = new Boom(1000, randY)
  }

  var time = game.rnd.between(10000, 15000);

  game.time.events.add(time, spawnPowerup, this);

}

function saveGame() {

  localStorage.setItem('robotHighScore', game.highScore);
  localStorage.setItem('robotCoinScore', game.coinScore);
  localStorage.setItem('robotSkinList', JSON.stringify(game.skinList));

}
