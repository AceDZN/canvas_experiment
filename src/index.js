var canvas = document.getElementById('app');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext('2d');

var	ball = {size: 20,color:"#c0c0c0",old:"#ff0000"};
	ball.y =  (ball.size+5);
	ball.x =  (ball.size+5);


var direction = {x: 1, y: 1};

function draw(){

	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2, false);

	var grd = ctx.createRadialGradient(direction.x,direction.y,ball.size,direction.x,direction.y,800);
		grd.addColorStop(0,ball.old);
		grd.addColorStop(.2,ball.color);
		grd.addColorStop(.4,ball.old);
		grd.addColorStop(.6,ball.color);
		grd.addColorStop(.8,ball.old);
		grd.addColorStop(1,ball.color);

	ctx.fillStyle = grd;
	ctx.shadowColor = ball.old;
	ctx.shadowBlur = 10;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;

	ctx.fill();
}
function moveBall(){
	//var rnd = Math.floor((Math.random()*30)+10);
	if(ball.y>=(canvas.height-ball.size) || ball.y<=ball.size){
		ball.old = ball.color;
		ball.color = '#'+Math.random().toString(16).substr(-6);
		direction.y = -direction.y;
	}
	if(ball.x>=(canvas.width-ball.size) || ball.x<=ball.size){
		ball.old = ball.color;
		ball.color = '#'+Math.random().toString(16).substr(-6);

		direction.x = -direction.x;

	}
	ball.x += direction.x;
	ball.y += direction.y;
	draw();
	requestAnimationFrame(moveBall);
}
moveBall();
