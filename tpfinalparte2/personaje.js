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
    if (this.moviendoIzquierda) this.x -= this.velocidad;
    if (this.moviendoDerecha) this.x += this.velocidad;
    if (this.moviendoArriba) this.y -= this.velocidad;
    if (this.moviendoAbajo) this.y += this.velocidad;

    this.restringirLimitesDePantalla();
  }

  restringirLimitesDePantalla() {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.tamano) this.x = width - this.tamano;
    
    if (this.y < 46) this.y = 46;
    if (this.y > 320 - this.tamano) this.y = 320 - this.tamano;
  }

  dibujar() {
    fill(46, 204, 113); 
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
