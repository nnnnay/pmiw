class Juego {
  constructor() {
    this.reiniciar();
  }

  // restablece por completo todas las variables y estados para una partida limpia
reiniciar() {
    this.jugador = new Jugador(width / 2, height / 2, 40, 5);
    
    this.enemigo = new Enemigo(550, 50, 35, 6); 
    
    this.botella = new Botella(200, 200, 25);
    this.botella.estado = "SUELO"; 
    this.perdio = false;
    this.gano = false;
    this.enemigoTocoBotella = false;
  }
  actualizar() {
    if (this.perdio || this.gano) return;

    this.jugador.actualizar();
    this.enemigo.actualizar(this.botella);

    this.gestionarInteraccionBotella();
    this.verificarCondicionesDeFinDeJuego();
  }

  gestionarInteraccionBotella() {
    // recoger la botella si está en el suelo
    if (this.botella.estado === "SUELO") {
      if (this.verificarColision(this.jugador, this.botella)) {
        this.botella.estado = "MANOS";
      }
    }

    // si la tiene en las manos, se mueve pegada al jugador
    if (this.botella.estado === "MANOS") {
      this.botella.x = this.jugador.x + this.jugador.tamano + 5;
      this.botella.y = this.jugador.y + (this.jugador.tamano / 2) - (this.botella.tamano / 2);
    }

    // actualizar vuelo de la botella
    if (this.botella.estado === "AIRE") {
      this.botella.actualizar();
    }
  }

  verificarCondicionesDeFinDeJuego() {
    // si el enemigo entró en su pausa, registramos que tocó el objeto
    if (this.enemigo.tiempoDetenido > 0) {
      this.enemigoTocoBotella = true;
    }

    // victoria: enemigo distraído jugador llega al borde derecho
    if (this.enemigoTocoBotella && this.jugador.x >= width - this.jugador.tamano) {
      this.gano = true;
    }

    // derrota: colisión entre jugador y enemigo
    if (this.verificarColision(this.jugador, this.enemigo)) {
      this.perdio = true;
    }
  }

  intentarLanzarBotella() {
    if (this.botella.estado === "MANOS") {
      // le pasamos la columna X del enemigo para que la botella frene antes de llegar
      this.botella.lanzar(this.enemigo.xInicial);
    }
  }

  dibujar() {
    this.jugador.dibujar();
    this.enemigo.dibujar();
    this.botella.dibujar();

    this.dibujarLineaDeTrayectoria();
    this.dibujarBotonReinicio();
    this.dibujarMensajesFinDeJuego();
  }

  dibujarLineaDeTrayectoria() {
    if (this.botella.estado === "MANOS") {
      stroke(241, 196, 15, 180);
      strokeWeight(3);
      let xInicio = this.botella.x + this.botella.tamano / 2;
      let yInicio = this.botella.y + this.botella.tamano / 2;
      let xFin = xInicio + 200;
      
      if (xFin > width) xFin = width;

      line(xInicio, yInicio, xFin, yInicio);
      noStroke();
    }
  }

  dibujarBotonReinicio() {
    let bx = 20, by = 20, bw = 90, bh = 35;
    let estaElMouseEncima = mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
    
    fill(estaElMouseEncima ? color(52, 152, 219) : color(41, 128, 185));
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
      fill(255, 0, 0); textSize(32); textAlign(CENTER, CENTER);
      text("¡PERDISTE!", width / 2, height / 2 - 30);
      textSize(16); fill(255);
      text("Presiona ESPACIO para reiniciar", width / 2, height / 2 + 20);
      pop();
    }

    if (this.gano) {
      push();
      fill(46, 204, 113); textSize(32); textAlign(CENTER, CENTER);
      text("¡GANASTE!", width / 2, height / 2 - 30);
      textSize(16); fill(255);
      text("Presiona ESPACIO para reiniciar", width / 2, height / 2 + 20);
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
