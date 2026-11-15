class Juego {
  constructor(fondoRecibido, sonidoRecibido) {
    this.fondo = fondoRecibido;
    this.sonidoRotura = sonidoRecibido;
    this.reiniciar();
  }

  reiniciar() {
    this.jugador = new Jugador(30, height / 2, 40, 5);
    
    this.enemigos = [
      new Enemigo(300, 50, 35, 12),
      new Enemigo(550, 50, 35, 12)
    ];

    this.botellas = [
      new Botella(120, 150, 25, this.sonidoRotura), 
      new Botella(425, 200, 25, this.sonidoRotura)  
    ];

    this.perdio = false;
    this.gano = false;
  }

  actualizar() {
    if (this.perdio || this.gano) return;

    this.jugador.actualizar();

    for (let e of this.enemigos) {
      e.actualizar(this.botellas);
    }

    this.gestionarInteraccionBotellas();
    this.verificarCondicionesDeFinDeJuego();
  }

  gestionarInteraccionBotellas() {
    let tieneBotellaEnManos = this.botellas.some(b => b.estado === "MANOS");

    for (let b of this.botellas) {
      if (b.estado === "SUELO" && !tieneBotellaEnManos) {
        if (this.verificarColision(this.jugador, b)) {
          b.estado = "MANOS";
          tieneBotellaEnManos = true;
        }
      }

      if (b.estado === "MANOS") {
        b.x = this.jugador.x + this.jugador.tamano + 5;
        b.y = this.jugador.y + (this.jugador.tamano / 2) - (b.tamano / 2);
      }

      if (b.estado === "AIRE") {
        b.actualizar();
      }
    }
  }

  verificarCondicionesDeFinDeJuego() {
    let algunEnemigoDetenido = this.enemigos.some(e => e.estaDetenido);

    if (algunEnemigoDetenido && this.jugador.x >= width - this.jugador.tamano) {
      if (this.jugador.y >= 151 && this.jugador.y <= 225) {
        this.gano = true;
      }
    }

    for (let e of this.enemigos) {
      if (!e.estaDetenido && this.verificarColision(this.jugador, e)) {
        this.perdio = true;
      }
    }
  }

  intentarLanzarBotella() {
    if (this.botellas[0].estado === "MANOS") {
      this.botellas[0].lanzar(this.enemigos[0].xInicial);
    } else if (this.botellas[1].estado === "MANOS") {
      this.botellas[1].lanzar(this.enemigos[1].xInicial);
    }
  }

  dibujar() {
    image(this.fondo, 0, 0, width, height);

    this.dibujarPuerta();
    this.jugador.dibujar();

    for (let e of this.enemigos) {
      e.dibujar();
    }

    for (let b of this.botellas) {
      b.dibujar();
    }

    this.dibujarLineaDeTrayectoria();
    this.dibujarBotonReinicio();
    this.dibujarInstrucciones();
    this.dibujarFirma();
    this.dibujarMensajesFinDeJuego();
  }

  dibujarPuerta() {
    push();
    noStroke();
    fill(52, 152, 219, 120); 
    rect(width - 8, 151, 8, 225 - 151); 
    pop();
  }

  dibujarInstrucciones() {
    push();
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);

    fill(0, 0, 0, 160);
    rect(20, height - 45, 125, 30, 5);
    fill(255);
    text("WASD: Mover", 20 + 125 / 2, height - 45 + 15);

    fill(0, 0, 0, 160);
    rect(155, height - 45, 145, 30, 5);
    fill(255);
    text("ESPACIO: Lanzar", 155 + 145 / 2, height - 45 + 15);
    pop();
  }

  dibujarFirma() {
    push();
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);

    let bw = 130;
    let bh = 30;
    let bx = width - bw - 20;
    let by = height - 45;

    fill(0, 0, 0, 160);
    rect(bx, by, bw, bh, 5);

    fill(255);
    text("nahiara melgar", bx + bw / 2, by + bh / 2);
    pop();
  }

  dibujarLineaDeTrayectoria() {
    let tieneEnManos = this.botellas.some(b => b.estado === "MANOS");
    if (tieneEnManos) {
      stroke(241, 196, 15, 180);
      strokeWeight(3);
      let xInicio = this.jugador.x + this.jugador.tamano + 5;
      let yInicio = this.jugador.y + this.jugador.tamano / 2;
      let xFin = xInicio + 200;
      
      if (xFin > width) xFin = width;

      line(xInicio, yInicio, xFin, yInicio);
      noStroke();
    }
  }

  dibujarBotonReinicio() {
    let bx = 20, by = 20, bw = 90, bh = 35;
    let estaElMouseEncima = mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
    
    fill(estaElMouseEncima ? color(60) : color(0));
    noStroke();
    rect(bx, by, bw, bh, 5);

    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("REINICIAR", bx + bw / 2, by + bh / 2);
  }

  verificarClicBotonReinicio(mx, my) {
    let bx = 20, by = 20, bw = 90, bh = 35;
    if (mx >= bx && mx <= bx + bw && my >= by && my <= by + bh) {
      this.reiniciar();
    }
  }

  dibujarMensajesFinDeJuego() {
    if (this.perdio) {
      push();
      fill(255); textSize(32); textAlign(CENTER, CENTER);
      text("¡PERDISTE!", width / 2, height / 2 - 30);
      textSize(16); fill(255);
      text("Presiona ENTER para reiniciar", width / 2, height / 2 + 20);
      pop();
    }

    if (this.gano) {
      push();
      fill(255); textSize(32); textAlign(CENTER, CENTER);
      text("¡GANASTE!", width / 2, height / 2 - 30);
      textSize(16); fill(255);
      text("Presiona ENTER para reiniciar", width / 2, height / 2 + 20);
      pop();
    }
  }

  verificarColision(a, b) {
    let derechaDeA = a.x + a.tamano;
    let izquierdaDeB = b.x;
    let izquierdaDeA = a.x;
    let derechaDeB = b.x + b.tamano;
    
    let abajoDeA = a.y + a.tamano;
    let arribaDeB = b.y;
    let arribaDeA = a.y;
    let abajoDeB = b.y + b.tamano;

    let colisionX = derechaDeA > izquierdaDeB && izquierdaDeA < derechaDeB;
    let colisionY = abajoDeA > arribaDeB && arribaDeA < abajoDeB;

    return colisionX && colisionY;
  }
}
