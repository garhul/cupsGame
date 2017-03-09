'use strict';

const Game = {

    scenes:const { menu:'menu.js', score:'scores.js', main:'main.js' },
    stage:null,
    queue:null,

    init: function (Stage, Queue) {
        this.stage = Stage;
        this.queue = Queue;

        createjs.Ticker.setFPS(24);
        createjs.Ticker.addEventListener('tick', (ev) => {
            Stage.update();
        });

        this.renderScene(this.scenes.menu);
    },

    renderScene: function(scene) {
        //clear our stage first
        this.stage.removeAllChildren();
        var sc = require('./scenes/' + scene)(this);
        sc.render();
    }

}

module.exports = Game;
