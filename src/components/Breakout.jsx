import React,{Component} from 'react';

const FPS = 30;
const BRICK_COLUMNS = 20;
const BRICK_GAP = 2;
const DEFAULT_SPEED = 5;

class Breakout extends Component {
  constructor(props){
    super(props);
    this.state = {
      ballSize:10,
      ballX:150,
      ballY:150,
      ballSpeedX: DEFAULT_SPEED,
      ballSpeedY: DEFAULT_SPEED,
      ballColor: "#7070FF",
      bgColor:"#000",
      paddleColor:"#7070FF",
      paddleWidth: 150,
      paddleHeight: 20,
      paddleX: 400,
      paddleCenter: 400+(150/2),
      paddleBottomOffset: 50,
      paddleBorder:{},
      brickRows: 5,
      brickColumns: BRICK_COLUMNS,
      brickWidth:50,
      brickHeight: 25,
      brickColor: '#fffb00',
      bricks: new Array(BRICK_COLUMNS)
    }
  }



  componentDidMount() {
   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;


   this.populateBricks();
   setInterval(this.renderScreen.bind(this), 1000/FPS);


  }

  getPaddleBorders(){
    var paddleTopY = this.h - this.state.paddleBottomOffset;
    var paddleBottomY = paddleTopY + this.state.paddleHeight;
    var paddleLeftX = this.state.paddleX;
    var paddleRightX = paddleLeftX + this.state.paddleWidth;

    this.setState({
      paddleBorder:{
        TopY: paddleTopY,
        BottomY: paddleBottomY,
        LeftX: paddleLeftX,
        RightX: paddleRightX
      }
    });
  }

  populateBricks(){
    for(var i=0; i<(this.state.brickColumns*this.state.brickRows); i++){
      this.state.bricks[i] = true;
    }
    let b = this.state.bricks;
    this.setState({
      bricks:b,
      brickWidth: (this.w / this.state.brickColumns+0.1)
    });
  }
  indexByColNRow(col,row){
    return this.state.brickColumns * row + col;
  }

  renderBlocks(){

    for(var row=0; row<this.state.brickRows; row++){
      for(var column=0; column<this.state.brickColumns; column++){
        let index = this.indexByColNRow(column,row);
        if (this.state.bricks[index]){
          this.drawRect(this.state.brickWidth*column,(this.state.brickHeight*row),this.state.brickWidth-BRICK_GAP,this.state.brickHeight-BRICK_GAP,this.state.brickColor);
        }
      }
    }


  }

  renderScreen(){
    var x = this.state.ballX;
    var y = this.state.ballY;

    this.getPaddleBorders();

    this.setState({
      ballX: (x+this.state.ballSpeedX),
      ballY: (y+this.state.ballSpeedY)
    });
    this.moveAll();
  }
  ballBorders(xSpeed,ySpeed){
    if(this.state.ballX < (this.state.ballSize)){
      xSpeed *= -1;
      this.setState({
        ballSpeedX: xSpeed
      })
    }
    if(this.state.ballX > (this.w-this.state.ballSize)){
      xSpeed *= -1;
      this.setState({
        ballSpeedX: xSpeed
      })
    }
    if(this.state.ballY < (this.state.ballSize)){
      ySpeed *= -1;
      this.setState({
        ballSpeedY: ySpeed
      })
    }
    if(this.state.ballY > (this.h-this.state.ballSize)){
      this.ballReset()
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
      this.setState({
        ballSpeedY: ySpeed,
        ballSpeedX: xSpeed
      })
    }
  }
  ballNBrick(){
    let b = this.state.bricks;
    let s = this.state.ballSpeedY;

    let ballNBrickColumn = Math.floor(this.state.ballX / this.state.brickWidth);
    let ballNBrickRow = Math.floor(this.state.ballY / this.state.brickHeight);
    let brickColideByBall= this.indexByColNRow(ballNBrickColumn,ballNBrickRow);

    if((ballNBrickColumn >=0) &&
      (ballNBrickColumn < this.state.brickColumns) &&
      (ballNBrickRow>=0) &&
      (ballNBrickRow < this.state.brickRows)){
      if(b[brickColideByBall]){
        b[brickColideByBall]=false;
        this.setState({
          bricks:b,
          ballSpeedY: s*-1
        });
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

    this.renderBlocks();
  }

  handlePaddleColor(e){
    this.setState({
      paddleColor: e.target.value
    });
  }

  handleBallColor(e){
    this.setState({
      ballColor: e.target.value
    });
  }

  handleBGColor(e){
    this.setState({
      bgColor: e.target.value
    });
  }

  handleBrickColor(e){
    this.setState({
      brickColor: e.target.value
    });
  }

  handleBallSize(e){
    this.setState({
      ballSize: e.target.value
    });
  }

  drawRect(TLX,TLY,Width,Height,Fill){
     this.ctx.fillStyle=Fill;
     this.ctx.fillRect(TLX,TLY,Width,Height);
  }

  drawText(words, textX, textY, color){
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
      this.setState({
        paddleX: x,
        paddleCenter: x + (this.state.paddleWidth/2)
      });
    }
  }

  ballReset(){
    this.setState({
      ballSpeedX:0,
      ballSpeedY:0,
      ballX: this.w/2,
      ballY:this.h/2
    });
    var rnd = Math.random() < 0.5 ? -1 : 1;
    setTimeout(function(){
      this.setState({
        ballSpeedX:DEFAULT_SPEED*rnd,
        ballSpeedY:DEFAULT_SPEED,
      });
    }.bind(this),3000);
  }

  render(){
    return(
     <div>
       <div className="action-buttons row">
         <div className="col-sm-12 text-left form-inline">
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="ball_color">Ball:</label>
               </span>
               <input type="color" value={this.state.ballColor} name="ball_color" className="form-control" id="ball_color" onChange={this.handleBallColor.bind(this)} />
             </div>
           </div>
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="paddle_color">Paddle:</label>
               </span>
               <input type="color" value={this.state.paddleColor} name="paddle_color" className="form-control" id="paddle_color" onChange={this.handlePaddleColor.bind(this)} />
             </div>
           </div>
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="bg_color">Background:</label>
               </span>
               <input type="color" name="color" className="form-control" id="bg_color" onChange={this.handleBGColor.bind(this)} />
             </div>
           </div>
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="brick_color">Bricks:</label>
               </span>
               <input type="color" value={this.state.brickColor} name="brick_color" className="form-control" id="brick_color" onChange={this.handleBrickColor.bind(this)} />
             </div>
           </div>
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon">
                 Ball Size:
               </span>
               <input type="range" min="1" max="20" name="ball_size" className="form-control" id="ball_size" onChange={this.handleBallSize.bind(this)} />
             </div>
           </div>
         </div>
       </div>

       <canvas
         ref={(c) => this.canvas = c}
         onMouseMove={this.handleMouseMove.bind(this)}
         />
     </div>
   );
  }
}

export default Breakout
