var canvas, ctx, width, height;
var hero1;
var mousepos = { x: 0, y: 0 };
var inputStates = {};

window.onload = init;

class Hero {
  constructor(x, y, angle, vitesse,nbBullet, tempsMinEntreTirsEnMillisecondes) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.v = vitesse;
    this.bullets = [];
    this.nbBullet = nbBullet;    
    this.soldeBullet = nbBullet;
    // cadenceTir en millisecondes = temps min entre tirs
    this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-10, -10);
    
    // corps
    ctx.fillRect(0, 0, 20, 20);
    // canon
    ctx.fillRect(-10, 9, 10, 2);
    
    ctx.restore();
    
    this.drawBullets(ctx);

  }
  
  drawBullets(ctx) {
    for(let i = 0; i < this.bullets.length; i++) {
      let b = this.bullets[i];
      b.draw(ctx);
      b.move();
      if ((b.x < 0) || (b.y < 0) || (b.x > width) || (b.y > height))
            this.removeBullet(b)

    }
  }
  
  move(mousepos) {
        // 2) On dÃ©place la balle 
    let dx = this.x - mousepos.x;
    let dy = this.y - mousepos.y;
    this.angle = Math.atan2(dy, dx);
    
    
  }
  
   addBullet(time) {
       //si le nombre de balle est different de 0 on autorise le tir
       if(this.nbBullet != 0 )
        {
     // si le temps écoulé depuis le dernier tir est > temps max alors on tire
     var tempEcoule=0;

     if(this.lastBulletTime !== undefined) {
       tempEcoule = time - this.lastBulletTime;
       //console.log("temps écoulé = " + tempEcoule);
     }
     
     if((this.lastBulletTime === undefined) || (tempEcoule> this.delayMinBetweenBullets)) {
        this.bullets.push(new Bullet(this));
        // on mémorise le dernier temps.
        this.lastBulletTime = time;
     }
     this.nbBullet -= 1;
    }
    else
    {
        alert("Plus de balles");

    }
   }

   removeBullet(bullet) {
        let position = this.bullets.indexOf(bullet);
        this.bullets.splice(position, 1);
    }
}

class Bullet {
    constructor(hero) {
        this.x = hero.x;
        this.y = hero.y;
        this.angle = hero.angle;
    }

    draw(ctx) {
      ctx.save();        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillRect(0, 0, 10, 2);
      
      ctx.restore();
    }

  
    move(maxX, maxY) {
        this.x -= 10 * Math.cos(this.angle);
        this.y -= 10 * Math.sin(this.angle);
    }
}

function init() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
  
    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    hero1 = new Hero(50, 50, 0, 1,5, 100);

    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('click', function (evt) {
        // on passe le temps en parametres, en millisecondes
<<<<<<< HEAD
        hero1.addBullet(Date.now()); 
=======
        char1.addBullet(Date.now()); 
>>>>>>> physiqueTest
        // NOTE : si tu n'utilises pas inputStates.MOUSEDOWN
        // ici, mais juste l'évébement click au lieu de mousedown
        // tu ne pourras pas tirer plus vite, il te faudra
        // marteler le bouton.
        // compare en gardant space appuyé avec la cadence de
        // tir à zero.
    });

    anime();
}

function anime() {
  
    // 1) On efface l'Ã©cran
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // 2) On dessine et on déplace la direction du hero 1
     hero1.draw(ctx);
     hero1.move(mousepos);
  
    if(inputStates.SPACE) {
      hero1.addBullet(Date.now()); 
    }
  
    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime);
  
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}

