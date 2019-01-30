var BootState = function () {};
BootState.prototype = {
  init: function () {
    game.renderer.renderSession.roundPixels = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.forceLandscape = true;
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);  //for Canvas, modern approach
    Phaser.Canvas.setSmoothingEnabled(game.context, false);  //also for Canvas, legacy approach
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL
  },
  create: function () {
    game.state.start('Preload');
  }
};
