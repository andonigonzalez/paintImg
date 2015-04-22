document.addEventListener("deviceready", init, false);

function init(){

	/*VARIABLES*/
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var drawing = false;
	var color  = $("#color").val();
	var ancho = 3;
	
	/*TAMAÑO CANVAS*/
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 40;
	
	/*FONDO BLANCO DEL CANVAS*/
	var canvasW = canvas.width;
	var canvasH = canvas.height;
	ctx.fillStyle = "#fff";
	ctx.fillRect (0, 0, canvasW, canvasH);
	
	/*DIBUJAR*/
	/*MOVIL*/
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){			
		canvas.addEventListener("touchstart", inicio, false);
		canvas.addEventListener("touchmove", movimiento, false);
		canvas.addEventListener("touchend", fin, false);
		function inicio(e){
			e.preventDefault();
			ctx.strokeStyle = color;
			ctx.lineWidth = ancho;
			ctx.beginPath();
			ctx.moveTo(e.touches[0].pageX, e.touches[0].pageY);
		}
		function movimiento(e){
			ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
			ctx.stroke();					
		}
		function fin(){
			ctx.closePath();
		}
	}
	/*ORDENADOR*/
	else{
		$("#canvas").mousedown(function(e){
			drawing = true;
			ctx.strokeStyle = color;
			ctx.lineWidth = ancho;
			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		});
		$("#canvas").mousemove(function(e){
			if(drawing){
				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();
			}
		});
		$("#canvas").mouseup(function(){
			drawing = false;
			ctx.closePath();
		});
	}
	
	/*BOTONES*/
	$("#limpiar").click(function(){
		ctx.fillStyle = "#fff";
		ctx.fillRect (0, 0, canvasW, canvasH);
		color: $("#color").val();
	});
	$("#borrar").click(function(){
		color = "#fff";
		ancho = 24;
	});
	$("#dibujar").click(function(){
		color = $("#color").val();
		ancho = 3;
	});
	$("#color").change(function(){
		color = $("#color").val();
		ancho = 3;
	});
	$("#guardar").click(function(){
		window.canvas2ImagePlugin.saveImageDataToLibrary(
			function(msg){
				alert("guardado correctamente");
			},
			function(err){
				alert(err);
			},
			canvas
		);
	});

}