class Hero extends Objet {

    constructor(id, x, y, angle, vitesse,nbBullet, tempsMinEntreTirsEnMillisecondes, height, width) {
      
      super(id, x, y, height, width);
      this.angle = angle;
      this.x = x;
      this.y = y;
    
      this.v = vitesse;
      this.id =1;
      this.bullets = [];
      this.nbBullet = nbBullet;    
      this.soldeBullet = nbBullet;
      // cadenceTir en millisecondes = temps min entre tirs
      this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;

      this.corps = document.getElementById("hero");
      this.arme = document.getElementById("arme");
      this.height =this.corps.height;
      this.width =this.corps.width;

      this.armeX = this.x +this.width;
      this.armeY = this.y+this.height/2;
      this.armeWidth = this.arme.width;
      this.armeHeight = this.arme.height;
        this.moveM(mousepos);

    }
    
    drawObj(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      // ctx.rotate(this.angle);
        if(this.surbrillance) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = "white";
        }
      
      // corps
      ctx.drawImage(this.corps, 0, 0);
      // ctx.fillRect(0, 0, 20, 20);
      // canon
      
      ctx.translate(70, 80);
      
      ctx.rotate(this.angle);
        if(mousepos.x < this.x+this.width/2){
            ctx.scale(1,-1);
        }
        ctx.drawImage(this.arme, -50, -0);
      ctx.restore();
      
      this.drawBullets(ctx);
  
    }
    
    drawBullets(ctx) {
      for(let i = 0; i < this.bullets.length; i++) {
        let b = this.bullets[i]; 
        b.drawObj(ctx);
        //if ((b.x < 0) || (b.y < 0) || (b.x > width) || (b.y > height))
        if (b.nbRebond == 0)
        {
          this.removeBullet(b);
        }
        if (b.x <0 || b.x >2000 || b.y<-200 || b.y>800)
            this.removeBullet(b);

      }
    }
    
    moveM(mousepos) {
          // 2) On deplace la balle 
      let dx = this.armeX - mousepos.x;
      let dy = this.armeY - mousepos.y;
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
         // alert("Plus de balles");
  
      }
     }
  
     removeBullet(bullet) {
          let position = this.bullets.indexOf(bullet);
          this.bullets.splice(position, 1);

      }
      removeAllBullets(){


          this.bullets.map(c => {
             this.removeBullet(c);

          });
      }

  }
  function pos(){
      mapActuelle.leHero.bullets.map(c => {
          c.pos();

      });
  }
  