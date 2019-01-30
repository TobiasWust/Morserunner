var FinalState = function () {};

FinalState.prototype = {
  create: function () {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.TextGroup = this.game.add.group();
    
    var Text = game.add.bitmapText(game.width/2, 16, 'garamond','You are the',64);
    Text.x = Text.x - Text.textWidth/2;
    this.TextGroup.add(Text);
    var Text = game.add.bitmapText(game.width/2, 80, 'garamond','MorseRunner!',64);
    Text.x = Text.x - Text.textWidth/2;
    this.TextGroup.add(Text);
    
    var Text = game.add.text(game.width/2-80, 160, 'Game by Tobias Wust', { fill: '#ff0' });
    this.TextGroup.add(Text);
    var Text = game.add.text(game.width/2-80, 200, 'http://tobiaswust.de', { fill: '#ff0' });
    this.TextGroup.add(Text);
    
    var Text = game.add.text(16, 280, 'Cheats: bigsam marathon gonzales bouncy', { fill: '#ff0' });
    this.TextGroup.add(Text);
    
    this.scrollText();
  },
  scrollText: function() {

		// slide all icons into screen
			this.TextGroup.y = this.TextGroup.y + 600;
			var y = this.TextGroup.y;

			// tween animation
			this.game.add.tween(this.TextGroup).to( {y: y-600}, 10000, Phaser.Easing.Linear.None, true, (40))
			    .onComplete.add(function () { this.ready = 1; },this);
	},
	update: function () {
	    if (game.input.activePointer.isDown && this.ready == 1) game.state.start('Menu');  
	}
};