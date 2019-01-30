var LevelEditorState = function () {};

LevelEditorState.prototype = {
init: function () {
	this.IconGroup = null;
	this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ .-?()'.split('');
	if(localStorage.getItem('leveleditor') === null){
        localStorage.setItem('leveleditor','');
    }  
},
create: function () {
	this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
       /* this.LevelText = game.add.text(game.width - 16, 16, localStorage.getItem('leveleditor'), { fill: '#fff' });
        this.LevelText.anchor.set(1,0);
        this.LevelText.setTextBounds(10,10,100,100); */

        game.add.bitmapText(16, 16, 'garamond', 'LevelEditor', 32);     
    /*    var levelnr = 0;
        this.IconGroup = this.game.add.group();

			for (var y=0; y < 4; y++) {
				for (var x=0; x < 8; x++) {			
					// calculate position on screen
					var xpos = (x*70);
					var ypos = 70 + (y*70);
	
					//console.log(localStorage.getItem('progress'));
					var backicon = this.game.add.sprite(xpos, ypos, 'buttonbackground');
					backicon.anchor.set(0.5);
					backicon.x += backicon.width/2;
					backicon.y += backicon.height/2;
				
					var label = game.add.bitmapText(xpos+backicon.width/2, ypos+backicon.height/2, 'garamond', String(this.alphabet[levelnr]), 32);     
					label.x = label.x - label.textWidth/2;
					label.y = label.y - label.textHeight/3;
					// keep level nr, used in onclick method

					// add to IconGroup
					this.IconGroup.add(backicon);
				  	this.IconGroup.add(label);
				  
				  
					// input handler
					backicon.inputEnabled = true;
					backicon.input.useHandCursor = true;
					backicon.events.onInputDown.add(this.onSpriteDown, this);
 
	               levelnr = levelnr + 1;
				}
			}
		
		this.animateLevelIcons(); */
		
		
		//var NextText = this.add.sprite(game.width-game.width/7, 64 + (100), 'nextbutton');
		var bntPlay = this.add.sprite(game.width-40, game.height/3, 'nextbutton');
		bntPlay.anchor.set(0.5);
		bntPlay.inputEnabled = true;
		bntPlay.type = 'play';
		bntPlay.input.useHandCursor = true;
		bntPlay.events.onInputDown.add(this.onSpriteDown, this);
		
		var btnLvl = this.add.sprite(game.width-40, game.height/3*2, 'levelselectbutton');
		btnLvl.anchor.set(0.5);
		btnLvl.inputEnabled = true;
		btnLvl.type = 'lvl';
		btnLvl.input.useHandCursor = true;
		btnLvl.events.onInputDown.add(this.onSpriteDown, this); 
		
		this.myInput = this.createInput(game.width/2, game.height/3);
        this.myInput.anchor.set(0.5);
        this.myInput.canvasInput.value(localStorage.getItem('leveleditor'));
        this.myInput.canvasInput.focus();
        
        //var btnEasy = game.add.text(game.width/4, game.height/3*2, 'Easy', { fill: '#FFF' });
        var btnEasy = game.add.bitmapText(game.width/4, game.height/3*2, 'garamond', 'Easy', 32);     
	      btnEasy.x -= btnEasy.width/2;
	      btnEasy.y -= btnEasy.height/2;
	      btnEasy.inputEnabled = true;
	      btnEasy.input.useHandCursor = true;
	      btnEasy.events.onInputDown.add(function() {
	      		localStorage.setItem('leveleditor_diff', 'easy');
	      		this.game.add.tween(btnEasy.scale)
				.to({ x: 1.3, y: 1.3}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnNormal.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnHard.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
	     },this); 
	     
	     var btnNormal = game.add.bitmapText(game.width/4*2, game.height/3*2, 'garamond', 'Normal', 32);     
	      btnNormal.x -= btnNormal.width/2;
	      btnNormal.y -= btnNormal.height/2;
	      btnNormal.inputEnabled = true;
	      btnNormal.input.useHandCursor = true;
	      btnNormal.events.onInputDown.add(function() {  
	      		localStorage.setItem('leveleditor_diff', 'normal');
	        	this.game.add.tween(btnEasy.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnNormal.scale)
				.to({ x: 1.3, y: 1.3}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnHard.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
	     },this);
	     
	     var btnHard = game.add.bitmapText(game.width/4*3, game.height/3*2, 'garamond', 'Hard', 32);     
	      btnHard.x -= btnHard.width/2;
	      btnHard.y -= btnHard.height/2;;
	      btnHard.inputEnabled = true;
	      btnHard.input.useHandCursor = true;
	      btnHard.events.onInputDown.add(function() {  
	      		localStorage.setItem('leveleditor_diff', 'hard');
	        	this.game.add.tween(btnEasy.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnNormal.scale)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
				this.game.add.tween(btnHard.scale)
				.to({ x: 1.3, y: 1.3}, 100, Phaser.Easing.Linear.None)
				.start(); 
	     },this); 
		
    },
    onSpriteDown: function (sprite) {
    		//console.log(sprite.type);
    		this.myInput.canvasInput.blur();
			this.game.add.tween(sprite.scale)
				.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
				.to({ x: 1, y: 1}, 100, Phaser.Easing.Linear.None)
				.start();
			var text = this.myInput.canvasInput.value().toUpperCase();
			text = text.replace(/[^A-Z0-9]\.\-\?/g, '');
			localStorage.setItem('leveleditor', text);
			//console.log(localStorage.getItem('leveleditor'));
			if (sprite.type == 'play' ) {
				level = 'leveleditor';
				game.state.start('Game', true, false, 'leveleditor');  
			}
			if (sprite.type == 'lvl' ) {
				game.state.start('SelectLevel');  
			}
			
    },
      
	animateLevelIcons: function() {

		// slide all icons into screen
			this.IconGroup.y = this.IconGroup.y + 600;
			var y = this.IconGroup.y;

			// tween animation
			this.game.add.tween(this.IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (40));
	},
	 
	inputFocus: function(sprite){
        sprite.canvasInput.focus();
    },
	createInput: function(x, y){
        var bmd = this.add.bitmapData(400, 50);    
        var myInput = this.game.add.sprite(x, y, bmd);
        
        myInput.canvasInput = new CanvasInput({
          canvas: bmd.canvas,
          fontSize: 30,
          fontFamily: 'Arial',
          fontColor: '#212121',
          fontWeight: 'bold',
          width: 400,
          padding: 8,
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 3,
          boxShadow: '1px 1px 0px #fff',
          innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
          placeHolder: 'Enter level here...'
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;    
        myInput.events.onInputUp.add(this.inputFocus, this);
        
        return myInput;
    },
    update: function () {
    	if (game.input.activePointer.isDown) this.myInput.canvasInput.blur();
    }
};