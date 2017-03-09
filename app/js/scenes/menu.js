'use strict';

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
