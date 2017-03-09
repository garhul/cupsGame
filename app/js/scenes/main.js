'use strict';

module.exports = function mainScene(Game) {
    var score = 0;
    var maxScore = 0;

    function render() {

    };

    start : function() {
      //let's put the ball in a random location
      createjs.MotionGuidePlugin.install();
      this.ballPosition = Math.floor( Math.random() * CUPS_COUNT);

      for (var i = 0; i < CUPS_COUNT; i++) {
        this.cups.push(new createjs.Shape());
        this.cups[i].graphics.beginFill('#CCCCCC').rect(10, (stage.canvas.height / 2) + 10, 30,5);
        this.cups[i].x = (stage.canvas.width / CUPS_COUNT) * i + (stage.canvas.width / (CUPS_COUNT * 2)) - 5;
        stage.addChild(this.cups[i]);

        //draw some balls
        this.balls.push(new createjs.Shape());
        this.balls[i].graphics.beginFill((i === this.ballPosition)?'#0066ff':'#ff6600')
          .drawCircle((stage.canvas.width / CUPS_COUNT) * i + (stage.canvas.width / (CUPS_COUNT * 2)) + 20, stage.canvas.height / 2, 10);
        stage.addChild(this.balls[i]);
      }
      stage.update();

    },

    shuffle : function() {
      //move the cups to a new position
      let a = Math.floor( Math.random() * CUPS_COUNT );
      let b = Math.floor( Math.random() * CUPS_COUNT );
      while(a == b) {
        b = Math.floor( Math.random() * CUPS_COUNT );
      }

      let spd = Math.floor(Math.random () * 1200) + 200;

      // this.cups[0].graphics.curveTo(this.cups[0].x,this.cups[0].y, this.cups[1].x,this.cups[1].y);

      createjs.Tween.get(this.cups[a]).to({guide:{ path:[this.cups[a].x,this.cups[a].y, 100,100, this.cups[b].x,this.cups[b].y] }} , spd);
      createjs.Tween.get(this.cups[b]).to({guide:{ path:[this.cups[b].x,this.cups[b].y, 100,-100, this.cups[a].x,this.cups[a].y] }} , spd);


      //now swap the cups positions

    },

    liftCup : function(cup_index) {

    },
  }
}
