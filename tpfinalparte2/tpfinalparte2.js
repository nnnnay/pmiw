//link: //youtu.be/Bx3T_8boYYw
let miJuego;
let imgFondo;
let sonidoRotura; 

function preload() {
  imgFondo = loadImage('data/fondo.png');
  soundFormats('mp3', 'wav');
  sonidoRotura = loadSound('sonido/botellarrota.mp3'); 
}

function setup() {
  createCanvas(800, 400);
  miJuego = new Juego(imgFondo, sonidoRotura);
}

function draw() {
  miJuego.actualizar();
  miJuego.dibujar();
}

function keyPressed() {
  if ((miJuego.perdio || miJuego.gano) && keyCode === ENTER) {
    miJuego.reiniciar();
  }
  
  if (!miJuego.perdio && !miJuego.gano && key === ' ') {
    if (typeof userStartAudio === 'function') {
      userStartAudio();
    }
    miJuego.intentarLanzarBotella();
  }

  if (key === 'a' || key === 'A') miJuego.jugador.moviendoIzquierda = true;
  if (key === 'd' || key === 'D') miJuego.jugador.moviendoDerecha = true;
  if (key === 'w' || key === 'W') miJuego.jugador.moviendoArriba = true;
  if (key === 's' || key === 'S') miJuego.jugador.moviendoAbajo = true;
}

function keyReleased() {
  if (key === 'a' || key === 'A') miJuego.jugador.moviendoIzquierda = false;
  if (key === 'd' || key === 'D') miJuego.jugador.moviendoDerecha = false;
  if (key === 'w' || key === 'W') miJuego.jugador.moviendoArriba = false;
  if (key === 's' || key === 'S') miJuego.jugador.moviendoAbajo = false;
}

function mousePressed() {
  miJuego.verificarClicBotonReinicio(mouseX, mouseY);
}
