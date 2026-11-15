class Enemigo {
  constructor(x, y, tamano, velocidad) {
    this.xInicial = x; 
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.velocidadOriginal = abs(velocidad);
    this.estaDetenido = false; 
  }

  actualizar(arregloBotellas) {
    if (this.estaDetenido) {
      return;
    }
    
    let botellaObjetivo = null;
    for (let b of arregloBotellas) {
      if ((b.estado === "CAIDA" || b.estado === "ESPERANDO") && abs(b.x - this.xInicial) < 60) {
        botellaObjetivo = b;
        break;
      }
    }

    if (botellaObjetivo) {
      botellaObjetivo.estado = "ESPERANDO";
      this.x = this.xInicial;

      if (this.y < botellaObjetivo.y) {
        this.y += this.velocidadOriginal;
      } else if (this.y > botellaObjetivo.y) {
        this.y -= this.velocidadOriginal;
      }

      if (abs(this.y - botellaObjetivo.y) <= this.velocidadOriginal) {
        this.y = botellaObjetivo.y;
        this.estaDetenido = true; 
        botellaObjetivo.estado = "ESPERANDO"; 
      }
    } else {
      this.patrullarVerticalmente();
    }

    if (this.y <= 46) {
      this.y = 46;
      this.velocidad = this.velocidadOriginal;
    }
    if (this.y >= 320) {
      this.y = 320;
      this.velocidad = -this.velocidadOriginal;
    }
  }

  patrullarVerticalmente() {
    this.x = this.xInicial;
    this.y += this.velocidad;
    
    if (this.y <= 46) {
      this.y = 46;
      this.velocidad = this.velocidadOriginal;
    } else if (this.y >= 320) {
      this.y = 320;
      this.velocidad = -this.velocidadOriginal;
    }
  }

  dibujar() {
    fill(231, 76, 60);
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
