//https://youtu.be/Bx3T_8boYYw

let imgCielo, imgTierra, imgCasa, imgNombre, imgEst1, imgEst2;

let imgLluvia1, imgLluvia2;
let imgGotas1, imgGotas2;

let imgViaje, imgCasaf, imgVestibulo, imgEnredadera, imgPasillo;
let imgFinal3, imgContrabandistas, imgContrabandista, imgFlorero, imgPuerta, imgCajon;
let imgVentana, imgFinal1, imgFinal2;

let pantalla = 1;

let gatoFrames = [], gatoX = -100, gatoY = 400, anchoGato = 30, altoGato = 30, velocidadGato = 1, gatoIniciado = false, contadorEspera = 0;
let cuervoFrames = [], cuervoX = 850, cuervoY = 70, anchoCuervo = 18, altoCuervo = 25, velocidadCuervo = -2, cuervoIniciado = false, contadorEsperaCuervo = 0;

let xPos = 0, velocidad = 2;
let anchoCasa = 700, altoCasa = 450, posXCasa = -20, posYCasa = 75;

let anchoNombre = 560, altoNombre = 336, posWNombre = 120, yNombre = -600, destinoY = -100, velocidadCaida = 2;
let flotando = false, anguloFlotacion = 0, amplitudFlotacion = 6, velocidadFlotacion = 0.05;

let anchoEst1 = 250, altoEst1 = 250, posXEst1 = -60, yEst1 = 500, destinoYEst1 = 270, velocidadSubida1 = 1.2;
let flotandoEst1 = false, anguloFlotEst1 = 0, amplitudFlotEst1 = 4, velFlotEst1 = 0.06;

let anchoEst2 = 250, altoEst2 = 250, posXEst2 = 610, yEst2 = 500, destinoYEst2 = 280, velocidadSubida2 = 1.2;
let flotandoEst2 = false, anguloFlotEst2 = 0, amplitudFlotEst2 = 4, velFlotEst2 = 0.06;


