'use strict';
const cfg = require('./js/config.js');
const style = require('./style/main.scss');

(() => {
  var queue = new createjs.LoadQueue();

  queue.on("complete", () => {
      let canvas = document.createElement('canvas');
      canvas.setAttribute('width',cfg.canvas.width)
      canvas.setAttribute('height',cfg.canvas.height);

      document.getElementById("loading").remove();
      document.body.append(canvas);

      let stage = new createjs.Stage(canvas);

      const game = require('./js/game.js');
      game.init(stage, queue);
  });

  //start preloading our assets
  queue.loadManifest(cfg.assets, true);

})();
