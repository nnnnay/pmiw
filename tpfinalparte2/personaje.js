class Jugador {
  constructor(x, y, tamano, velocidad) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    
    this.moviendoIzquierda = false;
    this.moviendoDerecha = false;
    this.moviendoArriba = false;
    this.moviendoAbajo = false;
  }

  actualizar() {
    // aplica movimiento según las teclas que estén presionadas
    if (this.moviendoIzquierda) this.x -= this.velocidad;
    if (this.moviendoDerecha) this.x += this.velocidad;
    if (this.moviendoArriba) this.y -= this.velocidad;
    if (this.moviendoAbajo) this.y += this.velocidad;

    this.restringirLimitesDePantalla();
  }

  restringirLimitesDePantalla() {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.tamano) this.x = width - this.tamano;
    if (this.y < 0) this.y = 0;
    if (this.y > height - this.tamano) this.y = height - this.tamano;
  }

  dibujar() {
    fill(46, 204, 113); // cuadrado verde
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
