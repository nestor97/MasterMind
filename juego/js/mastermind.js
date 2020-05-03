var AMPLE, ALTURA;
var canvas, ctx;
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
var numFilas = 10;
var m;
let posicionSelecionada;
let posicionSelecionadaIndex;
var bolasElegidas = new Array(); // bolas aleatorias para ganar
let audio;

crearArrayVacio();

// Crear los arrays de datos de los circulos de colores y de resultados
function crearArrayVacio() {
    filas = new Array(); //Bolas del panel
    filas2 = new Array(); //Bolas de los aciertos
    for (m = 0; m < numFilas; m++) {
        filas[m] = new Array();
        if (m > 0) {
            filas2[m] = new Array();
        }
    }
}

console.log("numFilas: " + filas.length);
console.log("numFilas2: " + filas2.length);


/*Colores */
var coloresCuerpo_array = ["#efd5c6", "#ff9899", "#fde681", "#59f975", "#72e1ff", "#a0e5d2", "#e1ccf7", "#cedec1", "#c3d2d9", "#a3b8ed", "#8d1b1b"];
var coloresNumFila_array = ["", "#ff9698", "#fee580", "#66ff66", "#7fe5fe", "#bae9c7", "#ffccf4", "#eae3b6", "#dfd5d4", "#b5b9e9", ""];
var coloresEvaFila_array = ["", "#fe9695", "#fed980", "#78f06a", "#93d7ea", "#c0dec4", "#ffc3e7", "#eed6b2", "#e2caca", "#c1b0dd", ""];
var coloresBolas_array = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(138, 43, 226)", "rgb(255,165,0)", "rgb(127, 255, 212)", "rgb(255,255,0)", "rgb(135, 206, 235)"];
var bolaGris = "rgb(200, 200, 200)";

var numero = coloresCuerpo_array.length - 1;

// Funcion para pintar las filas
function dibujaFila(x, y, ancho, largo, i) {
    //console.log("dibujaFila"+ x+"-"+y+"-"+ ancho+"-"+ largo+"-"+ i);
    if (i == 0 || i == 10) {
        ancho = 330;
        ctx.fillStyle = coloresCuerpo_array[i];
        ctx.fillRect(x, y, ancho, largo);
        if (i == 10) {
            x += 55;
            y += 27;
            ctx.fillStyle = "white";
            ctx.font = "25px Technique OL BRK";
            ctx.fillText("MASTERMIND", x, y);
        }
        if (i == 0) {
            //dibujaCirculos(x,y, 7,i); 
            guardaCirculos(x, y, 7, i);
        }
    }


    if (i > 0 && i < 10) {
        //dibujamos la casilla del Numero de Fila
        ctx.fillStyle = coloresNumFila_array[i];
        ctx.fillRect(x, y, casillaNum, largo);

        //Escribimos el numero de fila
        var w = casillaNum / 2;
        if (i == 1) {
            w += 5;
        }
        ctx.fillStyle = "white";
        ctx.font = "25px Technique OL BRK";
        ctx.fillText(i, w, y + (largo - 8));


        //dibujamos el cuerpo central
        ctx.fillStyle = coloresCuerpo_array[i];
        ctx.fillRect(x + casillaNum, y, ancho, largo);
        //dibujaCirculos(x+casillaNum,y, 5, i);
        guardaCirculos(x + casillaNum, y, 5, i);

        //Dibujamos la casilla con los datos de verificacion
        ctx.fillStyle = coloresEvaFila_array[i];
        ctx.fillRect(x + casillaNum + ancho, y, casillaEva, largo);
        guardaCirculosAciertos(x + casillaNum + ancho, y, 5, i);
    }


}


// Funcion para guardar información de los circulos de colores

function guardaCirculos(x, y, n, i) {
    var j;
    var r;

    x += 20;
    y += filaAlto / 2;

    ctx.beginPath();
    for (j = 0; j < n; j++) {
        if (n == 5) {
            filas[i].push({
                x: x,
                y: y,
                radius: radioGris,
                color: bolaGris
            });
        } else {
            console.log(coloresBolas_array[j]);
            ctx.fillStyle = coloresBolas_array[j];
            r = radioColor;
            if (j == 0) {
                x += 10;
            } else {
                x += 5;
            }

            filas[i].push({
                x: x,
                y: y,
                radius: radioColor,
                color: coloresBolas_array[j]
            });

        }

        x += 40;
    }
}
// Funcion para guardar información de los circulos de acierto
function guardaCirculosAciertos(x, y, n, i) {
    var j;
    var r;
    var dx = x + casillaEva / 6;
    var dy = y + filaAlto / 4;


    ctx.beginPath();
    for (j = 0; j < n; j++) {
        console.log("fila: " + i + " columna: " + j + " dx: " + dx + " dy: " + dy);
        if (j < 3) {
            filas2[i].push({
                x: dx,
                y: dy,
                radius: radioGrisPequeño,
                color: bolaGris
            });

            dx += casillaEva / 3;
            if (j == 2) {
                dy += filaAlto / 2;
            }

        } else {
            if (j == 3) {
                dx = x + casillaEva / 3;
            } else {
                dx += casillaEva / 3;
            }
            filas2[i].push({
                x: dx,
                y: dy,
                radius: radioGrisPequeño,
                color: bolaGris
            });

        }
    }

}

