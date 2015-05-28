document.addEventListener("deviceready", init, false);

function init(){

	/*VARIABLES*/
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var drawing = false;
	var color  = "#000"
	var ancho = 3;
	var contador = 0;
	
	/*TAMAÑO CANVAS*/
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 100;
	
	/*FONDO BLANCO DEL CANVAS*/
	var canvasW = canvas.width;
	var canvasH = canvas.height;
	ctx.fillStyle = "#fff";
	ctx.fillRect (0, 0, canvasW, canvasH);
	
	/*AÑADIR IMAGEN*/
	var img = new Image();
	img.src = "img/dos.jpg";
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	}
	
	/*DIBUJAR*/
	canvas.addEventListener("touchstart", inicio, false);
	canvas.addEventListener("touchmove", movimiento, false);
	canvas.addEventListener("touchend", fin, false);
	function inicio(e){
		e.preventDefault();
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = ancho;
		ctx.moveTo(e.touches[0].pageX, e.touches[0].pageY);
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
	function fin(e){
		e.preventDefault();
		ctx.closePath();
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

}