function preload() {
  imgCielo = loadImage('data/cielo.png');
  imgTierra = loadImage('data/tierra.png');
  imgCasa = loadImage('data/casa.png');
  imgNombre = loadImage('data/nombre.png');
  imgEst1 = loadImage('data/est1.png'); 
  imgEst2 = loadImage('data/est2.png'); 

  imgLluvia1 = loadImage('data/lluvia1.png');
  imgLluvia2 = loadImage('data/lluvia2.png');
  imgGotas1 = loadImage('data/gotas1.png');
  imgGotas2 = loadImage('data/gotas2.png');

  imgViaje = loadImage('data/viaje.jpg');
  imgCasaf = loadImage('data/casaf.jpg');
  imgVestibulo = loadImage('data/vestibulo.jpg');
  imgEnredadera = loadImage('data/enredadera.jpg');
  imgPasillo = loadImage('data/pasillo.jpg');
  imgFinal3 = loadImage('data/final3.jpg');
  imgContrabandistas = loadImage('data/contrabandistas.jpg');
  imgContrabandista = loadImage('data/contrabandista.jpg');
  imgFlorero = loadImage('data/florero.jpg');
  imgPuerta = loadImage('data/puerta.jpg');
  imgCajon = loadImage('data/cajon.jpg');
  imgVentana = loadImage('data/ventana.jpg');
  imgFinal1 = loadImage('data/final1.jpg');
  imgFinal2 = loadImage('data/final2.jpg');

  for (let i = 0; i < 4; i++) {
    gatoFrames[i] = loadImage("data/gato" + (i + 1) + ".png");
  }
  for (let i = 0; i < 5; i++) {
    cuervoFrames[i] = loadImage("data/cuervo" + (i + 1) + ".png");
  }
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  if (pantalla === 1) {
    pantallaIntro();
  } 
  else if (pantalla === 2) {
    pantallaHistoria("Estás de vacaciones en Connecticut, en la casa de tus primos Jane y Michael. Un día, los tres deciden dar una vuelta por el barrio y en eso notás una casa de piedra a lo lejos, que es muy diferente a las demás. Tus primos te cuentan que en esa casa vive la anciana Bigley y su gato, y que la mujer es una bruja que maldijo la casa.", imgViaje);
  } 
  else if (pantalla === 3) {
    ejecutarPantallaOpciones("Jane te reta a que entres, y ante tu negativa, ella entra sola y desaparece por unos minutos.", ["Entrar por la puerta principal", "Rodear la casa"], imgCasaf);
  } 
  else if (pantalla === 4) {
    ejecutarPantallaOpciones("Entrás al vestíbulo. Al avanzar, ves un comedor elegante con una botella de vino y la estatua del gato de la señora Bigley. A tu izquierda hay una escalera. Comenzás a sentir unas inmenas ganas de beber del vino.", ["Tomar del vino", "Subir las escaleras"], imgVestibulo);
  } 
  else if (pantalla === 5) {
    ejecutarPantallaOpciones("Te encontrás con Jervis, el guardián de la casa, y sin que te vea te trepás por una enredadera hasta alcanzar un balcón del segundo piso, logrando así entrar a la casa. Te encontrás con un pasillo que se divide en izquierda y derecha.", ["Ir a la izquierda", "Ir a la derecha"], imgEnredadera);
  } 
  else if (pantalla === 6) {
    pantallaHistoria("Mientras avanzás sigilosamente por los pasillos superiores de la mansión, el suelo de madera cruje bajo tus pisadas. Una corriente de aire gélido apaga la tenue luz que entra por los ventanales, y a lo lejos escuchás un sonido metálico acompañado de susurros ininteligibles que hielan la sangre. Sentís que la casa misma te está observando.", imgPasillo);
  } 
  else if (pantalla === 7) {
    pantallaHistoria("Cuando entrás en la habitación izquierda escuchás que alguien cierra la puerta desde afuera. Cuando te das cuenta, estás rodeado por una pandilla de contrabandistas.", imgContrabandistas);
  } 
  else if (pantalla === 8) {
    ejecutarPantallaOpciones("Te topás de frente con un vigía de los contrabandistas custodiando la zona.", ["Distraer al guardia", "Atacar de frente"], imgContrabandista);
  } 
  else if (pantalla === 9) {
    pantallaHistoria("Lanzás un florero hacia la esquina del lugar. El contrabandista va hasta allá y lográs escabullirte.", imgFlorero);
  } 
  else if (pantalla === 10) {
    ejecutarPantallaOpciones("Encontrás la puerta del dormitorio donde Jane está encerrada con doble cerrojo. Al lado hay un estudio antiguo.", ["Buscar algo para abrir la puerta", "Intentar forzar la puerta"], imgPuerta);
  } 
  else if (pantalla === 11) {
    pantallaHistoria("En el estudio encontrás un cajón secreto con una llave de bronce. Con el objeto en tu poder, regresás a la puerta del dormitorio de Jane.", imgCajon);
  } 
  else if (pantalla === 12) {
    pantallaHistoria("A golpes rompés el cerrojo del dormitorio y liberás a Jane, pero el estruendo alerta a unos contrabandistas que se escondían en la casa, obligándolos a huir rompiendo una ventana que da hacia el jardín.", imgVentana);
  } 
  else if (pantalla === 13) {
    ejecutarFinal("El vino estaba alterado con veneno. Caes en un trance permanente, convirtiéndote en una leyenda más de la Casa de Piedra junto a la estatua del gato.", imgFinal1);
  } 
  else if (pantalla === 14) {
    ejecutarFinal("Lográs rescatar a Jane y ambos salen de la casa. Al ya estar a salvo, hablan con las autoridades para denunciar la presencia de los contrabandistas en la casa.", imgFinal2);
  } 
  else if (pantalla === 15) {
    ejecutarFinal("Fuiste atrapado por los contrabandistas y te encierran en una celda con Jane. Tu misión fracasó.", imgFinal3);
  }
}

function pantallaHistoria(texto, fondo) {
  if (fondo) image(fondo, 0, 0, width, height);
  dibujarCajaTextoGrande(texto, 100, 100, 600, 180, 18);
  
  let xText = width - 130;
  let yText = height - 55;
  let wText = 100;
  let hText = 35;

  if (mouseX >= xText && mouseX <= xText + wText && mouseY >= yText && mouseY <= yText + hText) {
    fill(0); 
  } else {
    fill(255); 
  }

  noStroke();
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text("siguiente >>", width - 40, height - 30);
}

