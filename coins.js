function Coin(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'coin');

  game.coinGroup.add(this);

  this.size = 25

  this.anchor.setTo(0.5, 0.5);

}
Coin.prototype = Object.create(Phaser.Sprite.prototype);

Coin.prototype.update = function() {

  this.x -= 4;

  if(checkCollision(this, player))
  {
    if(!game.isGameOver)
    {
      this.destroy();
      game.coinScore++;
      game.coinSound.play();
    }
  }

  if(player.magnetic && !game.isGameOver)
  {
    var distanceX = this.x - player.x;
    var distanceY = this.y - player.y;

    if(distanceX < 500)
    {
      this.x -= distanceX * 0.1;
      this.y -= distanceY * 0.1;
    }
  }

};

game.coinSpawner = {};

game.coinSpawner.zigzag = function(x, y) {

  var coin1 = new Coin(x, y);
  var coin2 = new Coin(x + 50, y - 50);
  var coin3 = new Coin(x + 100, y - 100);
  var coin1 = new Coin(x + 150, y - 50);
  var coin2 = new Coin(x + 200, y);
  var coin3 = new Coin(x + 250, y + 50);
  var coin1 = new Coin(x + 300, y + 100);
  var coin2 = new Coin(x + 350, y + 50);
  var coin3 = new Coin(x + 400, y);

}

game.coinSpawner.diamond = function(x, y) {

  var coin1 = new Coin(x, y);
  var coin2 = new Coin(x + 50, y + 50);
  var coin3 = new Coin(x + 50, y - 50);
  var coin1 = new Coin(x + 100, y + 100);
  var coin2 = new Coin(x + 100, y);
  var coin3 = new Coin(x + 100, y - 100);
  var coin1 = new Coin(x + 150, y + 50);
  var coin2 = new Coin(x + 150, y - 50);
  var coin3 = new Coin(x + 200, y);

}
