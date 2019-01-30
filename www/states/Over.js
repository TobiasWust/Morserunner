var OverState = function () {

    };

OverState.prototype = {
  create: function () {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    
    var Text = game.add.bitmapText(game.width/2, game.height/3-64, 'garamond','Game Over',64);
    Text.x = Text.x - Text.textWidth/2;
    //var Text = game.add.text(game.width/2, game.height/2-32, 'Game Over', { fill: '#fff' });
    //Text.anchor.set(0.5);
    
    var RetryText = this.add.sprite(game.width/7*3, game.height/3+64, 'retrybutton');
    //var RetryText = game.add.text(game.width/3, game.height/2+32, 'Retry', { fill: '#fff' });
    RetryText.anchor.set(0.5);
    RetryText.inputEnabled = true;
		RetryText.input.useHandCursor = true;
	  RetryText.events.onInputDown.add(function () { game.state.start('Game', true, false, level); }, this);
	  
	  var SLText = this.add.sprite(game.width/7*4, game.height/3+64, 'levelselectbutton');
	  //var SLText = game.add.text(game.width/3*2, game.height/2+32, 'Select Level', { fill: '#fff' });
    SLText.anchor.set(0.5);
	  SLText.inputEnabled = true;
		SLText.input.useHandCursor = true;
	  SLText.events.onInputDown.add(function () { game.state.start('SelectLevel'); }, this);
    
  },
};