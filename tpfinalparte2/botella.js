class Botella {
  constructor(x, y, tamano, sonidoRotura) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.estado = "SUELO"; 
    this.xDestino = x;
    this.sonidoRotura = sonidoRotura;
    this.sonidoReproducido = false;
  }

  lanzar(xObjetivo) {
    this.estado = "AIRE";
    this.xDestino = xObjetivo;
    this.sonidoReproducido = false;
  }

  actualizar() {
    if (this.estado === "AIRE") {
      if (this.x < this.xDestino) {
        this.x += 10;
        if (this.x >= this.xDestino) {
          this.x = this.xDestino;
          this.estado = "CAIDA";
        }
      } else if (this.x > this.xDestino) {
        this.x -= 10;
        if (this.x <= this.xDestino) {
          this.x = this.xDestino;
          this.estado = "CAIDA";
        }
      }

      if (this.estado === "CAIDA" && !this.sonidoReproducido) {
        if (this.sonidoRotura) {
          this.sonidoRotura.play();
        }
        this.sonidoReproducido = true;
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
