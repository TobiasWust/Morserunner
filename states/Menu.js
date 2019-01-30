var MenuState = function () {};

MenuState.prototype = {
  create: function () {
      //localStorage.setItem('progress', '45');
      this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
      var Title = game.add.bitmapText(game.width/2, game.height/3, 'garamond','MorseRunner',64);
      //var Title = game.add.text(game.width/2, game.height/3, 'MorseRider: The Game!', { fill: '#fff' });
      //Title.anchor.set(0.5,0.5);
      Title.x = Title.x - Title.textWidth/2;
      Title.y = Title.y - Title.textHeight/2;

      var btn_start = game.add.text(game.width/2, game.height/2-10, 'Start Game', { fill: '#ff0' });
      btn_start.anchor.set(0.5,0.5);
      btn_start.inputEnabled = true;
      btn_start.input.priorityID = 1;
      btn_start.input.useHandCursor = true;
      btn_start.events.onInputDown.add(function() {  
        game.state.start('SelectLevel');  
     },this); 
     
     /*var btn_settings = game.add.text(game.width/2, game.height/2+42, 'Settings', { fill: '#ff0' });
      btn_settings.anchor.set(0.5,0.5);
      btn_settings.inputEnabled = true;
      btn_settings.input.priorityID = 1;
      btn_settings.input.useHandCursor = true;
      btn_settings.events.onInputDown.add(function() {  
        //game.state.start('Settings');  
     },this);  */
     
      if (localStorage.getItem('progress') >= 15)   {
        //var btn_lvleditor = game.add.text(game.width/2, game.height/2+94, 'Leveleditor', { fill: '#ff0' });
        var btn_lvleditor = game.add.text(game.width/2, game.height/2+42, 'Leveleditor', { fill: '#ff0' });
        btn_lvleditor.anchor.set(0.5,0.5);
        btn_lvleditor.inputEnabled = true;
        btn_lvleditor.input.priorityID = 1;
        btn_lvleditor.input.useHandCursor = true;
        btn_lvleditor.events.onInputDown.add(function() {  
          game.state.start('Leveleditor');  
        },this); 
      }
      
      game.add.text(16, game.height-32, 'V1.0', { fill: '#fff' });    
   }, 
};