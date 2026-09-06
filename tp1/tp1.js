let imgFondo;
let cargadaFondo = false;

let freddyIdle = [], freddyPoseido = [];
let bonnieIdle = [], bonniePoseido = [];
let chicaIdle = [], chicaPoseido = [];
let mangleIdle = [], manglePoseido = [];

let cargadosFreddy = 0, cargadosBonnie = 0, cargadosChica = 0, cargadosMangle = 0;
let totalFrames = 2;

let frameAnimatronicos = 0;
let contadorFrames = 0;
let velocidadFrames = 20;

let imgGuardiaNormal, imgGuardiaAlerta;
let cargadoGuardiaNormal = false, cargadoGuardiaAlerta = false;

let imgCajaCerrada, imgCajaAbierta;
let cargadaCajaCerrada = false, cargadaCajaAbierta = false;

let imgPuppet;
let cargadoPuppet = false;

let imgGolden;
let cargadoGolden = false;

let estadoActual = "IDLE"; 
let tiempoInicio = 0;
let duracionIdleMS = 5000;
let duracionParpadeoMS = 5000;

let tiempoLlegoArriba = 0;
let esperarParaScreamerMS = 2000;
let tiempoInicioScreamerMax = 0;
let duracionScreamerFinalMS = 1000;

let posY = 110;
let xBonnie = 280, anchoBonnie = 30;
let xFreddy = 310, anchoFreddy = 30;
let xChica = 340, anchoChica = 38;
let xMangle = 380, anchoMangle = 35;
let altoPersonajes = 70;

let xCaja = 310, yCaja = 200, anchoCaja = 50, altoCaja = 25;
let xGuardia = 250, yGuardia = 350, anchoGuardia = 30, altoGuardia = 70;

let xPuppet = 320;
let anchoPuppet = 30, altoPuppet = 60;
let yPuppetInicio = 150;
let yPuppetDestino = 80;
let yPuppetActual = 150;
let velocidadPuppet = 0.5;

let tamGoldenBase = 20;
let tamGoldenMax = 900;
let tamGoldenActual = 20;
let velocidadExpansion = 45;

function setup() {
  createCanvas(800, 600);
  reiniciarAnimacionCompleta();

  imgFondo = loadImage('fondo.png', 
    function() { cargadaFondo = true; }, 
    function() { imgFondo = loadImage('data/fondo.png', function() { cargadaFondo = true; }); }
  );

  cargarFramesAnimatronico('freddy', 'freddym', freddyIdle, freddyPoseido, function() { cargadosFreddy++; });
  cargarFramesAnimatronico('bonnie', 'bonniem', bonnieIdle, bonniePoseido, function() { cargadosBonnie++; });
  cargarFramesAnimatronico('chica', 'chicam', chicaIdle, chicaPoseido, function() { cargadosChica++; });
  cargarFramesAnimatronico('mangle', 'manglem', mangleIdle, manglePoseido, function() { cargadosMangle++; });

  imgCajaCerrada = loadImage('caja.png', function() { cargadaCajaCerrada = true; }, function() { imgCajaCerrada = loadImage('data/caja.png', function() { cargadaCajaCerrada = true; }); });
  imgCajaAbierta = loadImage('cajaabierta.png', function() { cargadaCajaAbierta = true; }, function() { imgCajaAbierta = loadImage('data/cajaabierta.png', function() { cargadaCajaAbierta = true; }); });

  imgGuardiaNormal = loadImage('guardia1.png', function() { cargadoGuardiaNormal = true; }, function() { imgGuardiaNormal = loadImage('data/guardia1.png', function() { cargadoGuardiaNormal = true; }); });
  imgGuardiaAlerta = loadImage('guardia2.png', function() { cargadoGuardiaAlerta = true; }, function() { imgGuardiaAlerta = loadImage('data/guardia2.png', function() { cargadoGuardiaAlerta = true; }); });

  imgPuppet = loadImage('puppet.png', function() { cargadoPuppet = true; }, function() { imgPuppet = loadImage('data/puppet.png', function() { cargadoPuppet = true; }); });

  imgGolden = loadImage('golden.png', function() { cargadoGolden = true; }, function() { imgGolden = loadImage('data/golden.png', function() { cargadoGolden = true; }); });
}