/****************** */
// Función para dibujar un circulo
function dibujarCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
}
// Función para dibujar circulos
function dibujarCircles(circles) {
    circles.forEach(circle => {
        dibujarCircle(circle);
    });
}


/*function dibuix(circle, index) {
    console.log(index);
    console.log(circle);
}*/

// Función para dibujar las filas
function dibuixaFileres(f, ff) {
    var i;
    for (i = 0; i < f.length; i++) {
        dibujarCircles(f[i]);
        if (i > 0) {
            dibujarCircles(ff[i]);
        }

    }
}




/****************** */

// Función de pintar tablero
function tablero(reset) {
    console.log("tablero");
    var i;
    var fila;
    var x = inicioX;
    var y = inicioY;
    for (i = 10; i >= 0; i--) {
        if (i == 0 || i == 9) {
            y += 10;
        }

        console.log("i--->" + i + " y--->" + y);

        dibujaFila(x, y, filaAncho, filaAlto, i);

        //Aumentamos valor de y
        y += filaAlto;
    }

    dibuixaFileres(filas, filas2);
    if (reset == false) {
        calculaBolasEscogidas();
    }
    console.log("bolasElegidas");
    console.log(bolasElegidas);
}





// Función principal de inicio
function init(reset) {
    //obtenir una referencia al llenç
    console.log("inicio");
    canvas = document.getElementById("miCanvas");

    if (canvas && canvas.getContext) {
        console.log("2d");
        ctx = canvas.getContext("2d");
        if (ctx) {
            console.log("ctx");
            tablero(reset);
        } else {
            alert("Error al crear tu contexto");
        }
    }


    AMPLE = $('#miCanvas').width();
    ALTURA = $('#miCanvas').height();
    console.log(AMPLE + "---" + ALTURA);
    console.log("fila-->" + ALTURA / 12);


    /**OBTENER INFORMACION DE LOS CIRCULOS */

    /*** Se calcula posicion de los circulos y se hace click */
    function isIntersect(point, circle) {
        return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
    }

    // Evento para saber la posición del click
    canvas.addEventListener('click', (e) => {
        const pos = {
            x: e.clientX - canvas.offsetLeft - 5,
            y: e.clientY - canvas.offsetTop - 5
        };

        console.log("posicion----> x:" + pos.x + ' y: ' + pos.y);
        var i;

        for (i = 0; i < filas.length; i++) {
            filas[i].forEach(function(circle, index) {
                if (isIntersect(pos, circle)) {
                    if (i == 0) {
                        console.log("Eligiendo color");
                        if (typeof posicionSelecionada !== 'undefined') {
                            posicionSelecionada.color = circle.color;
                            dibujarCircle(posicionSelecionada);
                            filas[filera + 1][posicionSelecionadaIndex] = posicionSelecionada;
                            console.log("filas 2");
                            console.log(filas2);
                        }
                        // console.log(posicionSelecionada);
                        // posicion = null;
                    } else if (i == (filera + 1)) {
                        console.log("Eligiendo posicion");
                        posicionSelecionada = circle;
                        console.log(filas[filera + 1][index]);
                        posicionSelecionadaIndex = index;
                        // console.log(pos);
                        // console.log(index);
                        console.log("FIN Eligiendo posicion");

                    }
                }
            });
        }
    });

    /************** */
    console.log("filas");
    console.log(filas);
    console.log("filas2");
    console.log(filas2);



}

//FINAL DEL CODI DE LA BIBLIOTECA

init(false);

var filera = 0;
var ganar = false;
var play = false;

