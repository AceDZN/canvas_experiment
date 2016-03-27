import React,{Component} from 'react';

class BouncingBall extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentWillMount(){
    var ball = {};
    this.ball = {size: 20,color:"#c0c0c0",old:"#ff0000"};
  	this.ball.y =  (this.ball.size+5);
  	this.ball.x =  (this.ball.size+5);
    this.direction = {x: 3, y: 3};
  }
  componentDidMount() {
   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;

   this.moveBall();
  }

  moveBall(){
    //var rnd = Math.floor((Math.random()*30)+10);
    if(this.ball.y>=(this.h-this.ball.size) || this.ball.y<=this.ball.size){
      this.ball.old = this.ball.color;
      this.ball.color = '#'+Math.random().toString(16).substr(-6);
      this.direction.y = -this.direction.y;
    }
    if(this.ball.x>=(this.w-this.ball.size) || this.ball.x<=this.ball.size){
      this.ball.old = this.ball.color;
      this.ball.color = '#'+Math.random().toString(16).substr(-6);

      this.direction.x = -this.direction.x;


    }
    this.ball.x += this.direction.x;
    this.ball.y += this.direction.y;

    this.draw();
    requestAnimationFrame(this.moveBall.bind(this));
  }
  draw(){
    	this.ctx.clearRect(0,0,this.w,this.h);

    	this.ctx.beginPath();
    	this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI*2, false);

    	var grd = this.ctx.createRadialGradient(this.direction.x,this.direction.y,this.ball.size,this.direction.x,this.direction.y,800);
    		grd.addColorStop(0,this.ball.old);
    		grd.addColorStop(.2,this.ball.color);
    		grd.addColorStop(.4,this.ball.old);
    		grd.addColorStop(.6,this.ball.color);
    		grd.addColorStop(.8,this.ball.old);
    		grd.addColorStop(1,this.ball.color);

    	this.ctx.fillStyle = grd;
    	this.ctx.strokeStyle='#fff';

    	this.ctx.lineWidth=5;
			this.ctx.shadowColor=this.ball.old;
    	this.ctx.shadowBlur = 5;
    	this.ctx.shadowOffsetX = 0;
    	this.ctx.shadowOffsetY = 0;
    	this.ctx.stroke();
    	this.ctx.fill();
  }
  render() {
   return <canvas ref={(c) => this.canvas = c} />;
  }



}

export default BouncingBall