function draw() {
  background(0);

  actualizarEstadoTiempo();
  actualizarContadorAnimacion();

  if (estadoActual === "IDLE") {
    dibujarEscenaCompleta(freddyIdle, bonnieIdle, chicaIdle, mangleIdle, imgCajaCerrada, cargadaCajaCerrada, imgGuardiaNormal, cargadoGuardiaNormal, false, frameAnimatronicos);
  } 
  else if (estadoActual === "PARPADEO") {
    dibujarEscenaCompleta(freddyIdle, bonnieIdle, chicaIdle, mangleIdle, imgCajaCerrada, cargadaCajaCerrada, imgGuardiaAlerta, cargadoGuardiaAlerta, false, frameAnimatronicos);
    
    noStroke();
    let opacidadSombra = random(180, 250);
    fill(0, opacidadSombra);
    rect(0, 0, width, height);
  } 
  else if (estadoActual === "POSEIDO") {
    let frameEstatico = 0;
    dibujarEscenaCompleta(freddyPoseido, bonniePoseido, chicaPoseido, manglePoseido, imgCajaAbierta, cargadaCajaAbierta, imgGuardiaNormal, cargadoGuardiaNormal, true, frameEstatico);
  }
  else if (estadoActual === "SCREAMER") {
    let frameEstatico = 0;
    dibujarEscenaCompleta(freddyPoseido, bonniePoseido, chicaPoseido, manglePoseido, imgCajaAbierta, cargadaCajaAbierta, imgGuardiaNormal, cargadoGuardiaNormal, true, frameEstatico);

    dibujarScreamerGolden();
  }
}

function actualizarContadorAnimacion() {
  contadorFrames++;
  if (contadorFrames >= velocidadFrames) {
    frameAnimatronicos++;
    if (frameAnimatronicos >= totalFrames) {
      frameAnimatronicos = 0;
    }
    contadorFrames = 0;
  }
}

function reiniciarAnimacionCompleta() {
  estadoActual = "IDLE";
  tiempoInicio = millis();
  yPuppetActual = yPuppetInicio;
  tamGoldenActual = tamGoldenBase;
  tiempoLlegoArriba = 0;
  tiempoInicioScreamerMax = 0;
  frameAnimatronicos = 0;
  contadorFrames = 0;

  print("Animación reiniciada -> Estado actual: IDLE");
}

function dibujarEscenaCompleta(fFreddy, fBonnie, fChica, fMangle, imgCaja, cargCaja, imgGuardia, cargGuardia, dibujarPuppet, frameA) {
  dibujarFondo();
  dibujarGrupoAnimatronicos(fFreddy, fBonnie, fChica, fMangle, frameA);
  
  dibujarCaja(imgCaja, cargCaja);

  if (dibujarPuppet) {
    dibujarPuppetLevitando();
  }
  
  dibujarGuardia(imgGuardia, cargGuardia);
}

function seCumplioTiempo(tiempoBase, duracion) {
  return (millis() - tiempoBase) >= duracion;
}

