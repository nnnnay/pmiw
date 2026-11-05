class Botella {
  constructor(x, y, tamano) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.estado = "SUELO"; // "SUELO", "MANOS", "AIRE", "CAIDA", "ESPERANDO", "INACTIVA"
    this.destinoX = x;
    this.velocidadLanzamiento = 8;
  }

  lanzar(columnaEnemigoX) {
    if (this.estado === "MANOS" || this.estado === "SUELO") {
      this.estado = "AIRE";
      
      // frena 15 píxeles antes de la ruta del enemigo para quedar perfecta
      this.destinoX = columnaEnemigoX - 15;

      if (this.destinoX < this.x + 50) {
        this.destinoX = this.x + 80;
      }
    }
  }

  actualizar() {
    if (this.estado === "AIRE") {
      this.x += this.velocidadLanzamiento;

      // al alcanzar el destino calculado, cae al suelo
      if (this.x >= this.destinoX) {
        this.x = this.destinoX;
        this.estado = "CAIDA"; 
      }
    }
  }

  dibujar() {
    // se dibuja si está activa en el mapa
    if (this.estado !== "INACTIVA") {
      fill(241, 196, 15); // cuadrado dorado
      noStroke();
      rect(this.x, this.y, this.tamano, this.tamano);
    }
  }
}
