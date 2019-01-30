var GameState = function () {};
    GameState.prototype = {
        init: function (level) { 
            this.physics.startSystem(Phaser.Physics.ARCADE);
            if (level == 'leveleditor') {
              this.level = localStorage.getItem('leveleditor');
              this.difficulty = localStorage.getItem('leveleditor_diff');
              //CHEATS
                if (this.level == 'BIGSAM') {
                  if (localStorage.getItem('bigsam') != 1) 
                    localStorage.setItem('bigsam', '1')
                  else localStorage.setItem('bigsam', '0')
                }
                if (this.level == 'GONZALES') {
                  if (localStorage.getItem('gonzales') != 1) 
                    localStorage.setItem('gonzales', '1')
                  else localStorage.setItem('gonzales', '0')
                }
                if (this.level == 'BOUNCY') {
                  if (localStorage.getItem('bouncy') != 1) 
                    localStorage.setItem('bouncy', '1')
                  else localStorage.setItem('bouncy', '0')
                }
                if (this.level == 'MARATHON') {
                  if (localStorage.getItem('marathon') != 1) 
                    localStorage.setItem('marathon', '1')
                  else localStorage.setItem('marathon', '0')
                }
                  
            }
            else {
              this.level = levels[level][0];
              this.difficulty = levels[level][1];
            } 
            //console.log(this.level);
            //this.level = levels[level][0];
            this.speed = 400;
            if (localStorage.getItem('gonzales') == 1) this.speed = 600; // Speedcheat
            this.physics.arcade.gravity.y = 2500;               
            this.player = null;
            this.platforms = null;
            this.jumpTimer = 0;
            this.newword = 2;
            this.platwidth = 1;
            if (localStorage.getItem('marathon') == 1) this.platwidth = 10; //cheat marathon
            this.jumpvelocity = -200;
            if (localStorage.getItem('bouncy') == 1) this.jumpvelocity = -900; //cheat bouncy
            this.dit = 80;
            this.da = 160;
            this.levelleft = -200;
            this.leveltop = this.game.height/3*2;
            this.debug = 0;
            this.jumping = 0;
        },
        create: function () {
            this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
            this.background.fixedToCamera = true;
            
            this.skyline = this.add.tileSprite(0, this.game.height - 340, this.game.width, 340, 'skyline');
            this.skyline.fixedToCamera = true;
            //this.skyline.visible = false;

            this.createLevel(this.level);
            
            this.jumpsound = this.add.audio('jump');

            this.player = this.add.sprite(-200, this.leveltop-60, 'dude');           
            this.physics.arcade.enable(this.player);
            
            if (localStorage.getItem('bigsam') == 1) {  //BIGSAM Cheat
              this.player.body.setSize(20, 32, 5, 16);
              this.player.anchor.set(0.5);
              this.player.scale.x *= 3;
              this.player.scale.y *= 3;
            }
            this.player.body.setSize(40, 32, -5, 16);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);
          
            if (this.difficulty == 'normal') {
              this.trees = this.add.tileSprite(0, 220, this.game.width, 160, 'trees');
              this.trees.fixedToCamera = true;
            }
            if (this.difficulty == 'hard') {
              this.trees = this.add.tileSprite(0, 180, this.game.width, 200, 'trees');     
              this.trees.fixedToCamera = true;
            }
            
            this.cursors = this.input.keyboard.createCursorKeys();
            
            this.player.body.velocity.x = 0;
            
            lbl_lvl = game.add.bitmapText(16, 16, 'garamond', 'Level: '+level, 32);
            lbl_lvl2 = game.add.bitmapText(16, 64, 'garamond', this.level, 24);
            tap = game.add.text(game.width/2, 16, 'Tap to start', { fill: '#ff0' });
            tap.anchor.set(0.5);

        },
      
      createLevel: function (levelpreset) {
        
          this.platforms = this.add.physicsGroup();           
        
          var gap = 0;
          var width;
          var platform
          
          for (var i = 0; i < 8; i++) {
            platform = this.platforms.create(this.levelleft, this.leveltop, 'platform');
            this.levelleft += platform.width;
          }
        
          for (var i = 0, len = levelpreset.length; i < len; i++) { //Loop through letters           
            //game.add.text(this.levelleft, this.leveltop - 50, levelpreset[i], { fontSize: '32px', fill: '#fff' });
            game.add.bitmapText(this.levelleft, this.leveltop/3, 'garamond', String(levelpreset[i]), 60);     
            for (var j = 0, lenj = alphabet[levelpreset[i]].length; j < lenj; j++) { //loop dots/dash                          
                if (alphabet[levelpreset[i]][j] == '.')
                {  
                   gap = this.dit;
                   width = this.platwidth;
                }
                else if (alphabet[levelpreset[i]][j] == '-')
                  {
                   gap = this.da;
                   width = this.platwidth;
                  }
                else if (alphabet[levelpreset[i]][j] == '/')
                  {
                   gap = 0;
                   width = this.newword;
                  }              
              this.levelleft += gap;      
              for (var n = 0; n < width; n++) {
                platform = this.platforms.create(this.levelleft, this.leveltop, 'platform');
                //platform.width = width;
                this.levelleft += platform.width;
              }

                } 
            platform = this.platforms.create(this.levelleft, this.leveltop, 'platform');
            //platform.width = this.platwidth;
            this.levelleft += platform.width;
          }
            
            this.platforms.setAll('body.allowGravity', false);
            this.platforms.setAll('body.immovable', true);
            //this.platforms.setAll('width', 50);
            //this.platforms.setAll('scale.y', 0.7);
        
          this.world.resize(this.levelleft+20, this.game.height);
        },

        update: function () {
          //this.background.tilePosition.x = -(this.camera.x * 0.5);
          this.skyline.tilePosition.x = -(this.camera.x * 0.5);
          if (this.difficulty == 'normal' || this.difficulty == 'hard') {this.trees.tilePosition.x = -(this.camera.x * 1.3);}
            this.game.camera.focusOnXY(this.player.x + 200, this.player.y);
            this.player.play('right');

            this.physics.arcade.collide(this.player, this.platforms, this.touchPlatform, null, this);

            //  Do this AFTER the collide check, or we won't have blocked/touching set
            var standing = this.player.body.blocked.down || this.player.body.touching.down;
            
            if (standing) {
              this.jumpTimer = 0;
            }
            
            if (this.jumping == 1 && !standing) {
               if (!this.jumpsound.isPlaying) this.jumpsound.play();
            }
            else this.jumpsound.stop();
            
            if ((this.cursors.up.isDown || game.input.activePointer.isDown))                
            {
              if (this.player.body.velocity.x == 0) {
                this.player.body.velocity.x = this.speed;
              }
              if (this.player.body.touching.down && this.jumpTimer === 0 && this.jumping == 0)
                {
                this.player.body.velocity.y = this.jumpvelocity;
                this.jumpTimer = 1;
                this.jumping = 1;
                }
              else if (this.jumpTimer > 0 && this.jumpTimer <= 20 && this.jumping == 1)
                {
                  this.jumpTimer++;
                  this.player.body.velocity.y = (this.jumpvelocity + this.jumpTimer * 7);
                }
            }
            else {
              jumptimer = 0;
            }
            if (game.input.activePointer.isUp && this.cursors.up.isUp) {
              this.jumping= 0;
            }
          
          

          if (this.player.body.y >= this.game.height) {
            game.state.start('Over');
          }
          if (this.player.body.x >= this.world.width) {
            if (level == 44) game.state.start('Final')
            else game.state.start('Win');
            
          }         
          
        },
      render: function () {
        
        if (this.debug ==1 ) 
        {// Input debug info
            game.debug.inputInfo(32, 32);       
            game.debug.pointer( game.input.activePointer );
            
            this.game.debug.start(32, 128, 'white');
            this.game.debug.line('JumpTimer:' + this.jumpTimer);
            this.game.debug.stop();
          
            this.game.debug.cameraInfo(this.game.camera, 32, 150);
        }
      },
      
      shutdown: function () {
        this.jumpsound.stop();
      }
      

    };
