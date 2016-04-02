import React,{Component} from 'react';
import StatusBar from './StatusBar.jsx';

const FPS = 30;
const PADDLE_WIDTH = 200;
const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 15;
const BRICK_COLUMNS = 20;
const BRICK_ROWS = 13;
const BRICK_GAP = 2;
const DEFAULT_SPEED = 2.5;


class Breakout extends Component {

  constructor(props){
    super(props);
    this.state = {
      gameOver:false,
      ballSize:10,
      ballX:200,
      ballY:200,
      ballSpeedX: DEFAULT_SPEED,
      ballSpeedY: DEFAULT_SPEED,
      ballColor: "#FFFC79",
      bgColor:"#000000",
      paddleColor:"#F6CABC",
      paddleWidth: PADDLE_WIDTH,
      paddleHeight: 20,
      paddleX: 400,
      paddleCenter: 400+(150/2),
      paddleBottomOffset: 50,
      paddleBorder:{},
      brickRows: BRICK_ROWS,
      brickColumns: BRICK_COLUMNS,
      brickWidth:BRICK_WIDTH,
      brickHeight: BRICK_HEIGHT,
      brickColor: '#76D6FF',
      bricks: new Array(BRICK_COLUMNS),
      score:0,highscore:0,
      lives:3,
      bricksLeft:0,
      paused:false
    }
  }

  componentDidMount() {

   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;

   this.colors = [this.state.brickColor, "#176BF1", "#43398C"];
   if (typeof(Storage) !== undefined){
     var highscore = localStorage.getItem("highestScore") || 0;
     this.setState({highscore:parseInt(highscore)});
   } else {
     this.setState({highscore:0});
   }
   this.populateBricks();
   this.ballReset();
   this.renderScreen();
  }

  gameReset(){
    this.canvas && this.setState({
      ballX:150,
      ballY:150,
      ballSpeedX: DEFAULT_SPEED,
      ballSpeedY: DEFAULT_SPEED,
      score:0,
      lives:3,
      paused:true
    });
    this.populateBricks();
    this.ballReset();
    this.renderScreen();
  }


  getPaddleBorders(){

    var paddleTopY = this.h - this.state.paddleBottomOffset;
    var paddleBottomY = paddleTopY + this.state.paddleHeight;
    var paddleLeftX = this.state.paddleX;
    var paddleRightX = paddleLeftX + this.state.paddleWidth;

    this.canvas && this.setState({
      paddleBorder:{
        TopY: paddleTopY,
        BottomY: paddleBottomY,
        LeftX: paddleLeftX,
        RightX: paddleRightX
      }
    });
  }

  populateBricks(){
    var i=0

    for(; i<(3*this.state.brickColumns); i++){
      this.state.bricks[i] = {};
      this.state.bricks[i].show = false;
    }
    for(; i<(this.state.brickColumns*this.state.brickRows); i++){
      var rnd = Math.floor((Math.random() * this.colors.length) + 1);
      this.state.bricks[i] = {};
      this.state.bricks[i].show = true;
      this.state.bricks[i].hit =0;

      if (i >= (4*this.state.brickColumns) && i < (5*(this.state.brickColumns)) ){
        this.state.bricks[i].hardness = 3;
      } else if (i >= (7*this.state.brickColumns) && i < (8*(this.state.brickColumns)) ){
        this.state.bricks[i].hardness = rnd;

      } else if (i >= (10*this.state.brickColumns) && i < (12*(this.state.brickColumns)) ){
        this.state.bricks[i].hardness = 2;
      }

      this.state.bricks[i].color = this.colors[(this.state.bricks[i].hardness)-1];
    }
    let b = this.state.bricks;

    this.canvas && this.setState({
      paddleX: (this.w/2)-(PADDLE_WIDTH/2),
      bricksLeft:b.length,
      bricks:b,
      brickWidth: (this.w / this.state.brickColumns+0.1)
    });
  }
  indexByColNRow(col,row){
    return this.state.brickColumns * row + col;
  }

  renderBricks(){
    var bricks = this.state.bricks;
    for(var row=0; row<this.state.brickRows; row++){
      for(var column=0; column<this.state.brickColumns; column++){
        let index = this.indexByColNRow(column,row);
        if (bricks[index].show){
          bricks[index].x = this.state.brickWidth*column;
          bricks[index].y = this.state.brickHeight*row;
          var width = this.state.brickWidth-BRICK_GAP;
          var height = this.state.brickHeight-BRICK_GAP;
          var color;

          if(bricks[index].color){
            color = bricks[index].color;
          }else{
            color = this.state.brickColor;
          }
          this.drawRect(bricks[index].x,bricks[index].y,width,height,color);
        }
      }
    }

    this.setState({
      bricks
    });

  }

