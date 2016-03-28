import React,{Component} from 'react';

class Breakout extends Component {
  constructor(props){
    super(props);
    this.state = {
      framePerSec: 30,
      ballSize:10,
      ballX:75,
      ballY:75,
      ballSpeedX: 5,
      ballSpeedY: 5,
      ballColor: "#7070FF",
      bgColor:"#000",
      paddleColor:"#7070FF",
      paddleWidth: 150,
      paddleHeight: 20,
      paddleX: 400,
      paddleBottomOffset: 20
    }
  }
  componentWillMount(){

  }
  componentDidMount() {
   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;

   setInterval(this.updateAll.bind(this), 1000/this.state.framePerSec);

  }
  updateAll(){
    var x = this.state.ballX;
    var y = this.state.ballY;

    this.setState({
      ballX: (x+this.state.ballSpeedX),
      ballY: (y+this.state.ballSpeedY)
    });
    this.moveBall();

  }

  moveBall(){
    var xSpeed = this.state.ballSpeedX;
    var ySpeed = this.state.ballSpeedY;

    var paddleTopY = this.h - this.state.paddleBottomOffset;
    var paddleBottomY = paddleTopY + this.state.paddleHeight;
    var paddleLeftX = this.state.paddleX;
    var paddleRightX = paddleLeftX + this.state.paddleWidth;

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
    if(this.state.ballY > (this.h-this.state.ballSize )){
      this.ballReset()
    }

    if(this.state.ballY > (paddleTopY-this.state.ballSize) &&
      this.state.ballY < (paddleBottomY-this.state.ballSize) &&
      this.state.ballX > (paddleLeftX-this.state.ballSize) &&
      this.state.ballX < (paddleRightX-this.state.ballSize)
    ){
      ySpeed *= -1;
      this.setState({
        ballSpeedY: ySpeed
      })
    }




    this.drawRect(0,0,this.w,this.h,this.state.bgColor);
    this.drawBall(this.state.ballX, this.state.ballY, this.state.ballSize,this.state.ballColor);
    this.drawRect(this.state.paddleX,(this.h-this.state.paddleBottomOffset),this.state.paddleWidth,this.state.paddleHeight,this.state.paddleColor);


  }


  drawRect(TLX,TLY,Width,Height,Fill){
     this.ctx.fillStyle=Fill;
     this.ctx.fillRect(TLX,TLY,Width,Height);
  }

  drawBall(ballX,ballY,ballSize,fill){
    this.ctx.fillStyle=fill;
    this.ctx.beginPath();
    this.ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2, true);
    this.ctx.fill();
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
  handleBallSize(e){
    this.setState({
      ballSize: e.target.value
    });
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
      this.setState({
        paddleX: (loc > 0 ? loc : 0)
      });
    }






  }
  ballReset(){
    this.setState({
      ballX: 75,
      ballY:75
    })
  }
  render() {
   return(
     <div>
       <div className="action-buttons row">
         <div className="col-sm-9 text-left form-inline">
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="ball_color">Ball Color</label>
               </span>
               <input type="color" value={this.state.ballColor} name="color" className="form-control" id="ball_color" onChange={this.handleBallColor.bind(this)} />
             </div>
           </div>
           <div className="form-group">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="bg_color">Background Color</label>
               </span>
               <input type="color" name="color" className="form-control" id="bg_color" onChange={this.handleBGColor.bind(this)} />
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