// Botón de comprobar fila
$("#test").click(function() {
    filera++;
    let aciertosColoresFila = 0;
    let aciertosColoresYPosicionFila = 0;
    let aciertosTotal = 0;
    let bolas_index = new Array();
    let indefOfs = [
        [],
        [],
        [],
        [],
        []
    ];

    if (filera == 9 && ganar == false && play == false) {
        play = true;
        perder();
    } else {
        console.log("=====COMPROBAR COLORES=====");
        let aciertos = compararResultados();

        aciertosColoresYPosicionFila = aciertos[0];
        aciertosColoresFila = aciertos[1];

        aciertosTotal = aciertosColoresFila + aciertosColoresYPosicionFila

        if (aciertosColoresYPosicionFila == 5) {
            ganar = true;
        }

        for (let index = 0; index < aciertosTotal; index++) {
            let ciruloSelecionado = null;
            if (aciertosColoresYPosicionFila > 0) {
                filas2[filera][index].color = "rgb(0,0,0)";
                ciruloSelecionado = filas2[filera][index];
                aciertosColoresYPosicionFila--;

            } else if (aciertosColoresFila > 0) {
                filas2[filera][index].color = "rgb(255,255,255)";
                ciruloSelecionado = filas2[filera][index];
                aciertosColoresFila--;
            }
            dibujarCircle(ciruloSelecionado);
        }


        console.log("aciertosColoresFila");
        console.log(aciertosColoresFila);
        console.log("aciertosColoresYPosicionFila");
        console.log(aciertosColoresYPosicionFila);

        if (ganar == true) {
            play = true;
            guanyar();
        }

        posicionSelecionada = undefined;
    }
    console.log("Fila " + filera);

});

// Boton de "Nova partida", borra todos los cambios tambien las bolas a adivinar
$("#newparty").click(function() {
    limpiarCanvas();
    crearArrayVacio();
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    init(false);

});
// Boton de "Esborra", borra todos los cambios manteniendo las mismas bolas a adivinar
$("#eraser").click(function() {
    limpiarCanvas();
    crearArrayVacio();
    init(true);
});

// Funcion para limpiar el canvas
function limpiarCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// funcion para ganar
function guanyar() {

    var img = new Image();
    img.src = '../juego/img/mastermindganar.png';
    img.onload = function() {
        ctx.fillStyle = 'rgba(255,255,255, .4)';
        ctx.fillRect(0, 150, 350, 306);
        ctx.drawImage(img, 55, 200, 240, 160);
    }

    audio = new Audio('../juego/audio/fanfarrias.mp3');
    audio.play();

}

// funcion para perder
function perder() {

    var img = new Image();
    img.src = '../juego/img/mastermindperder.png';
    img.onload = function() {
        ctx.fillStyle = 'rgba(0,0,0, .4)';
        ctx.fillRect(0, 150, 350, 306);
        ctx.drawImage(img, 55, 200, 240, 160);
    }

    audio = new Audio('../juego/audio/funebre.mp3');
    audio.play();

}

// Funcion para Calcular el Resultado de las bolas a adivinar
function calculaBolasEscogidas() {
    bolasElegidas = new Array();
    for (let index = 0; index < 5; index++) {
        let colorAlearotio = calcularNumeroAletorio(coloresBolas_array.length - 1, 0);

        while (bolasElegidas.indexOf(coloresBolas_array[colorAlearotio]) !== -1) {
            colorAlearotio = calcularNumeroAletorio(coloresBolas_array.length - 1, 0);
        }
        bolasElegidas.push(coloresBolas_array[colorAlearotio]);
    }
    // bolasElegidas = ["rgb(0,0,255)", "rgb(255,0,0)", "rgb(138, 43, 226)", "rgb(255,165,0)", "rgb(127, 255, 212)"]

}


// Funcion para obtener numero aleatorio con un min y max
function calcularNumeroAletorio(max, min) {
    return Math.floor((Math.random() * max) + min);
}

// Funcion que compara el araary de bolasElegidas con el de la selección del usuario para 
// saber cuantos aciertos de color y posición y solo de color hay en la fila
function compararResultados() {

    var aciertosColoresYPosicionFila = 0;
    var aciertosColoresFila = 0;
    var indexesToIgnoreColPos = [];
    var indexesToIgnoreCol = [];
    let i = 0;
    let j = 0;

    for (i = 0; i < bolasElegidas.length; i++) {
        if (bolasElegidas[i] === filas[filera][i].color) {
            aciertosColoresYPosicionFila++;
            indexesToIgnoreColPos.push(i);
        }
    }

    for (i = 0; i < bolasElegidas.length; i++) {
        for (j = 0; j < filas[filera].length; j++) {
            if (indexesToIgnoreColPos.indexOf(i) === -1 && indexesToIgnoreCol.indexOf(j) === -1) {
                if (bolasElegidas[i] === filas[filera][j].color) {
                    aciertosColoresFila++;
                    indexesToIgnoreColPos.push(i);
                    indexesToIgnoreCol.push(j);

                }
            }
        }
    }

    return [aciertosColoresYPosicionFila, aciertosColoresFila];

}