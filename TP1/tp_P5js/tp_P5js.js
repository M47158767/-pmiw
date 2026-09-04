// IMPORTANTE!AL INICIAR LA ANIMACION DARLE A LA BARRITA ESPACIADORA ASI SUENA LA MUSICA
let fondo;
let piso;
let fondoX = 0;
let pisoX = 0;
let velocidadFondo = 1;
let velocidadPiso = 3;
let musica;

// RYU
let anchoRyu = 160, altoRyu = 180;
let velocidadRyu = 2;
let ryuCaminar = [];
let ryuX = -anchoRyu;
let ryuY = 533 - altoRyu;

//RYU camina
let estadoRyu = "caminar";

//POSE PELEA
let ryuPelea = [];

//PATADA DE RYU
let ryuPatada;

//POSE VICTORIA RYU
let ryuVictoria = [];
let ryuTiempodevictoria = 0;

// ENEMIGO
let anchoEnemigo = 160, altoEnemigo =  180;
let enemigoEspera = [];
let enemigoCubre = [];
let enemigoGolpe = [];
let enemigoCae = [];
let enemigoX = 420;
let enemigoY = ryuY;
let estadoEnemigo = "espera";
 
 //TIEMPO ENEMIGO
  let enemigoTiempo = 0;
  //Tiempo cuando se cae enemigo
  let enemigoTiempocae = 0;
  
  // TIEMPO RYU
  let ryuTiempo = 0;
  
  //enemigo cuando cae ancho y alto
  let anchoEnemigoCae = 200, altoEnemigoCae = 90;
  let enemigoYcae = 533 - altoEnemigoCae;
  
  
function preload() {
  fondo = loadImage("data/fondo.png");
  piso = loadImage("data/piso.png");
  musica = loadSound("data/musica.mp3");
 
  for (let i = 1; i <= 6; i++) ryuCaminar[i - 1] = loadImage("data/SpriteRyu" + i + ".png");
  //RYU
  ryuPelea[0] = loadImage("data/Posepelea1.png");
  ryuPelea[1] = loadImage("data/Posepelea2.png");
  ryuPatada = loadImage("data/Patada.png");
  ryuVictoria[0] = loadImage("data/PoseVictoria1.png");
  ryuVictoria[1] = loadImage("data/PoseVictoria2.png");
  
  
  enemigoEspera[0] = loadImage("data/PoseEnemigo.png");
  enemigoCubre[0] = loadImage("data/EnemigoCubre.png");
  enemigoGolpe[0] = loadImage("data/EnemigoGolpean.png");
  enemigoCae[0] = loadImage("data/EnemigoCae.png");
  
  
}

function setup() {
  createCanvas(800,600);
  
}

function draw() {
  //fondo infinito
  
  image(fondo, fondoX, 0, 800, 600);
  image(fondo, fondoX + 800, 0, 800, 600);
  
  //pisoinfinito
  
  image(piso, pisoX, 533, 800, 67);
  image(piso, pisoX + 800, 533, 800, 67);
   
  fondoX -= velocidadFondo;
  if (fondoX <= -800) fondoX = 0;
    if(estadoRyu == "caminar"){
      pisoX -= velocidadPiso;
  if (pisoX <= -800) pisoX = 0;
    }
  

  //MAQUINA D ETSADOS RYU CAMINA
  if (estadoRyu == "caminar") {
    let i = obtenerFrameActual (ryuCaminar.length, 8);
    dibujarpersonaje(ryuCaminar[i], ryuX, ryuY, anchoRyu, altoRyu);
    ryuX += velocidadRyu;
    if (ryuX >= 260) {
      ryuX = 260;
    estadoRyu = "pelea";
    }
  }
  else if (estadoRyu == "pelea") {
    let i = obtenerFrameActual(ryuPelea.length, 10);
    dibujarpersonaje(ryuPelea[i], ryuX, ryuY, anchoRyu, altoRyu);
    if (estadoEnemigo == "cubre") {
      ryuTiempo++;
      if (ryuTiempo >= 40){
        estadoRyu = "patada";
        ryuX = ryuX + 60;
      }
    }
  }
  else if (estadoRyu == "patada") {
    dibujarpersonaje(ryuPatada, ryuX, ryuY, anchoRyu, altoRyu);
    
    if (estadoEnemigo == "cubre") {
      ryuTiempo++;
      if (ryuTiempo >= 55) {
      estadoEnemigo = "golpe";
    }
  }
  if(estadoEnemigo == "cae"){
    estadoRyu = "victoria1";
    ryuX = 240;
  }
  }
  else if (estadoRyu == "victoria1") {
    dibujarpersonaje(ryuVictoria[0], ryuX, ryuY, anchoRyu, altoRyu);
    ryuTiempodevictoria++;
    if (ryuTiempodevictoria >= 60)
    estadoRyu = "victoria2";
  }

else if (estadoRyu == "victoria2") {
  dibujarpersonaje(ryuVictoria[1], ryuX, ryuY, anchoRyu, altoRyu);
}
  
      //MAQUINA D ESTADOS ENEMIGO POSE PELEA
  if (estadoEnemigo == "espera") {
    dibujarpersonaje(enemigoEspera[0], enemigoX, enemigoY, anchoEnemigo, altoEnemigo);
    
    if(estadoRyu == "pelea") {
      enemigoTiempo++;
      if(enemigoTiempo >= 60) {
        estadoEnemigo = "cubre";
      }
    }
  }
  else if (estadoEnemigo == "cubre") {
    dibujarpersonaje(enemigoCubre[0], enemigoX, enemigoY, anchoEnemigo, altoEnemigo);
  }
    
    else if (estadoEnemigo == "golpe"){ 
      dibujarpersonaje(enemigoGolpe[0], enemigoX, enemigoY, anchoEnemigo, altoEnemigo);
      enemigoTiempocae++;
      if(enemigoTiempocae >=30){
        estadoEnemigo = "cae";
      }
    }
        
        else if (estadoEnemigo == "cae"){
          dibujarpersonaje(enemigoCae[0], enemigoX, enemigoYcae, anchoEnemigoCae, altoEnemigoCae);
        }
  
  
}

function dibujarpersonaje(sprite, x, y, ancho, alto){
  image(sprite, x, y, ancho, alto);
}


function obtenerFrameActual(cantidadFrames, velocidad){ 
  let indice = floor(frameCount / velocidad) % cantidadFrames;
  return indice;
}

function reiniciarlaanimacion() {
  fondoX = 0;
  pisoX = 0;
  
  ryuX = -anchoRyu;
  estadoRyu = "caminar";
  ryuTiempo = 0;
  ryuTiempodevictoria = 0;
  
  estadoEnemigo = "espera";
  enemigoTiempo = 0;
  enemigoTiempocae = 0;
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    reiniciarlaanimacion();
  }
  if (key == ' '){
    musica.loop();
  }
}
