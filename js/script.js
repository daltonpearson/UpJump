//Dalton Pearson
//2/5/2018
//UpJump
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score1=0;
var score2=0;

var wPressed = false;
var aPressed = false;
var dPressed = false;
var sPressed = false;
var iPressed = false;
var jPressed = false;
var lPressed = false;
var kPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//should change key names to be more descriptive
var player1 = 	{	"c":"#3B1F2B",
					"v":1,
					"p":40,
					"x":0,
					"y":0,
					"dx":0,
					"dy":0,
					"av":0,
					"d":0,
					"r":function (){return (player1.d*(Math.PI/180))},
					"b":false,
					"bx":0,
					"by":0,
					"dbx":0,
					"dby":0
					}
var player2 = 	{	"c":"#255957",
					"v":-1,
					"p":-50,
					"x":0,
					"y":0,
					"dx":0,
					"dy":0,
					"av":0,
					"d":0,
					"r":function (){return (player2.d*(Math.PI/180))},
					"b":false,
					"bx":0,
					"by":0,
					"dbx":0,
					"dby":0
					}

player1.x = canvas.width*.25-50;
player1.y = canvas.height-100;
player2.x = canvas.width*.75-50;
player2.y = canvas.height-100;

function keyDownHandler(e) {
    if(e.keyCode == 87) {
        wPressed = true;
    }
    else if(e.keyCode == 65) {
        aPressed = true;
    }
    else if(e.keyCode == 83) {
        sPressed = true;
    }
    else if(e.keyCode == 68) {
        dPressed = true;
    }
    else if(e.keyCode == 73) {
        iPressed = true;
    }
    else if(e.keyCode == 74) {
        jPressed = true;
    }
    else if(e.keyCode == 75) {
        kPressed = true;
    }
    else if(e.keyCode == 76) {
        lPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 87) {
        wPressed = false;
    }
    else if(e.keyCode == 65) {
        aPressed = false;
    }
    else if(e.keyCode == 83) {
        sPressed = false;
    }
    else if(e.keyCode == 68) {
        dPressed = false;
    }
    else if(e.keyCode == 73) {
        iPressed = false;
    }
    else if(e.keyCode == 74) {
        jPressed = false;
    }
    else if(e.keyCode == 75) {
        kPressed = false;
    }
    else if(e.keyCode == 76) {
        lPressed = false;
    }
}





function drawPlayer(player) {
	
	
	ctx.save();
	ctx.font = "30px Arial";
	ctx.fillText(score1+" | "+score2,canvas.width*.5-40,50);
	rotate(player);
	


	ctx.beginPath();
	ctx.shadowBlur=20;
	ctx.shadowColor="black";
	ctx.rect(-50,-45,100,100);
	ctx.fillStyle = player.c;
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(player.p,0,10,10);
	ctx.fillStyle = "#F09D51";
	ctx.fill();
	ctx.closePath();
	
	ctx.restore();
	player.d+=player.av;
	
	
}
function drawBullet(player){
	ctx.beginPath();
	ctx.save();
	ctx.shadowBlur=20;
	ctx.shadowColor="black";
	ctx.arc(player.bx,player.by,10,0,2*Math.PI);
	ctx.fillstyle="#0033FF";
	ctx.fillStroke="#0033FF";
	ctx.Stroke="10"
	ctx.fill();
	ctx.restore();
	ctx.closePath();
}
function draw() {
	//Drawing code
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	if(player1.b)
		drawBullet(player1);
		if(player1.bx>canvas.width||player1.bx<0||player1.by>canvas.height||player1.by<0)
			player1.b=false;
	if(player2.b)
		drawBullet(player2);
		if(player2.bx>canvas.width||player2.bx<0||player2.by>canvas.height||player2.by<0)
			player2.b=false;
	drawPlayer(player1);
	drawPlayer(player2);	
	 
	if(wPressed&&player1.y==canvas.height-100){
		player1.dy=-20;
		player1.av=360/41;
	}
	else if(player1.y<canvas.height-100){
		player1.dy+=1;
		
	}
	else if(player1.y==canvas.height-100){
		player1.dy=0;
		player1.av=0;
	}
	//player overlap detection, should be a method
	if (sPressed&&player1.y<canvas.height-100&&!player1.b&&!(player1.y+50>player2.y&&player1.y+50<player2.y+100&&player1.x+50>player2.x&&player1.x<player2.x+100))
		{shoot(player1)}

	if(iPressed&&player2.y==canvas.height-100){
		player2.dy=-20;
		player2.av=-360/41;
	}
	else if(player2.y<canvas.height-100){
		player2.dy+=1;
		
	}
	else if(player2.y==canvas.height-100){
		player2.dy=0;
		player2.av=0;
	}
	//player overlap detection, should be a method
	if (kPressed&&player2.y<canvas.height-100&&!player2.b&&!(player2.y+50>player1.y&&player2.y+50<player1.y+100&&player2.x+50>player1.x&&player2.x<player1.x+100))
		{shoot(player2)}
	if (aPressed&&player1.x>0){player1.x-=10}
	if (dPressed&&player1.x<canvas.width-100){player1.x+=10}
	if (jPressed&&player2.x>0){player2.x-=10}
	if (lPressed&&player2.x<canvas.width-100){player2.x+=10}
	player1.x += player1.dx;
    player1.y += player1.dy;
    player2.x += player2.dx;
    player2.y += player2.dy;
    player1.bx += player1.dbx;
    player1.by += player1.dby;
    player2.bx += player2.dbx;
    player2.by += player2.dby;
    scoreAlert();
    hit();
   
}

function rotate(player) {

	
	
	ctx.translate(player.x+50,player.y+50);
	ctx.rotate(player.r());
	
	
}
function shoot(player){

	player.bx=player.x+50;
	player.by=player.y+50;
	player.dby=player.v*Math.sin(-player.d*Math.PI/180)*-10;
	player.dbx=player.v*Math.cos(-player.d*Math.PI/180)*10;
	
	player.b=true;
	
	
}
function hit(){
	if(player1.b&&player1.bx>player2.x&&player1.bx<player2.x+100&&player1.by>player2.y&&player1.by<player2.y+100){
		score1++;
		player1.b=false;
		
	}
	if(player2.b&&player2.bx>player1.x&&player2.bx<player1.x+100&&player2.by>player1.y&&player2.by<player1.y+100){
		score2++;
		player2.b=false;
		}
}
function bulletReset(player){
	player.b=false;
}
function scoreAlert(){
	if (score1>=10){
		alert("Player 1 Wins!");
		location.reload();
		return true;
	}
	if (score2>=10){
		alert("Player 2 Wins!");
		location.reload();
		return true;
	}
}
draw();
alert("Player 1 use the w, a, d keys to move and s to shoot.\nPlayer 2 use the i, j, l keys to move and k to shoot.\nYou can only shoot while in the air and you can only have one bullet on the screen at one time.\nFirst to 10 points wins!");
setInterval(draw, 20);
