var canvas = document.getElementById('app');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext('2d');

var	ball = {size: 20,color:'blue'};
ball.y =  (ball.size+5);
		ball.x =  (ball.size+5);


var direction = {x: 5, y: 5};

function draw(){

	//ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2, false);
	ctx.fillStyle = ball.color;
	ctx.fill();
}

function moveBall(){
	//var rnd = Math.floor((Math.random()*30)+10);



	if(ball.y>=(canvas.height-ball.size) || ball.y<=ball.size){
		ball.color = '#'+Math.random().toString(16).substr(-6);
		direction.y = -direction.y;
	}

	if(ball.x>=(canvas.width-ball.size) || ball.x<=ball.size){
		ball.color = '#'+Math.random().toString(16).substr(-6);
		direction.x = -direction.x;
	}

	ball.x += direction.x;
	ball.y += direction.y;

	draw();
	requestAnimationFrame(moveBall);
}
moveBall();
