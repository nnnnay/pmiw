class Enemigo {
  constructor(x, y, tamano, velocidad) {
    this.xInicial = x; //columna fija del movimiento guardada para q no se pase
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.velocidad = velocidad;
    this.tiempoDetenido = 0; //cuenta los fotogramas cuando se distrae
  }

  actualizar(botella) {
    if (this.tiempoDetenido > 0) {
      this.manejarPausaPorDistraccion(botella);
    } else if (botella.estado === "CAIDA") {
      this.irHaciaLaBotella(botella);
    } else {
      this.patrullarVerticalmente();
    }
  }

  patrullarVerticalmente() {
    this.x = this.xInicial;
    this.y += this.velocidad;//desplazamiento vertical
    
    if (this.y <= 0) {
      this.y = 0;
      this.velocidad *= -1; //si toca los bordes invierte la dirección 
    }
    if (this.y >= height - this.tamano) {
      this.y = height - this.tamano;
      this.velocidad *= -1;
    }
  }

  irHaciaLaBotella(botella) {
    this.x = this.xInicial;//se desplaza verticalmente hasta tocar la botella

    if (this.y < botella.y) {
      this.y += this.velocidad;
    } else if (this.y > botella.y) {
      this.y -= this.velocidad;
    }

    if (this.y < 0) this.y = 0;
    if (this.y > height - this.tamano) this.y = height - this.tamano;
//cuando toca la botella se detiene y activa el temporizador
    if (abs(this.y - botella.y) < 5) {
      this.y = botella.y;
      this.tiempoDetenido = 240; // 4 segundos de pausa (60fps * 4)
    }
  }

  manejarPausaPorDistraccion(botella) {
    this.tiempoDetenido--;
    if (this.tiempoDetenido === 0) {
      botella.estado = "INACTIVA"; //la botella desaparece después d los segundos
    }
  }

  dibujar() {
    if (this.tiempoDetenido > 0) {
      fill(243, 156, 18);  
    } else {
      fill(231, 76, 60); 
    }
    noStroke();
    rect(this.x, this.y, this.tamano, this.tamano);
  }
}
