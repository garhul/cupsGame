/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mainScene(Game) {
    var score = 0;
    var maxScore = 0;
    var ballPosition = Math.floor( Math.random() * 3);
    var cups = [];
    var ball = null;
    var goBtn =  null;
    var canPick = false;
    var liftedCup = null;
    var chooseTxt = null;
    var scoreText = null;
    var maxScoreText = null;

    function render() {
        //set background
        Game.stage.addChild(new createjs.Bitmap(Game.queue.getResult('bg')));

        //set score text
        scoreText = new createjs.Text('Score: ' + maxScore, '.8em Arial', '#FFF');
        scoreText.x = 5;
        scoreText.y = 10;

        //set max score text
        maxScoreText = new createjs.Text('Max score: ' + maxScore, '.8em Arial', '#FFF');
        maxScoreText.x = 5;
        maxScoreText.y = 30;

        chooseTxt = new createjs.Text('Choose a cup', '1.4em Arial', '#FFF');
        chooseTxt.x = Game.stage.canvas.width / 2 - chooseTxt.getMeasuredWidth();
        chooseTxt.y = 50;
        chooseTxt.visible = false;

        Game.stage.addChild(scoreText, maxScoreText, chooseTxt);

        //let's draw the cups
        createjs.MotionGuidePlugin.install();

        for (let i = 0; i < 3; i++) {

            cups.push(new createjs.Bitmap(Game.queue.getResult('cup')));

            if (ballPosition === i)
            cups[i].visible = false;

            cups[i].x = (Game.stage.canvas.width / 3) * i + (Game.stage.canvas.width / (3 * 2)) - 5;
            cups[i].y = 120;

            cups[i].addEventListener('click',(ev) => {
                if (canPick)
                    liftCup(i);
            });

            Game.stage.addChild(cups[i]);
        }

        liftedCup = new createjs.Bitmap(Game.queue.getResult('cup_lifted'));
        liftedCup.x = cups[ballPosition].x;
        liftedCup.y = cups[ballPosition].y;
        Game.stage.addChild(liftedCup);

        //draw a ball
        ball = new createjs.Bitmap(Game.queue.getResult('ball'));
        ball.x = cups[ballPosition].x;
        ball.y = cups[ballPosition].y + 40;
        Game.stage.addChild(ball);

        //and a go button
        goBtn = new createjs.Text('go!', '1em Arial', '#FFF');
        goBtn.x = (Game.stage.canvas.width / 2) - goBtn.getMeasuredWidth();
        goBtn.y = Game.stage.canvas.height - 50;

        var hitBox = new createjs.Shape();
        hitBox.graphics.beginFill('#000').drawRect(0,0,100,100);
        goBtn.hitArea = hitBox;

        goBtn.addEventListener('click', (ev) => {
            chooseTxt.visible = false;
            startRound();
        });

        Game.stage.addChild(goBtn);

    }

    function startRound() {
        ball.visible = false;
        liftedCup.visible = false;

        cups.forEach((c)=>{
            c.visible = true;
        })

        goBtn.visible = false;
        //we start a new round
        var times = Math.floor(Math.random() * 3) + 3;
        shuffle(times)
    }

    function shuffle(times) {
      if (times === 0) {
          //we already did all the moves wait for user selection
          canPick = true;
          chooseTxt.visible = true;
          return false;
      }

      canPick = false;

      //move the cups to a new position
      let a = Math.floor( Math.random() * 3 );
      let b = Math.floor( Math.random() * 3 );

      while(a === b) {
        b = Math.floor( Math.random() * 3 );
      }

      let spd = Math.floor(Math.random () * 1000) + 600;

      var launched = 1; //kep track of the tween launched
      var handler = function () {
          if (launched === 0)
            return shuffle(--times);

          launched --;
      }

      createjs.Tween.get(cups[a])
        .to({guide:
            {path:[cups[a].x, cups[a].y, 100, cups[a].y + 100, cups[b].x,cups[b].y]}}, spd)
            .call(handler);

      createjs.Tween.get(cups[b])
        .to({guide:
          {path:[cups[b].x,cups[b].y, 100, cups[a].y - 100, cups[a].x,cups[a].y]}}, spd)
          .call(handler);
    }

    function liftCup(index) {

        liftedCup.x = cups[index].x
        cups[index].visible = false;
        liftedCup.visible = true;
        ball.x = cups[ballPosition].x;

        if (ballPosition === index) {
            ball.visible = true;

            score++;
            if (score > maxScore)
                maxScore = score;

            goBtn.text = 'Play again!';
            goBtn.visible = true;
        } else {
            score = 0;

            setTimeout(()=> {
                cups[index].visible = true;
                cups[ballPosition].visible = false;
                ball.visible = true;
                // liftedCup.visible = false;
                liftedCup.x = cups[ballPosition].x;
                goBtn.text = 'Start over';
                goBtn.visible = true;
            }, 2500);
        }

        scoreText.text = 'Score: ' + score;
        maxScoreText.text = 'Max score: ' + score;
    }

    return {
        render:render
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function menuScene(Game) {
    function render() {

        Game.stage.addChild(new createjs.Bitmap(Game.queue.getResult('bg')));

        //render text items
        Game.stage.clear();
        Game.stage.enableMouseOver(30);

        var text = new createjs.Text('Start Game', '3em Arial', '#EEE');
        text.x = (Game.stage.canvas.width / 2) - text.getMeasuredWidth();
        text.y = 20;
        text.set({alpha:.6});

        var hitBox = new createjs.Shape();
        hitBox.graphics.beginFill('#000').drawRect(0, 0, text.getMeasuredWidth() * 2, 100);
        text.hitArea = hitBox;
        
        text.addEventListener('mouseover', (ev) =>{
            ev.target.set({alpha:1});
        });

        text.addEventListener('mouseout', (ev)=>{
            ev.target.set({alpha:.6});
        });

        text.addEventListener('click', (ev) => {
            Game.stage.removeChild(text);
            Game.renderScene(Game.scenes.main);
        });

        Game.stage.addChild(text);

    }

    return {
        render:render
    }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/* Asset location constants */
module.exports = {
    assets:{
        "path": "assets/",
        "manifest":[
            {"id":"ball", "src":"ball.png"},
            {"id":"cup","src":"cup.png"},
            {"id":"cup_lifted","src":"cup_lifted.png"},
            {"id": "bg", "src":"bg.png"}
        ]
    },
    balls_count: 1,
    cups_count: 3,
    canvas: {
        width:'860px',
        height: '300px'
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Game = {

    score: 0,
    scenes:{ menu:'menu.js', score:'scores.js', main:'main.js' },
    balls: [],
    cups : [],
    currentScene : 0,
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
        var sc = __webpack_require__(5)("./" + scene)(this)

        sc.render();
    }

}

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./main": 0,
	"./main.js": 0,
	"./menu": 1,
	"./menu.js": 1
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const cfg = __webpack_require__(2);
const style = __webpack_require__(4);

(() => {
  var queue = new createjs.LoadQueue();

  queue.on("complete", () => {
      let canvas = document.createElement('canvas');
      canvas.setAttribute('width',cfg.canvas.width)
      canvas.setAttribute('height',cfg.canvas.height);

      document.getElementById("loading").remove();
      document.body.append(canvas);

      let stage = new createjs.Stage(canvas);

      const game = __webpack_require__(3);
      game.init(stage, queue);
  });

  //start preloading our assets
  queue.loadManifest(cfg.assets, true);

})();


/***/ })
/******/ ]);