  renderScreen(){
      var x = this.state.ballX;
      var y = this.state.ballY;

      this.getPaddleBorders();
      this.canvas && this.setState({
        ballX: (x+this.state.ballSpeedX),
        ballY: (y+this.state.ballSpeedY)
      });
      this.moveAll();

      if(this.state.lives > 0){
        requestAnimationFrame(this.renderScreen.bind(this));
      } else {
        cancelAnimationFrame(this.renderScreen.bind(this));
        this.gameOver("lose");
      }
  }
  ballBorders(xSpeed,ySpeed){
    if(this.state.ballX < (this.state.ballSize) && this.state.ballSpeedX < 0.0){
      xSpeed *= -1;
      this.canvas && this.setState({
        ballSpeedX: xSpeed
      })
    }
    if(this.state.ballX > (this.w-this.state.ballSize) && this.state.ballSpeedX > 0.0){
      xSpeed *= -1;
      this.canvas && this.setState({
        ballSpeedX: xSpeed
      })
    }
    if(this.state.ballY < (this.state.ballSize) && this.state.ballSpeedY < 0.0){
      ySpeed *= -1;
      this.canvas && this.setState({
        ballSpeedY: ySpeed
      })
    }
    if(this.state.ballY > (this.h-this.state.ballSize)){
      this.startOver()
    }
  }

  paddleColision(xSpeed,ySpeed){
    if(this.state.ballY > (this.state.paddleBorder.TopY-this.state.ballSize) &&
      this.state.ballY <  this.state.paddleBorder.BottomY &&
      this.state.ballX >  (this.state.paddleBorder.LeftX-this.state.ballSize) &&
      this.state.ballX <  (this.state.paddleBorder.RightX-this.state.ballSize)
    ){

      let ballDistFromPaddleCenter = this.state.ballX - this.state.paddleCenter;

      ySpeed *= -1;
      xSpeed = ballDistFromPaddleCenter * 0.3;
      this.canvas && this.setState({
        ballSpeedY: ySpeed,
        ballSpeedX: xSpeed/2
      })
    }
  }
  isBrickAtPosition(col,row){
    if(col >=0 && col < this.state.brickColumns &&
      row >=0 && row < this.state.brickRows){
        let brickColideByCoordinate= this.indexByColNRow(col,row);
        return this.state.bricks[brickColideByCoordinate];
    } else {
      return false;
    }
  }
  hideBrick(brick){
    let score = this.state.score+1;
    let highscore = this.state.highscore;
    if(highscore <= score){
      highscore = score;
      if (typeof(Storage) !== undefined){
        localStorage.setItem("highestScore", score);
      }
    }




    let bricksLeft=this.state.bricksLeft;

    if(brick.hardness > 1){
      brick.hardness--;
      brick.color = this.colors[brick.hardness-1];
      brick.hit++;
      this.drawRect(brick.x,brick.y,this.state.brickWidth,this.state.brickHeight,brick.color);
    } else {
      brick.show=false;
      bricksLeft--;

    }
    this.setState({
      score,
      highscore,
      bricksLeft
    });

  }
  ballNBrick(){
    let ballNBrickColumn = Math.floor(this.state.ballX / this.state.brickWidth);
    let ballNBrickRow = Math.floor(this.state.ballY / this.state.brickHeight);
    let brickColideByBall= this.indexByColNRow(ballNBrickColumn,ballNBrickRow);

    if((ballNBrickColumn >=0) &&
      (ballNBrickColumn < this.state.brickColumns) &&
      (ballNBrickRow>=0) &&
      (ballNBrickRow < this.state.brickRows)){
        let b = this.state.bricks;

      if(this.isBrickAtPosition(ballNBrickColumn,ballNBrickRow).show){
        let xSpeed = this.state.ballSpeedX;
        let ySpeed = this.state.ballSpeedY;
        this.hideBrick(b[brickColideByBall]);

        let prevBallX = this.state.ballX - this.state.ballSpeedX;
        let prevBallY = this.state.ballY - this.state.ballSpeedY;

        let prevBrickColumn = Math.floor(prevBallX / this.state.brickWidth);
        let prevBrickRow = Math.floor(prevBallY / this.state.brickHeight);

        let colisionTestsFailed = true;
        var adjSide = this.indexByColNRow(prevBrickColumn,ballNBrickRow);
        var adjTop = this.indexByColNRow(prevBrickColumn,ballNBrickRow);
        if(prevBrickColumn != ballNBrickColumn){

          if(b[adjSide] && b[adjSide].show==false){
            xSpeed *= -1;
            colisionTestsFailed = false;
          }
        }
        if(prevBrickRow != ballNBrickRow){
          if(b[adjTop] && b[adjTop].show==false){
            ySpeed *= -1;
            colisionTestsFailed = false;
          }
        }
        if (colisionTestsFailed){
          ySpeed *= -1;
          xSpeed *= -1;
        }

        this.canvas && this.setState({
          bricks:b,
          ballSpeedY: ySpeed,
          ballSpeedX: xSpeed
        }, function(){
          if(this.state.bricksLeft<=0){
            this.gameOver("win");
          }
        }.bind(this));
      }
    }
  }