function ejecutarPantallaOpciones(texto, opciones, fondo) {
  if (fondo) image(fondo, 0, 0, width, height);
  dibujarCajaTexto(texto, 80, 318, 640, 130);
  dibujarBotones(opciones, 130);
}

function ejecutarFinal(texto, fondo) {
  if (fondo) image(fondo, 0, 0, width, height);
  dibujarCajaTextoGrande(texto, 100, 110, 600, 160, 18);

  let xText = width / 2 - 90;
  let yText = 285;
  let wText = 180;
  let hText = 35;

  if (mouseX >= xText && mouseX <= xText + wText && mouseY >= yText && mouseY <= yText + hText) {
    fill(0); 
  } else {
    fill(255); 
  }

  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text("volver a empezar", width / 2, 300);
}

function dibujarCajaTexto(textoHistoria, x, y, ancho, alto) {
  fill(6, 70, 12, 210); 
  stroke(255, 120);       
  strokeWeight(1.5);
  rect(x, y, ancho, alto, 5);

  fill(255);              
  noStroke();
  textSize(14);           
  textAlign(LEFT, TOP);   
  text(textoHistoria, x + 15, y + 15, ancho - 30, alto - 30);
}

function dibujarCajaTextoGrande(textoHistoria, x, y, ancho, alto, tamTexto) {
  fill(6, 70, 12, 210); 
  stroke(255, 120);       
  strokeWeight(1.5);
  rect(x, y, ancho, alto, 5);

  fill(255);              
  noStroke();
  textSize(tamTexto);     
  textAlign(LEFT, TOP);   
  text(textoHistoria, x + 15, y + 15, ancho - 30, alto - 30);
}

function dibujarBotones(botones, yInicial) {
  const anchoB = 320; 
  const altoB = 35;
  const xB = width / 2 - anchoB / 2;

  for (let i = 0; i < botones.length; i++) {
    let yB = yInicial + i * (altoB + 12);
    
    if (mouseX >= xB && mouseX <= xB + anchoB && mouseY >= yB && mouseY <= yB + altoB) {
      fill(0, 230); 
    } else {
      fill(6, 70, 12, 230); 
    }

    stroke(255, 150);
    strokeWeight(1.5);
    rect(xB, yB, anchoB, altoB, 5);

    fill(255);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(botones[i], width / 2, yB + altoB / 2);
  }
}

function verificarClicBotones(yInicial, totalBotones) {
  const anchoB = 320;
  const altoB = 35;
  const xB = width / 2 - anchoB / 2;

  for (let i = 0; i < totalBotones; i++) {
    let yB = yInicial + i * (altoB + 12);
    if (mouseX >= xB && mouseX <= xB + anchoB && mouseY >= yB && mouseY <= yB + altoB) {
      return i + 1; 
    }
  }
  return 0;
}

