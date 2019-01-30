var WinState = function () {};

WinState.prototype = {
  create: function () {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    
    var Text = game.add.bitmapText(game.width/2, game.height/3-64, 'garamond','You Win!',64);
    Text.x = Text.x - Text.textWidth/2;
    //var Text = game.add.text(game.width/2, game.height/2-32, 'You Win!', { fill: '#fff' });
    //Text.anchor.set(0.5);
    
    if (level != 'leveleditor') {
      //var NextText = game.add.text(game.width/2, game.height/3+130, 'Next Level', { fill: '#fff' });
      var NextText = this.add.sprite(game.width/2, game.height/3+150, 'nextbutton');
      NextText.anchor.set(0.5);
      NextText.inputEnabled = true;
  		NextText.input.useHandCursor = true;
  	  NextText.events.onInputDown.add(function () { 
  	    level++;
  	    game.state.start('Game', true, false, level); 
  	  }, this);
    }

    //var SLText = game.add.text(game.width/3*2, game.height/2+32, 'Select Level', { fill: '#fff' });
    var SLText = this.add.sprite(game.width/7*4, game.height/3+64, 'levelselectbutton');
    SLText.anchor.set(0.5);	  
	  SLText.inputEnabled = true;
		SLText.input.useHandCursor = true;
	  SLText.events.onInputDown.add(function () { game.state.start('SelectLevel'); }, this);
	  
	  //var RetryText = game.add.text(game.width/2, game.height/2+100, 'Retry', { fill: '#fff' });
	  var RetryText = this.add.sprite(game.width/7*3, game.height/3+64, 'retrybutton');
    RetryText.anchor.set(0.5);
    RetryText.inputEnabled = true;
		RetryText.input.useHandCursor = true;
	  RetryText.events.onInputDown.add(function () { game.state.start('Game', true, false, level); }, this);
    
    if (level == localStorage.getItem('progress')) { localStorage.setItem('progress',level+1); }
    
  },
};