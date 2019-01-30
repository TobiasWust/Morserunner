var SelectLevelState = function () {};

SelectLevelState.prototype = {
init: function () {
	this.IconGroup = null;
	this.page = 1;
	this.scrolling = 0;
},
create: function () {
	this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        //var Text = game.add.text(16, 16, 'Select Level', { fontSize: '32px', fill: '#fff' });
        game.add.bitmapText(16, 16, 'garamond', 'Select Level', 32);     
        var levelnr = 0;
        this.IconGroup = this.game.add.group();
					
		for (var page=0; page < 3; page++) {
			for (var y=0; y < 3; y++) {
				for (var x=0; x < 5; x++) {			
					// calculate position on screen
					var xpos = 128 + (x*80) + (page * 640);
					var ypos = 80 + (y*80);
	
					//console.log(localStorage.getItem('progress'));
					var backicon = this.game.add.sprite(xpos, ypos, 'buttonbackground',6);
					if (levelnr <= localStorage.getItem('progress')) {
				        //var backicon = this.game.add.sprite(xpos, ypos, 'dude',6);
				        //if (levelnr==0) game.add.text(xpos+30, ypos+10, '0', { fontSize: '32px', fill: '#fff' });        
				        //game.add.text(xpos+30, ypos+10, levelnr, { fontSize: '32px', fill: '#fff' });         
				
						var label = game.add.bitmapText(xpos+backicon.width/2, ypos+backicon.height/2, 'garamond', String(levelnr), 32);     
						label.x = label.x - label.textWidth/2;
						label.y = label.y - label.textHeight/3;
						// keep level nr, used in onclick method
						backicon.level = levelnr;
						backicon.type = 'level';
		
						// add to IconGroup
						this.IconGroup.add(backicon);
					  	this.IconGroup.add(label);
					  
					  
						// input handler
						backicon.inputEnabled = true;
						backicon.input.useHandCursor = true;
						backicon.events.onInputDown.add(this.onSpriteDown, this);
						
					}
					else {
						var schloss = this.game.add.sprite(xpos+backicon.width/2, ypos+backicon.height/2, 'schloss');
						schloss.anchor.set(0.5);
						
						// add to IconGroup
						this.IconGroup.add(backicon);
					  	this.IconGroup.add(schloss);
					}
		                
	               levelnr = levelnr + 1;
				}
			}
		}
		
		this.animateLevelIcons();
		
		//var NextText = this.add.sprite(game.width-game.width/7, 64 + (100), 'nextbutton');
		var nextPage = this.add.sprite(game.width-game.width/9, game.height/2, 'nextbutton');
		nextPage.type = 'next';
		nextPage.anchor.set(0.5);
		nextPage.inputEnabled = true;
		nextPage.input.useHandCursor = true;
		nextPage.events.onInputDown.add(this.onSpriteDown, this);
		
		var lastPage = this.add.sprite(game.width/9, game.height/2, 'nextbutton');
		lastPage.type = 'last';
		lastPage.anchor.set(0.5);
		lastPage.scale.x *= -1;
		lastPage.inputEnabled = true;
		lastPage.input.useHandCursor = true;
		lastPage.events.onInputDown.add(this.onSpriteDown, this);
		
    },
    onSpriteDown: function (sprite) {
		console.log(this.scrolling);
    	if (sprite.type == 'next') {
    		//click animation
			this.game.add.tween(sprite.scale)
				.to({ x: 1.5, y: 1.5}, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
					
			if ( this.page < 3 ) {
				if ( this.scrolling == 0 ) {
	    			this.scrolling = 1;
	    			
					// scroll right animation
					var x = this.IconGroup.x;
					this.game.add.tween(this.IconGroup).to( {x: x-640}, 500, Phaser.Easing.Back.Out, true, (40))
						.onComplete.add(function () { this.scrolling = 0; },this);
					this.page++;
				}
			}
    	}
    	
    	if (sprite.type == 'last') {

			this.game.add.tween(sprite.scale)
				.to({ x: -1.5, y: 1.5}, 100, Phaser.Easing.Linear.None)
				.to({ x: -1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
					
			if ( this.page > 1 ) {
				if ( this.scrolling == 0 ) {
	    			this.scrolling = 1;
	    			
					// scroll left animation
					var x = this.IconGroup.x;
					this.game.add.tween(this.IconGroup).to( {x: x+640}, 500, Phaser.Easing.Back.Out, true, (40))
						.onComplete.add(function () { this.scrolling = 0; },this);
					this.page--;
    			}
			}
			else {
				game.state.start('Menu', true, false, level);  
			}
    	}
    	
    	if (sprite.type == 'level') {
      	level = sprite.level;
      	game.state.start('Game', true, false, level);  
    	}
      
    },
      
	animateLevelIcons: function() {

		// slide all icons into screen
			this.IconGroup.y = this.IconGroup.y + 600;
			var y = this.IconGroup.y;

			// tween animation
			this.game.add.tween(this.IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (40));
	},
};