function pantallaIntro() {
  image(imgCielo, xPos, 0, width, height);
  image(imgCielo, xPos - width + 1, 0, width, height);
  xPos = (xPos + velocidad) % width;

  image(imgTierra, 0, 0, width, height);
  
  image(imgCasa, posXCasa, posYCasa, anchoCasa, altoCasa);

  if (flotando && flotandoEst1 && flotandoEst2) {
    if (!gatoIniciado && ++contadorEspera > 120) gatoIniciado = true;
    if (gatoIniciado) {
      gatoX = (gatoX + velocidadGato > width + 50) ? -50 : gatoX + velocidadGato;
      image(gatoFrames[floor(frameCount / 6) % 4], gatoX, gatoY, anchoGato, altoGato);
    }

    if (!cuervoIniciado && ++contadorEsperaCuervo > 90) cuervoIniciado = true;
    if (cuervoIniciado) {
      cuervoX = (cuervoX + velocidadCuervo < -50) ? 850 : cuervoX + velocidadCuervo;
      image(cuervoFrames[floor(frameCount / 5) % 5], cuervoX, cuervoY, anchoCuervo, altoCuervo);
    }
  }

  let cuadroLluvia = floor(frameCount / 8) % 2;
  if (cuadroLluvia === 0) {
    image(imgLluvia1, 0, 0, width, height);
  } else {
    image(imgLluvia2, 0, 0, width, height);
  }

  let cuadroGotas = floor(frameCount / 8) % 2;
  if (cuadroGotas === 0) {
    image(imgGotas1, 0, 0, width, height);
  } else {
    image(imgGotas2, 0, 0, width, height);
  }

  if (!flotando) {
    yNombre = min(yNombre + velocidadCaida, destinoY);
    if (yNombre === destinoY) flotando = true;
  } else {
    yNombre = destinoY + sin(anguloFlotacion) * amplitudFlotacion;
    anguloFlotacion += velocidadFlotacion;
  }
  image(imgNombre, posWNombre, yNombre, anchoNombre, altoNombre);

  if (!flotandoEst1) {
    yEst1 = max(yEst1 - velocidadSubida1, destinoYEst1);
    if (yEst1 === destinoYEst1) flotandoEst1 = true;
  } else {
    yEst1 = destinoYEst1 + sin(anguloFlotEst1) * amplitudFlotEst1;
    anguloFlotEst1 += velFlotEst1;
  }
  image(imgEst1, posXEst1, yEst1, anchoEst1, altoEst1);

  if (!flotandoEst2) {
    yEst2 = max(yEst2 - velocidadSubida2, destinoYEst2);
    if (yEst2 === destinoYEst2) flotandoEst2 = true;
  } else {
    yEst2 = destinoYEst2 + sin(anguloFlotEst2) * amplitudFlotEst2;
    anguloFlotEst2 += velFlotEst2;
  }
  image(imgEst2, posXEst2, yEst2, anchoEst2, altoEst2);

  if (millis() > 15000) {
    let bW = 120, bH = 40, bX = width / 2 - bW / 2, bY = height - 70;
    
    if (mouseX >= bX && mouseX <= bX + bW && mouseY >= bY && mouseY <= bY + bH) {
      fill(0, 230);
    } else {
      fill(255, 255, 255, 40); 
    }

    stroke(255, 100);       
    strokeWeight(1.5);
    rect(bX, bY, bW, bH); 

    fill(255, 200);         
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text("empezar", bX + bW / 2, bY + bH / 2);
  }
}

function mousePressed() {
  if (pantalla === 1 && millis() > 15000) {
    let bW = 120, bH = 40, bX = width / 2 - bW / 2, bY = height - 70;
    if (mouseX >= bX && mouseX <= bX + bW && mouseY >= bY && mouseY <= bY + bH) {
      pantalla = 2; 
    }
  } 
  else if (pantalla === 2) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 3; 
    }
  } 
  else if (pantalla === 3) {
    let sel = verificarClicBotones(130, 2);
    if (sel === 1) pantalla = 4;
    if (sel === 2) pantalla = 5;
  } 
  else if (pantalla === 4) {
    let sel = verificarClicBotones(130, 2);
    if (sel === 1) pantalla = 13;
    if (sel === 2) pantalla = 6;
  } 
  else if (pantalla === 5) {
    let sel = verificarClicBotones(130, 2);
    if (sel === 1) pantalla = 7;  
    if (sel === 2) pantalla = 8;  
  } 
  else if (pantalla === 6) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 10; 
    }
  } 
  else if (pantalla === 7) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 15; 
    }
  } 
  else if (pantalla === 8) {
    let sel = verificarClicBotones(130, 2);
    if (sel === 1) pantalla = 9;  
    if (sel === 2) pantalla = 15; 
  } 
  else if (pantalla === 9) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 10; 
    }
  } 
  else if (pantalla === 10) {
    let sel = verificarClicBotones(130, 2);
    if (sel === 1) pantalla = 11;
    if (sel === 2) pantalla = 12;
  } 
  else if (pantalla === 11) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 14; 
    }
  } 
  else if (pantalla === 12) {
    if (mouseX >= width - 130 && mouseX <= width - 30 && mouseY >= height - 55 && mouseY <= height - 20) {
      pantalla = 14; 
    }
  }
  else if (pantalla === 13 || pantalla === 14 || pantalla === 15) {
    let bW = 180, bH = 35, bX = width / 2 - bW / 2, bY = 285;
    if (mouseX >= bX && mouseX <= bX + bW && mouseY >= bY && mouseY <= bY + bH) {
      pantalla = 1; 
    }
  }
}
