var AMPLE, ALTURA;
var canvas,ctx;
var colorAtras = "blue";
var inicioX = 10;
var inicioY = 10;
var filaAncho = 200;
var filaAlto = 35;
var casillaNum = 55;
var casillaEva = 75;
var radioGrisPequeño = 5;
var radioGris = 10;
var radioColor = 15;
var filas = new Array(); //Bolas del panel
var filas2 = new Array(); //Bolas de los aciertos
var numFilas=10;
var m;
for(m=0; m<numFilas; m++){
    filas[m] = new Array();
    if(m>0){
        filas2[m] = new Array();
    }
}
console.log("numFilas: "+filas.length);
console.log("numFilas2: "+filas2.length);


/*Colores */
var coloresCuerpo_array = ["#efd5c6", "#ff9899", "#fde681", "#59f975", "#72e1ff", "#a0e5d2", "#e1ccf7", "#cedec1", "#c3d2d9", "#a3b8ed", "#8d1b1b"];
var coloresNumFila_array = ["","#ff9698","#fee580","#66ff66","#7fe5fe","#bae9c7","#ffccf4","#eae3b6", "#dfd5d4", "#b5b9e9", ""];
var coloresEvaFila_array = ["","#fe9695","#fed980","#78f06a","#93d7ea","#c0dec4","#ffc3e7","#eed6b2", "#e2caca", "#c1b0dd", ""];
var coloresBolas_array = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(138, 43, 226)", "rgb(255,165,0)", "rgb(127, 255, 212)", "rgb(255,255,0)", "rgb(135, 206, 235)"];
var bolaGris = "rgb(220, 220, 220)";

var numero = coloresCuerpo_array.length -1;


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
           //dibujaCirculos(x,y, 7,i); 
           guardaCirculos(x,y, 7,i);
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
        //dibujaCirculos(x+casillaNum,y, 5, i);
        guardaCirculos(x+casillaNum,y, 5, i);
        
        //Dibujamos la casilla con los datos de verificacion
        ctx.fillStyle = coloresEvaFila_array[i];
        ctx.fillRect(x+casillaNum+ancho, y, casillaEva, largo);
        guardaCirculosAciertos(x+casillaNum+ancho, y, 5, i);
    }
    

}



function guardaCirculos(x,y, n, i){
    var j;
    var r;

    x += 20;
    y += filaAlto/2;
    
    ctx.beginPath();
    for(j=0; j<n; j++){
        if(n==5){
            filas[i].push(
                {
                  x: x,
                  y: y,
                  radius: radioGris,
                  color: bolaGris
                });
        }else{
            console.log(coloresBolas_array[j]);
            ctx.fillStyle = coloresBolas_array[j];
            r=radioColor;
            if(j==0){
                x += 10;
            }else{
                x+=5;
            }

            filas[i].push(
                {
                  x: x,
                  y: y,
                  radius: radioColor,
                  color: coloresBolas_array[j]
                });
            
        }
                
           x += 40;
    }
}

function guardaCirculosAciertos(x,y, n, i){
    var j;
    var r;
    var dx = x+casillaEva/6;
    var dy = y+filaAlto/4;


    ctx.beginPath();
    for(j=0; j<n; j++){
        console.log("fila: "+i+" columna: "+j+" dx: "+dx+" dy: "+dy);
        if(j<3){
            filas2[i].push(
                {
                  x: dx,
                  y: dy,
                  radius: radioGrisPequeño,
                  color: bolaGris
                });
            
            dx += casillaEva/3;
            if(j==2){
               dy += filaAlto/2; 
            }
             
        }else{
            if(j==3){
                dx = x+casillaEva/3;
            }else{
                dx += casillaEva/3;
            }            
            filas2[i].push(
                {
                  x: dx,
                  y: dy,
                  radius: radioGrisPequeño,
                  color: bolaGris
                });
            
        }
    }

}

/****************** */

function dibujarCircles(circles){
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = circle.color;
        ctx.fill();
      });    
}


function dibuix(circle, index){
    console.log(index);
    console.log(circle);
}

function dibuixaFileres(f, ff){
    var i;
    for(i=0; i<f.length; i++){
        dibujarCircles(f[i]);
        if(i>0){
            dibujarCircles(ff[i]);
        }
        
    }
}




/****************** */


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
    
    dibuixaFileres(filas, filas2);
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
    

 /**OBTENER INFORMACION DE LOS CIRCULOS */

 /*** Se calcula posicion de los circulos y se hace click */
 function isIntersect(point, circle) {
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
  }


canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX-canvas.offsetLeft,
      y: e.clientY-canvas.offsetTop
    };

    console.log("posicion----> x:"+pos.x+ ' y: '+pos.y);

    var i;
    for(i=0; i<filas.length; i++){
        filas[i].forEach(circle => {
            if (isIntersect(pos, circle)) {
                
              alert('click on circle: ' + 'x: '+circle.x+' y: '+circle.y+' color:'+circle.color+' radius:'+circle.radius+' id:'+circle.id+' fila:'+i );
             // dibujaCirculo(circle);
            }
            //console.log(isIntersect(pos, circle));
          });
    }
    
  });
 
  /*
  var cont=1;
  for(i=0; i<filas.length; i++){
    filas[i].forEach(circle => {        
            console.log("fila: "+i+", circulo: "+cont+", color: "+circle.color);
            cont++;        
    });

    console.log('canvas click');
   }**/

  /************** */
    console.log("filas");
    console.log(filas);
    console.log("filas2");
    console.log(filas2);


    
}

//FINAL DEL CODI DE LA BIBLIOTECA

function dibuixa(){
    
   
    
}

init();



