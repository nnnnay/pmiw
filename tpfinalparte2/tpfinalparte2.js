let miJuego;

function setup() {
  createCanvas(800, 400);
  miJuego = new Juego();
}

function draw() {
  background(30);
  miJuego.actualizar();
  miJuego.dibujar();
}

function keyPressed() {
  if ((miJuego.perdio || miJuego.gano) && (key === ' ' || keyCode === ENTER)) {
    miJuego.reiniciar();
  }
  
  if (!miJuego.perdio && !miJuego.gano && key === ' ') {
    miJuego.intentarLanzarBotella();
  }
}

function mousePressed() {
  miJuego.verificarClicBotonReinicio(mouseX, mouseY);
}
