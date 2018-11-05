function shopPreload() {

}

function shopCreate() {

  var background = game.add.sprite(0, 0, 'shopBackground');

  var titleText = game.add.bitmapText(game.world.centerX, 100, 'font', 'shop')
  titleText.anchor.setTo(0.5, 0.5);
  titleText.scale.setTo(2.5, 2.5);

  var backButton = game.add.button(25, 25, 'backButton',
    function() {
      game.state.start('game');
    }
  );

  game.coinScoreText = game.add.bitmapText(960-25, 25, 'font', 'ha ha ha');
  game.coinScoreText.anchor.setTo(1, 0);

  var robot = new Skin(200, 400, 'player', 'robot', 0, 0);
  var chimp = new Skin(400, 400, 'chimp', 'monkey', 300, 1);
  var pirate = new Skin(600, 400, 'pirate', 'pirate', 600, 2);
  var superhero = new Skin(800, 400, 'superhero', 'superhero', 1000, 3);

}

function shopUpdate() {

  game.coinScoreText.text = 'coins ' + game.coinScore.toString();

}

function Skin(x, y, image, name, price, id) {

  Phaser.Sprite.call(this, game, x, y, image);

  game.add.existing(this);

  this.anchor.setTo(0.5, 0.5);

  this.nameText = game.add.bitmapText(this.x, this.y + 75, 'font', name);
  this.nameText.anchor.setTo(0.5, 0.5);
  this.nameText.scale.setTo(0.75, 0.75);

  this.price = price;

  this.purchased = game.skinList[id];

  if(!this.purchased)
  {
    this.lock = game.add.sprite(this.x, this.y, 'lock');
    this.lock.anchor.setTo(0.5, 0.5);

    this.priceText = game.add.bitmapText(this.x, this.y + 100, 'font', this.price.toString());
    this.priceText.anchor.setTo(0.5, 0.5);
    this.priceText.scale.setTo(0.75, 0.75);

  }

  this.inputEnabled = true;
  this.events.onInputDown.add(this.click, this);

  this.skinImage = image;
  this.id = id;

}

Skin.prototype = Object.create(Phaser.Sprite.prototype);

Skin.prototype.click = function() {

  if(this.purchased)
  {
    game.currentSkin = this.skinImage;
  }
  else {
    if(game.coinScore >= this.price)
    {
      game.coinScore -= this.price;
      this.lock.destroy();
      this.priceText.destroy();
      this.purchased = true;
      game.skinList[this.id] = true;
      saveGame();
    }
  }

}
