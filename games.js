//			config

 
var CarEverySecond = 50;
var CarSpeed = 5;
var directionSpeed = 5;

//			Game
var myVehicle;
var otherVehicle = [];
var started = false;
var score;
var gameOver;
var terrain;
var carColors=['white','black','red','brown','yellow','green','blue'];

function startGame(){
	document.getElementById('player').style.backgroundColor = 'transparent';
	document.getElementById('player').style.display = 'none';
	document.getElementById('headline').style.display = 'none';
	document.addEventListener("contextmenu", function (e) {
     e.preventDefault();
	 }, false);
	if(started===false){
		game.start();
		map();
		myVehicle = new myCar(58, 100, "cars/red-car.png", 375, 400);
		started=true;
	}
}
function replay(){
	document.getElementById('player').style.backgroundColor = 'transparent';
	document.getElementById('player').style.display = 'none';
	document.getElementById('headline').style.display = 'none';
	if(started===false){
		game.clear();
		game.frameNo = 0;
		CarSpeed = 5;
		CarEverySecond = 20;
		directionSpeed = 5;
		otherVehicle = [];
		myVehicle = new myCar(58, 100, "cars/red-car.png", 375, 400);
		started=true;
	}
}

var game = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.canvas.style.cursor = "none";
        this.frameNo = 0;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game").insertBefore(this.canvas, document.getElementById("game").childNodes[0]);
        this.interval = setInterval(updateGame, 20);
        window.addEventListener('keydown', function (e) {
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            game.keys[e.keyCode] = (e.type == "keydown"); 
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function myCar(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = color;
    this.direction = 0;
    this.speed=0;
    this.x = x;
    this.y = y;
    this.update = function(){
    	ctx = game.context;
    	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	this.newPos = function() {
        this.x += this.direction;
        if(this.x < 69){
        	this.x= 70;
        }
        if(this.x > 661){
        	this.x= 660;
        }
    }
    this.newSpeed = function(){
    	this.x += this.speed;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom-20 < othertop) || (mytop+10 > otherbottom) || (myright-15 < otherleft) || (myleft+15 > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function otherCar(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = color;
    this.direction = 100;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.update = function(){
    	ctx = game.context;    
    	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	this.remove = function(i){
		otherVehicle.splice(i,1);
	}
}

function updateGame() {
	for (i = 0; i < otherVehicle.length; i += 1) {
        if (myVehicle.crashWith(otherVehicle[i])) {
        	crash();
            return;
        }
        if(otherVehicle[i].y > 500){
			otherVehicle[i].remove();
			i-=1;
		}
    }
	game.clear();
	map();
	document.getElementById('score').innerHTML="Score:"+score;
	document.getElementById('speed').innerHTML="Speed:"+(CarSpeed*10).toFixed();
	game.frameNo += 1;
	if (game.frameNo == 1 || everyinterval(CarEverySecond)) {
		mannyCars();
	}
	for (i = 0; i < otherVehicle.length; i += 1) {
        otherVehicle[i].y += CarSpeed;
        otherVehicle[i].update();
    }
	controllers();
    myVehicle.newPos();
    myVehicle.newSpeed();
    myVehicle.update();
    score=Math.round((game.frameNo*CarSpeed)/5);
}

function mannyCars(){
	var pos = [66,66*2,66*3,66*4,66*5,66*6,66*7,66*8,66*9,66*10];
	var vehicleColor = Math.floor(Math.random()*(7-0)+0);
	otherVehicle.push(new otherCar(58, 100, "cars/"+carColors[vehicleColor]+"-car.png", pos[Math.floor(Math.random()*(10-0)+0)], -120));
}

function everyinterval(n) {
    if ((game.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function map(){
	terrain = game.context;
	terrain.fillStyle = 'darkgray';
	terrain.fillRect(70,0,650,500);
}

function crash(){
    gameOver= game.context;
	gameOver.font="30px Helvetica"
	gameOver.strokeText('Game Over',320,200);
	document.getElementById('play').setAttribute('onclick','replay()');
	document.getElementById('play').innerHTML = 'REPLAY';
	document.getElementById('player').style.display = 'flex';
	started=false;
}

function controllers(){
	myVehicle.direction = 0;
	if (game.keys && game.keys[39]) {myVehicle.direction =  directionSpeed; }
    if (game.keys && game.keys[37]) {myVehicle.direction = - directionSpeed; }
    if (game.keys && game.keys[68]) {myVehicle.direction =  directionSpeed; }
    if (game.keys && game.keys[65]) {myVehicle.direction = - directionSpeed; }
    if (game.keys && game.keys[87] || game.keys && game.keys[38]) {CarSpeed = CarSpeed + 0.05; 
    	if(CarSpeed > 20){
    		CarSpeed = 20;
    	}
    	CarEverySecond -= CarSpeed;
    	if(CarEverySecond < 10 ){
    		CarEverySecond = 15;
    	}
    }
    if (game.keys && game.keys[83] || game.keys && game.keys[40]) {CarSpeed = CarSpeed - 0.3; 
    	if(CarSpeed < 3){
    		CarSpeed = 3;
    	}
    	CarEverySecond += CarSpeed;
    	if(CarEverySecond > 30 ){
    		CarEverySecond = 30;
    	}
    }
}
function arrowPressLeft(){
	myVehicle.speed -= 5;
}
function arrowPressRight(){
	myVehicle.speed += 5;
}
function arrowPressUp(){
	CarSpeed = CarSpeed + 0.5; 
	if(CarSpeed > 20){
		CarSpeed = 20;
	}
	CarEverySecond -= CarSpeed;
	if(CarEverySecond < 10 ){
		CarEverySecond = 15;
	}
}
function arrowPressDown(){
	CarSpeed = CarSpeed - 1; 
	if(CarSpeed < 3){
		CarSpeed = 3;
	}
	CarEverySecond += CarSpeed;
	if(CarEverySecond > 30 ){
		CarEverySecond = 30;
	}
}	
function arrowStopLeft(){
	myVehicle.speed = 0;
}
function arrowStopRight(){
	myVehicle.speed = 0;
}
function arrowStopUp(){
	CarSpeed = CarSpeed;
}
function arrowStopDown(){
	CarSpeed = CarSpeed;
}
