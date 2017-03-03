//Create a stage by getting a reference to the canvas
stage = new createjs.Stage("app");
stage.scaleY =1;
stage.scaleX =1;
//Create a Shape DisplayObject.
circle = new createjs.Shape();
circle.graphics.beginFill("#ff6600").drawCircle(0, 5, 10);

//Set position of Shape instance.
circle.x = circle.y = 50;


circle.addEventListener("click",(ev) => {
  console.log(ev);
});

//Add Shape instance to stage display list.
stage.addChild(circle);
  stage.update();

let dir = true;
createjs.Ticker.framerate = 30;
createjs.Ticker.addEventListener('tick', (ev) => {
  circle.x += (dir) ? 5 : -5;

  if (circle.x > stage.canvas.width || circle.x < 0)
    dir = !dir;

  stage.update();
});
