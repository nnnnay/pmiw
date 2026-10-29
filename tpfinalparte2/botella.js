class Botella {
  constructor(x, y, tamano) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.estado = "SUELO"; 
    this.destinoX = x;
    this.velocidadLanzamiento = 8;
  }

  lanzarHacia(columnaEnemigoX) { //fija la columna/trayectoria del enemigo como destino 
    if (this.estado === "MANOS") {
      this.estado = "AIRE";
      this.destinoX = columnaEnemigoX;

      if (this.destinoX > width - this.tamano) {
        this.destinoX = width - this.tamano;
      }
    }
  }

  actualizar() {
    if (this.estado === "AIRE") {
      this.x += this.velocidadLanzamiento; //avanza horizontalmente hacia la derecha

      if (this.x >= this.destinoX || this.x >= width - this.tamano) {
        if (this.x > width - this.tamano) {
          this.x = width - this.tamano;
        }
        this.estado = "CAIDA";
      }
    }
  }

  dibujar() {
    if (this.estado !== "INACTIVA") {
      fill(241, 196, 15);
      noStroke();
      rect(this.x, this.y, this.tamano, this.tamano);
    }
  }
}
