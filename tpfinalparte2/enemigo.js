class Enemigo {
  constructor(x, y, tamano, velocidad) {
    this.xInicial = x; // columna fija de patrullaje en X
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.velocidadOriginal = abs(velocidad); // guarda siempre una velocidad positiva de referencia
    this.tiempoDetenido = 0; // temporizador para los 3 segundos de pausa
  }

  actualizar(botella) {
    // si está detenido analizando la botella, cuenta los fotogramas y se queda quieto
    if (this.tiempoDetenido > 0) {
      this.tiempoDetenido--;
      
      // justo cuando terminan los 3 segundos, aseguramos que recupere su velocidad de patrullaje hacia abajo
      if (this.tiempoDetenido === 0) {
        botella.estado = "INACTIVA"; // la botella desaparece
        this.velocidad = this.velocidadOriginal; // restaura la velocidad positiva para empezar a bajar
      }
      return;
    }

    // comprueba si la botella está en el suelo y dentro de su carril horizontal
    let botellaEnCarril = (botella.estado === "CAIDA" || botella.estado === "ESPERANDO") && abs(botella.x - this.xInicial) < 60;

    if (botellaEnCarril) {
      botella.estado = "ESPERANDO";
      this.x = this.xInicial;

      // el enemigo se desplaza verticalmente hacia la posición Y de la botella
      if (this.y < botella.y) {
        this.y += this.velocidadOriginal; // baja hacia ella
      } else if (this.y > botella.y) {
        this.y -= this.velocidadOriginal; // sube hacia ella
      }

      // si toca la botella, se detiene exactamente 3 segundos 
      if (abs(this.y - botella.y) < 4) {
        this.y = botella.y;
        this.tiempoDetenido = 180;
      }
    } else {
      this.patrullarVerticalmente();
    }

    //impide físicamente que traspase los bordes de la pantalla
    if (this.y <= 0) {
      this.y = 0;
      this.velocidad = this.velocidadOriginal; // forzar dirección hacia abajo
    }
    if (this.y >= height - this.tamano) {
      this.y = height - this.tamano;
      this.velocidad = -this.velocidadOriginal; // forzar dirección hacia arriba
    }
  }

  patrullarVerticalmente() {
    this.x = this.xInicial;
    this.y += this.velocidad;
    
    // inversión de dirección limpia al tocar los extremos
    if (this.y <= 0) {
      this.y = 0;
      this.velocidad = this.velocidadOriginal;
    } else if (this.y >= height - this.tamano) {
      this.y = height - this.tamano;
      this.velocidad = -this.velocidadOriginal;
    }
  }

  dibujar() {
    // se pinta de naranja si está analizando la botella, o rojo si patrulla
    fill(this.tiempoDetenido > 0 ? color(243, 156, 18) : color(231, 76, 60));
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
