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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



function render(stage) {
     var bg = queue.getResult('bg');
     

}



module.exports = {
    render:render
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/* Asset location constants */
module.exports = {
    assets:{
        "path": "assets/",
        "manifest":[
            {"id":"ball", "src":"ball.png"},
            {"id":"cup","src":"cup.png"},
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function GAME(Stage, Queue) {

    var score = 0;
    var scenes = ['menu.js','scores.js','main.js'];
    var balls = [];
    var cups = [];
    var currentScene = 0;


    function init () {
        createjs.Ticker.setFPS(24);
        createjs.Ticker.addEventListener('tick', (ev) => {
            Stage.update();
        });

        var bg = new createjs.Bitmap(Queue.getResult("bg"));
        console.log(bg);
        Stage.addChild(bg);

        //render appropiate scene
        _renderScene(__webpack_require__(4)("./" + scenes[currentScene]));

    }


    function _renderScene(scene) {
        console.log('rendering ' + scene);
    }

    // const Game = {
    //
    //   init: function(stage) {
    //       //   createjs.Ticker.framerate = 30;
    //       //   createjs.Ticker.addEventListener('tick', (ev) => {
    //       //     // this.stage.update();
    //       //   });
    //         //
    //         //
    //       //   var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
    //       //   text.x = 100;
    //       //   text.textBaseline = "alphabetic";
    //       //   stage.addChild(bg, text);
    //
    //       //menu background
    //
    //
    //   },
    //
    //   start : function() {
    //     //let's put the ball in a random location
    //     createjs.MotionGuidePlugin.install();
    //     this.ballPosition = Math.floor( Math.random() * CUPS_COUNT);
    //
    //     for (var i = 0; i < CUPS_COUNT; i++) {
    //       this.cups.push(new createjs.Shape());
    //       this.cups[i].graphics.beginFill('#CCCCCC').rect(10, (stage.canvas.height / 2) + 10, 30,5);
    //       this.cups[i].x = (stage.canvas.width / CUPS_COUNT) * i + (stage.canvas.width / (CUPS_COUNT * 2)) - 5;
    //       stage.addChild(this.cups[i]);
    //
    //       //draw some balls
    //       this.balls.push(new createjs.Shape());
    //       this.balls[i].graphics.beginFill((i === this.ballPosition)?'#0066ff':'#ff6600')
    //         .drawCircle((stage.canvas.width / CUPS_COUNT) * i + (stage.canvas.width / (CUPS_COUNT * 2)) + 20, stage.canvas.height / 2, 10);
    //       stage.addChild(this.balls[i]);
    //     }
    //     stage.update();
    //
    //   },
    //
    //   shuffle : function() {
    //     //move the cups to a new position
    //     let a = Math.floor( Math.random() * CUPS_COUNT );
    //     let b = Math.floor( Math.random() * CUPS_COUNT );
    //     while(a == b) {
    //       b = Math.floor( Math.random() * CUPS_COUNT );
    //     }
    //
    //     let spd = Math.floor(Math.random () * 1200) + 200;
    //
    //     // this.cups[0].graphics.curveTo(this.cups[0].x,this.cups[0].y, this.cups[1].x,this.cups[1].y);
    //
    //     createjs.Tween.get(this.cups[a]).to({guide:{ path:[this.cups[a].x,this.cups[a].y, 100,100, this.cups[b].x,this.cups[b].y] }} , spd);
    //     createjs.Tween.get(this.cups[b]).to({guide:{ path:[this.cups[b].x,this.cups[b].y, 100,-100, this.cups[a].x,this.cups[a].y] }} , spd);
    //
    //
    //     //now swap the cups positions
    //
    //   },
    //
    //   liftCup : function(cup_index) {
    //
    //   },
    // }

    return {
        init: init
    }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./menu": 0,
	"./menu.js": 0
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
webpackContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const cfg = __webpack_require__(1);
const style = __webpack_require__(3);

(() => {
  var queue = new createjs.LoadQueue();

  queue.on("complete", () => {
      let canvas = document.createElement('canvas');
      canvas.setAttribute('width',cfg.canvas.width)
      canvas.setAttribute('height',cfg.canvas.height);

      document.getElementById("loading").remove();
      document.body.append(canvas);

      let stage = new createjs.Stage(canvas);

      const game = __webpack_require__(2)(stage, queue);
      game.init();
  });

  //start preloading our assets
  queue.loadManifest(cfg.assets, true);

})();


/***/ })
/******/ ]);