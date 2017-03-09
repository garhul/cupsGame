'use strict';

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
    var scoreTxt = null;
    var maxScoreTxt = null;

    function render() {
        //set background
        Game.stage.addChild(new createjs.Bitmap(Game.queue.getResult('bg')));

        //set score text
        scoreTxt = new createjs.Text('Score: ' + maxScore, '.8em Arial', '#FFF');
        scoreTxt.x = 5;
        scoreTxt.y = 10;

        //set max score text
        maxScoreTxt = new createjs.Text('Max score: ' + maxScore, '.8em Arial', '#FFF');
        maxScoreTxt.x = 5;
        maxScoreTxt.y = 30;

        //set "choose a cup" text
        chooseTxt = new createjs.Text('Choose a cup', '1.4em Arial', '#FFF');
        chooseTxt.x = Game.stage.canvas.width / 2 - chooseTxt.getMeasuredWidth();
        chooseTxt.y = 50;
        chooseTxt.visible = false;

        Game.stage.addChild(scoreTxt, maxScoreTxt, chooseTxt);

        createjs.MotionGuidePlugin.install();

        //let's draw the cups
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
        cups[ballPosition].visible = true;
        goBtn.visible = false;
        //we start a new round
        var times = Math.floor(Math.random() * 3) + 3;
        shuffle(times);
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
            {path:[cups[b].x, cups[b].y, 100, cups[a].y - 100, cups[a].x,cups[a].y]}}, spd)
            .call(handler);
    }

    function liftCup(index) {
        canPick = false;

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

        scoreTxt.text = 'Score: ' + score;
        maxScoreTxt.text = 'Max score: ' + maxScore;
    }

    return {
        render:render
    }
}
