document.addEventListener("DOMContentLoaded", init, false);

/*VARIABLES*/
var canvas = null;
var ctx = null;
var drawing = false;
var color  = "#000"
var ancho = 3;
var contador = 0;
var target = new Circle(20, 20, 20);
//var player = new Circle(0, 0, 10);
var x = 0;
var y = 0;

function init(){
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	/*TAMAÑO CANVAS*/
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 100;
	
	/*AÑADIR IMAGEN*/
	var img = new Image();
	img.src = "img/dos.jpg";
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	}
	
	run();
	
}

/*CIRCULO*/
function Circle(x,y,radius){
	this.x=(x==null)?0:x;
	this.y=(y==null)?0:y;
	this.radius=(radius==null)?0:radius;
}

Circle.prototype.stroke=function(ctx){
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
	ctx.stroke();
	ctx.closePath();
}

Circle.prototype.distance=function(circle){
	if(circle!=null){
		var dx=this.x-circle.x;
		var dy=this.y-circle.y;
		return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
	}
}
	
/*DIBUJAR*/
document.addEventListener("touchstart", inicio, false);
document.addEventListener("touchmove", movimiento, false);

function inicio(e){
	e.preventDefault();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = ancho;
	ctx.arc(e.touches[0].pageX, e.touches[0].pageY, .3, 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
}
function movimiento(e){
	e.preventDefault();
	x = e.touches[0].pageX - canvas.offsetLeft;
	y = e.touches[0].pageY - canvas.offsetTop;
	ctx.lineTo(x, y);
	ctx.stroke();
	if(x < 0 || x > canvas.width || y < 0 || y > canvas.height){
		contador++;
		return false;
	}
}

function run(){
	requestAnimationFrame(run);
	//act();
	paint(ctx);
}
function act(){

	
}
function paint(ctx){
	//ctx.strokeStyle='#0f0';
	//player.stroke(ctx);
	ctx.strokeStyle='#f00';
	target.stroke(ctx);
}

/*BOTONES*/
$("#limpiar").click(function(){
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvasW, canvasH);
	color = "#000";
});

$("#resultado").click(function(){
	alert("Te has salido " + contador + " veces");
});

$("#dibujar").click(function(){
	color = "#000";
	ancho = 3;
});

$("#recargar").click(function(){
	init();
});

window.requestAnimationFrame=(function(){
	return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		function(callback){window.setTimeout(callback,17);};
})();