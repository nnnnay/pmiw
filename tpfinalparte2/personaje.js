class Jugador {
  constructor(x, y, tamano, velocidad) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
  }

  actualizar() {
    this.moverseConTeclado();
    this.restringirLimitesDePantalla();
  }

  moverseConTeclado() {
    if (keyIsDown(65) || keyIsDown(97)) this.x -= this.velocidad; // 'a'
    if (keyIsDown(68) || keyIsDown(100)) this.x += this.velocidad; // 'd'
    if (keyIsDown(87) || keyIsDown(119)) this.y -= this.velocidad; // 'w'
    if (keyIsDown(83) || keyIsDown(115)) this.y += this.velocidad; // 's'
  }
//evita q se salga de la pantalla
  restringirLimitesDePantalla() {
    if (this.x < 0) this.x = 0;
    if (this.x > width - this.tamano) this.x = width - this.tamano;
    if (this.y < 0) this.y = 0;
    if (this.y > height - this.tamano) this.y = height - this.tamano;
  }

  dibujar() {
    fill(46, 204, 113);
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
