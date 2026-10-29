class Juego {
  constructor() {
    this.reiniciar();
  }

  reiniciar() {
    this.jugador = new Jugador(width / 2, height / 2, 40, 5);
    this.enemigo = new Enemigo(550, 50, 35, 3);
    this.botella = new Botella(200, 200, 25);
    this.perdio = false;
    this.gano = false;
    this.enemigoTocoBotella = false;
  }
//si finaliza no se actualiza
  actualizar() {
    if (this.perdio || this.gano) return;

    this.jugador.actualizar();
    this.enemigo.actualizar(this.botella);

    this.gestionarInteraccionBotella();
    this.verificarCondicionesDeFinDeJuego();
  }

  gestionarInteraccionBotella() {
    // recoge la botella si está en el suelo
    if (this.botella.estado === "SUELO") {
      if (this.verificarColision(this.jugador, this.botella)) {
        this.botella.estado = "MANOS";
      }
    }

    // si la tiene en las manos se ubica a la derecha del jugador
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
    // registra si el enemigo ya tocó el objeto 
    if (this.enemigo.tiempoDetenido > 0) {
      this.enemigoTocoBotella = true;
    }

    // enemigo distraído Y jugador llega al borde derecho
    if (this.enemigoTocoBotella && this.jugador.x >= width - this.jugador.tamano) {
      this.gano = true;
    }

    // colisión entre el jugador y el enemigo
    if (this.verificarColision(this.jugador, this.enemigo)) {
      this.perdio = true;
    }
  }

  intentarLanzarBotella() {
    if (this.botella.estado === "MANOS") {
      this.botella.lanzarHacia(this.enemigo.x);
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
    let bx = 20;
    let by = 20;
    let bw = 90;
    let bh = 35;

    let estaElMouseEncima = mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
    
    if (estaElMouseEncima) {
      fill(52, 152, 219);
    } else {
      fill(41, 128, 185);
    }

    noStroke();
    rect(bx, by, bw, bh, 5);

    fill(240);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("REINICIAR", bx + bw / 2, by + bh / 2);
  }

  verificarClicBotonReinicio(mx, my) {
    let bx = 20;
    let by = 20;
    let bw = 90;
    let bh = 35;

    if (mx >= bx && mx <= bx + bw && my >= by && my <= by + bh) {
      this.reiniciar();
    }
  }

  dibujarMensajesFinDeJuego() {
    if (this.perdio) {
      push();
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("PERDISTE", width / 2, height / 2 - 30);
      textSize(10);
      fill(255);
      text("espacio/ enter para reiniciar", width / 2, height / 2 + 20);
      pop();
    }

    if (this.gano) {
      push();
      fill(46, 204, 113);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("PERDISTE", width / 2, height / 2 - 30);
      textSize(10);
      fill(255);
      text("espacio/enter para reiniciar", width / 2, height / 2 + 20);
      pop();
    }
  }
//verifica la colisión
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
