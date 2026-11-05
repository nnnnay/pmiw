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

// --- CONTROLES DE TECLADO MÁS LIMPIOS ---

function keyPressed() {
  // Reiniciar con Espacio o Enter si el juego terminó
  if ((miJuego.perdio || miJuego.gano) && (key === ' ' || keyCode === ENTER)) {
    miJuego.reiniciar();
  }
  
  // Lanzar botella con Espacio
  if (!miJuego.perdio && !miJuego.gano && key === ' ') {
    miJuego.intentarLanzarBotella();
  }

  // Movimiento con WASD (detecta mayúsculas y minúsculas automáticamente)
  if (key === 'a' || key === 'A') miJuego.jugador.moviendoIzquierda = true;
  if (key === 'd' || key === 'D') miJuego.jugador.moviendoDerecha = true;
  if (key === 'w' || key === 'W') miJuego.jugador.moviendoArriba = true;
  if (key === 's' || key === 'S') miJuego.jugador.moviendoAbajo = true;
}

function keyReleased() {
  // Al soltar la tecla, el movimiento se detiene
  if (key === 'a' || key === 'A') miJuego.jugador.moviendoIzquierda = false;
  if (key === 'd' || key === 'D') miJuego.jugador.moviendoDerecha = false;
  if (key === 'w' || key === 'W') miJuego.jugador.moviendoArriba = false;
  if (key === 's' || key === 'S') miJuego.jugador.moviendoAbajo = false;
}

function mousePressed() {
  miJuego.verificarClicBotonReinicio(mouseX, mouseY);
}
