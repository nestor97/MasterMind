var AMPLE, ALTURA;
var canvas,ctx;
var colorAtras = "blue";
var inicioX = 10;
var inicioY = 10;
var filaAncho = 200;
var filaAlto = 35;
var casillaNum = 55;
var casillaEva = 75;
var radioGris = 10;
var radioColor = 15;

/*
var cartaMargen = 30;
var cartaLon = 30;
var cartaAncho = cartaLon * 4;
var cartaLargo = cartaLon * 4;
var cartas_array = new Array();**/

/*Colores */
var coloresCuerpo_array = ["#efd5c6", "#ff9899", "#fde681", "#59f975", "#72e1ff", "#a0e5d2", "#e1ccf7", "#cedec1", "#c3d2d9", "#a3b8ed", "#8d1b1b"];
var coloresNumFila_array = ["","#ff9698","#fee580","#66ff66","#7fe5fe","#bae9c7","#ffccf4","#eae3b6", "#dfd5d4", "#b5b9e9", ""];
var coloresEvaFila_array = ["","#fe9695","#fed980","#78f06a","#93d7ea","#c0dec4","#ffc3e7","#eed6b2", "#e2caca", "#c1b0dd", ""];
var coloresBolas_array = ["blue", "red", "BlueViolet", "orange", "aquamarine", "yellow", "skyblue"];
var coloresBolas_array = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(138, 43, 226)", "rgb(255,165,0)", "rgb(127, 255, 212)", "rgb(255,255,0)", "rgb(135, 206, 235)"];
var bolaGris = "rgb(220, 220, 220)";

var numero = coloresCuerpo_array.length -1;

function Bola(x, y, ancho, largo, color){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.largo = largo;
	this.color = color;  // el valor de la carta
	this.dibuja = dibujaCarta;	
}

function dibujaFila(x, y, ancho, largo, i){
    //console.log("dibujaFila"+ x+"-"+y+"-"+ ancho+"-"+ largo+"-"+ i);
    if(i==0 || i==10){
        ancho = 330;
        ctx.fillStyle = coloresCuerpo_array[i];
        ctx.fillRect(x, y, ancho, largo);
        if(i==10){
            x += 55;
            y += 27;
            ctx.fillStyle = "white";
            ctx.font = "25px Technique OL BRK";
            ctx.fillText("MASTERMIND",x,y);
        }
        if(i==0){
           dibujaCirculos(x,y, 7); 
        }
    }
    
     
    if(i>0 && i < 10){
        //dibujamos la casilla del Numero de Fila
        ctx.fillStyle = coloresNumFila_array[i];
        ctx.fillRect(x, y, casillaNum, largo);

        //Escribimos el numero de fila
        var w = casillaNum/2;
        if(i==1){
            w += 5;
        }
        ctx.fillStyle = "white";
        ctx.font = "25px Technique OL BRK";
        ctx.fillText(i,w,y+(largo-8));
        
        
        //dibujamos el cuerpo central
        ctx.fillStyle = coloresCuerpo_array[i];
        ctx.fillRect(x+casillaNum, y, ancho, largo);
        dibujaCirculos(x+casillaNum,y, 5);
        
        //Dibujamos la casilla con los datos de verificacion
        ctx.fillStyle = coloresEvaFila_array[i];
        ctx.fillRect(x+casillaNum+ancho, y, casillaEva, largo);
    }
    

}

function dibujaCirculos(x,y, n){
    var j;
    var r;
    
    ctx.beginPath();
    for(j=0; j<n; j++){
        if(n==5){
            ctx.fillStyle = bolaGris;
            r=radioGris;
        }else{
            console.log(coloresBolas_array[j]);
            ctx.fillStyle = coloresBolas_array[j];
            r=radioColor;
            if(j==0){
                x += 10;
            }else{
                x+=5;
            }
            
        }
        ctx.beginPath(); 
        ctx.arc(x+20, y+(filaAlto/2), r, 0, 2 * Math.PI);
        ctx.fill();            
           x += 40;
    }
}

function tablero(){
    console.log("tablero");
	var i;
	var fila;
	var x = inicioX;
	var y = inicioY;
	for(i=10; i >=0; i--){
        if(i==0 || i == 9){
            y += 10;
        }

        console.log("i--->"+i+" y--->"+y);
        
        dibujaFila(x, y, filaAncho, filaAlto, i );
        
        //Aumentamos valor de y
        y += filaAlto;
	}
}




function init(){
    //obtenir una referencia al llenç
    console.log("inicio");
    canvas = document.getElementById("miCanvas");
    
    /*
    ctx.fillStyle = colores_array[0];
    ctx.fillRect(inicioX, inicioY, filaAncho, filaAlto);*/
    
    
	if(canvas && canvas.getContext){
        console.log("2d");
		ctx = canvas.getContext("2d");
		if(ctx){
            //canvas.addEventListener("click",selecciona,false);
            console.log("ctx");
			tablero();
		} else {
			alert("Error al crear tu contexto");	
		}
	}


    AMPLE = $('#miCanvas').width();
    ALTURA = $('#miCanvas').height();
    console.log(AMPLE+"---"+ALTURA);
    console.log("fila-->"+ALTURA/12);
    //dibuixa();
    
    canvas.addEventListener('click', (e) => {
        const mousePos = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
           
        };
        console.log($(Object).css('background-color'));
    });

    
    


    
}

//FINAL DEL CODI DE LA BIBLIOTECA

function dibuixa(){
    
   
    
}

init();