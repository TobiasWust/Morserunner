var PreloadState = function () {};

PreloadState.prototype = {
  preload: function () {
    this.load.image('background', 'assets/background.png');
    this.load.image('skyline', 'assets/skyline.png');
    //this.load.image('background1', 'assets/background1.png');
    this.load.image('trees', 'assets/trees.png');
    //this.load.image('trees', 'assets/trees-h.png');
    this.load.image('ice-platform', 'assets/ice-platform.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('levelselectbutton', 'assets/buttons/levelselectbutton.png');
	this.load.image('retrybutton', 'assets/buttons/retrybutton.png');
	this.load.image('buttonbackground', 'assets/buttons/buttonbackground.png');
    this.load.image('schloss', 'assets/buttons/schloss.png');
    this.load.image('nextbutton', 'assets/buttons/nextbutton.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.bitmapFont('garamond', 'assets/fonts/garamond.png', 'assets/fonts/garamond.fnt');
    //this.load.bitmapFont('garamond', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    
    this.load.audio('jump', [ 'assets/audio/jump.mp3', 'assets/audio/jump.ogg' ]);

  },
  update: function () {
    if (!this.ready)
    {
        if (this.cache.isSoundDecoded('jump'))
        {
            this.ready = true;
            game.state.start('Menu');
        }
    }
  }
};