function actualizarEstadoTiempo() {
  if (estadoActual === "IDLE") {
    if (seCumplioTiempo(tiempoInicio, duracionIdleMS)) {
      estadoActual = "PARPADEO";
      tiempoInicio = millis();
      print("Cambio de estado -> PARPADEO");
    }
  } else if (estadoActual === "PARPADEO") {
    if (seCumplioTiempo(tiempoInicio, duracionParpadeoMS)) {
      estadoActual = "POSEIDO";
      yPuppetActual = yPuppetInicio;
      tiempoLlegoArriba = 0;
      print("Cambio de estado -> POSEIDO");
    }
  } else if (estadoActual === "POSEIDO") {
    if (yPuppetActual <= yPuppetDestino) {
      if (tiempoLlegoArriba === 0) {
        tiempoLlegoArriba = millis();
        print("Puppet llegó arriba -> Esperando activación de Screamer");
      } else if (seCumplioTiempo(tiempoLlegoArriba, esperarParaScreamerMS)) {
        estadoActual = "SCREAMER";
        tamGoldenActual = tamGoldenBase;
        print("Cambio de estado -> SCREAMER");
      }
    }
  } else if (estadoActual === "SCREAMER") {
    if (tamGoldenActual >= tamGoldenMax) {
      if (tiempoInicioScreamerMax === 0) {
        tiempoInicioScreamerMax = millis();
        print("Screamer al máximo -> Esperando antes del reinicio");
      } else if (seCumplioTiempo(tiempoInicioScreamerMax, duracionScreamerFinalMS)) {
        reiniciarAnimacionCompleta();
      }
    }
  }
}

function cargarFramesAnimatronico(nombreBase, nombrePoseido, arrIdle, arrPoseido, callbackExito) {
  for (let i = 0; i < totalFrames; i++) {
    let archIdle = nombreBase + i + '.png';
    arrIdle[i] = loadImage(archIdle, callbackExito, function() {
      arrIdle[i] = loadImage('data/' + archIdle, callbackExito);
    });

    let archPos = nombrePoseido + i + '.png';
    arrPoseido[i] = loadImage(archPos, null, function() {
      let archPosSimple = nombrePoseido + '.png';
      arrPoseido[i] = loadImage(archPosSimple, null, function() {
        arrPoseido[i] = loadImage('data/' + archPosSimple, null, function() {
          arrPoseido[i] = arrIdle[i];
        });
      });
    });
  }
}

function dibujarAnimatronico(frames, x, y, ancho, alto, frameA) {
  if (frames && frames.length > 0) {
    let img = frames[frameA] || frames[0];
    if (img) {
      image(img, x, y, ancho, alto);
    }
  }
}

function dibujarGrupoAnimatronicos(fFreddy, fBonnie, fChica, fMangle, frameA) {
  dibujarAnimatronico(fBonnie, xBonnie, posY, anchoBonnie, altoPersonajes, frameA);
  dibujarAnimatronico(fFreddy, xFreddy, posY, anchoFreddy, altoPersonajes, frameA);
  dibujarAnimatronico(fChica, xChica, posY, anchoChica, altoPersonajes, frameA);
  dibujarAnimatronico(fMangle, xMangle, posY, anchoMangle, altoPersonajes, frameA);
}

function dibujarFondo() {
  if (cargadaFondo && imgFondo) image(imgFondo, 0, 0, width, height);
}

function dibujarCaja(imagen, cargada) {
  if (cargada && imagen) image(imagen, xCaja, yCaja, anchoCaja, altoCaja);
}

function dibujarGuardia(imagen, cargado) {
  if (cargado && imagen) image(imagen, xGuardia, yGuardia, anchoGuardia, altoGuardia);
}

function dibujarPuppetLevitando() {
  if (cargadoPuppet && imgPuppet) {
    if (yPuppetActual > yPuppetDestino) {
      yPuppetActual -= velocidadPuppet;
    }
    image(imgPuppet, xPuppet, yPuppetActual, anchoPuppet, altoPuppet);
  }
}

function dibujarScreamerGolden() {
  if (cargadoGolden && imgGolden) {
    imageMode(CENTER);

    if (tamGoldenActual < tamGoldenMax) {
      tamGoldenActual += velocidadExpansion;
    }

    image(imgGolden, width / 2, height / 2, tamGoldenActual, tamGoldenActual);

    imageMode(CORNER);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    print("Tecla 'R' presionada -> Reiniciando programa");
    reiniciarAnimacionCompleta();
  }
}