  moveAll(){
    this.ballBorders(this.state.ballSpeedX,this.state.ballSpeedY);
    this.paddleColision(this.state.ballSpeedX,this.state.ballSpeedY);
    this.ballNBrick();

    this.drawRect(0,0,this.w,this.h,this.state.bgColor);
    this.drawBall(this.state.ballX, this.state.ballY, this.state.ballSize,this.state.ballColor);
    this.drawRect(this.state.paddleX,(this.h-this.state.paddleBottomOffset),this.state.paddleWidth,this.state.paddleHeight,this.state.paddleColor);

    this.renderBricks();
  }

  setLivesNum(n){
    this.canvas && this.setState({
      lives: n
    });
  }
  handleLivesNum(e){
    this.setLivesNum(e.target.value);
  }
  handlePaddleColor(e){
    this.canvas && this.setState({
      paddleColor: e.target.value
    });
  }

  handleBallColor(e){
    this.canvas && this.setState({
      ballColor: e.target.value
    });
  }

  handleBGColor(e){
    this.canvas && this.setState({
      bgColor: e.target.value
    });
  }

  handleBrickColor(e){
    this.canvas && this.setState({
      brickColor: e.target.value
    });
  }

  handleBallSize(e){
    this.canvas && this.setState({
      ballSize: e.target.value
    });
  }

  drawRect(TLX,TLY,Width,Height,Fill){
     this.ctx.fillStyle=Fill;
     this.ctx.fillRect(TLX,TLY,Width,Height);
  }

  drawText(words, textX, textY, color,size){
    this.ctx.textAlign="center";
    this.ctx.font=size+"px Arial";
    this.ctx.fillStyle = color;
    this.ctx.fillText(words, textX, textY);
  }

  drawBall(ballX,ballY,ballSize,fill){
    this.ctx.fillStyle=fill;
    this.ctx.beginPath();
    this.ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2, true);
    this.ctx.fill();
  }

  getMousePosition(evt) {
    var rect = this.canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
      x: evt.clientX - rect.left - root.scrollLeft,
      y: evt.clientY - rect.top - root.scrollTop
    };
  }

  handleMouseMove(e){
    this.mouse = this.getMousePosition(e);

    var loc = this.mouse.x -(this.state.paddleWidth/2);

    if (loc > 0 && loc < (this.w-(this.state.paddleWidth))){
      var x = (loc > 0 ? loc : 0);
      this.canvas && this.setState({
        paddleX: x,
        paddleCenter: x + (this.state.paddleWidth/2)
      });
    }
  }

  ballReset(){
    this.canvas && this.setState({
      paused:true,
      ballSpeedX:0,
      ballSpeedY:0,
      ballX: this.w/2,
      ballY:this.h/2
    });

    this.canvas.addEventListener("click", function(){
      var rnd = Math.random() < 0.5 ? -1 : 1;
      if(this.state.paused){
        this.canvas && this.setState({
          paused:false,
          ballSpeedX:DEFAULT_SPEED*rnd,
          ballSpeedY:DEFAULT_SPEED
        });
      }
    }.bind(this));

  }
  startOver(){
    let lives = this.state.lives-1;
    if (lives > 0){
      this.setLivesNum(lives);
      this.ballReset()
    } else {
      this.setLivesNum(0);
    }
  }
  gameOver(status){
    let sec; let title;
    if(status == "win"){
      sec = 10;
      title = "WOW, You Removed all the bricks"
    } else {
      sec = 5;
      title = "GAME OVER"
    }
    this.drawRect(0,0,this.w,this.h,"#c0c0c0");
    this.drawText(title, (this.w/2),(this.h/2)-30,"#000000",40);
    this.drawText("Your Score is : "+this.state.score, (this.w/2),(this.h/2+20),"#000000",40);
    this.drawText("[We will Start In A Moment]", (this.w/2),(this.h/2+50),"#000000",20);
    this.drawText(sec, (this.w/2),(this.h/2+75),"#000000",20);

    var seconds = setInterval(function(){
      sec--;
      this.drawRect(0,(this.h/2+54),this.w,30,"#c0c0c0");
      this.drawText(sec, (this.w/2),(this.h/2+75),"#000000",20);
      if(sec<=0){
        clearInterval(seconds)
      }
    }.bind(this), 1000);


    setTimeout(function(){
      this.gameReset();

    }.bind(this), 5000);



  }
  render(){
    return(
     <div>
       <StatusBar
        {...this.state}
        //changeLives={this.handleLivesNum.bind(this)}
        changeBallSize={this.handleBallSize.bind(this)}
        changeBallColor={this.handleBallColor.bind(this)}
        changePaddleColor={this.handlePaddleColor.bind(this)}
        changeBGColor={this.handleBGColor.bind(this)}
        changeBricksColor={this.handleBrickColor.bind(this)}/>
       <canvas
         ref={(c) => this.canvas = c}
         onMouseMove={this.handleMouseMove.bind(this)}
         />
     </div>
   );
  }
}

export default Breakout
