var c = document.getElementById("screen");
var ctx = c.getContext("2d");

var pos = 320;

var reload = 0;
var shower = 0;
var score = 0;

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var bullets = new Array();
var meteors = new Array();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	}
	else if (e.keyCode == 37) {
		leftPressed = true;
	}
	else if (e.keyCode == 32) {
		spacePressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	}
	else if (e.keyCode == 37) {
		leftPressed = false;
	}
	else if (e.keyCode == 32) {
		spacePressed = false;
	}
}

var Bullet = function (x, y) {
	this.x = x;
	this.y = y;
	this.exists = true;
};

var Meteor = function (x, y) {
	this.x = x;
	this.y = y;
	this.exists = true;
};

function rInt(max) {
    return Math.floor((Math.random() * max) + 1);
}

function drawShip() {
	ctx.beginPath();
	ctx.fillRect(pos - 15, 455, 10, 15);
	ctx.fillRect(pos - 5, 440, 10, 30);
	ctx.fillRect(pos + 5, 455, 10, 15);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath;
}

function drawMeteor(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 15, 0, 2 * Math.PI)
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath;
}

function drawBullet(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, 2 * Math.PI)
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath;
}


function update() {
	
	ctx.clearRect(0, 0, c.width, c.height);
	
	drawShip();
	
	ctx.font = "10px Arial";
	ctx.fillText("SCORE: " + score, 10, 470);
	
	shower += 1;
	
	if (shower == 100) {
		meteors.push(new Meteor((rInt(15)*40), 30));
		shower = 0;
	}
	
	for (var i = 0; i < meteors.length; i++) {
		drawMeteor(meteors[i].x, meteors[i].y);
		meteors[i].y += 1;
		for (var j = 0; j < bullets.length; j++) {
			if (Math.abs(meteors[i].x - bullets[j].x) < 20 && Math.abs(meteors[i].y - bullets[j].y) < 20) {
				meteors[i].exists = false;
				bullets[j].exists = false;
				score += 1;
			}
		}
	}
	
	reload += 1;
	
	for (var i = 0; i < bullets.length; i++) {
		drawBullet(bullets[i].x, bullets[i].y);
		bullets[i].y -= 10;
		if (bullets[i].y < 10) {
			bullets[i].exists = false;
		}
	}
	
	for (var i = bullets.length - 1; i >= 0; i--) {
		if (bullets[i].exists == false) {
			bullets.splice(i, 1);
		}
	}
	
	for (var i = meteors.length - 1; i >= 0; i--) {
		if (meteors[i].exists == false) {
			meteors.splice(i, 1);
		}
	}
	
	if (rightPressed && pos < 625) {
		pos += 5;
	}
	else if (leftPressed && pos > 15) {
		pos -= 5;
	}
	else if (spacePressed && reload>50) {
		bullets.push(new Bullet(pos, 430));
		reload = 0;
	}
	
	for (var i = 0; i < meteors.length; i++) {
		if ((meteors[i].y > 465) || (Math.abs(meteors[i].x - pos) < 30 && meteors[i].y > 425)) {
			gameOver();
		}
	}
	
}

function gameOver() {
	clearInterval(gameInit);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.font = "40px Arial";
	ctx.fillText("GAME OVER", 200, 200);
	ctx.font = "10px Arial";
	ctx.fillText("SCORE: " + score, 10, 470);
}

var gameInit = setInterval(update, 10);