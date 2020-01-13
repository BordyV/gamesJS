var canvas, ctx, width, height;
var mousepos = { x: 0, y: 0 };
var inputStates = {};
var boutons=[];
var btnJouer = {};
var btnEditeur = {};
var niveau1 = {}
var mapname;
function menu() {

inputStates = {};
 boutons=[];
 btnJouer = {};
btnEditeur = {};
 niveau1 = {}
 nbMechant =1;

    if(canvas == null) {
        mapActuelle = new Map(map1);
        setInterval("pos()",1);
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        canvas.addEventListener('click', function (evt) {
            if (mapActuelle.leHero != null)
            mapActuelle.leHero.addBullet(Date.now());

        });
        window.addEventListener('click', function (evt) {
            boutons.forEach(b => {

                if (this.CollisionBouton(b) != null) {
                    if (b.id == 1) {
                        MenuJouer();
                        document.getElementById("sliders").style.display = "none";

                    }
                    if (b.id == 2) {
                        boutons = [];
                        inita();
                        ctx.canvas = Loii();

                        document.getElementById("sliders").style.display = "unset";


                    }
                    if (b.id == 101) {

                        ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        boutons = [];
                        mapActuelle = new Map(map1);
                        mapname = map1;
                        anime();
                    }
                    if (b.id == 102) {

                        ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        boutons = [];
                        mapActuelle = new Map(map2);
                        mapname = map2;
                        anime();
                    }
                    if (b.id == 103) {

                        ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        boutons = [];
                        mapActuelle = new Map(map3);
                        mapname = map3;
                        anime();
                    }
                }
            })

            buttonMenu();
        });

    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    btnJouer = { x: (canvas.width/2)-400/2, y: 300 ,w:400,h:100,id:1};
    btnEditeur = { x: (canvas.width/2)-400/2, y: 500 ,w:400,h:100,id:2};
    boutons.push(btnJouer);
    boutons.push(btnEditeur);
    ctx.save();
    ctx.font = "900 60px Charcoal";
    ctx.fillStyle = ' #e60000';
    ctx.shadowColor = "black";
    ctx.shadowOffsetY =4;
    ctx.shadowOffsetX =-4;
    ctx.shadowBlur =3;
    ctx.fillText("BENGUE", 120, 60);
    ctx.fillText("BENGUE", 380, 110);
    ctx.fillText("DEADSASHAKAL",640 , 160);
    ctx.shadowOffsetY =0;
    ctx.shadowOffsetX =0;
    ctx.shadowBlur =0;
    ctx.fillStyle = '#00001a';
    ctx.globalAlpha = 0.6;
    ctx.fillRect((canvas.width/2)-400/2,300,400,100)
    ctx.fillRect((canvas.width/2)-400/2,500,400,100)
    ctx.globalAlpha = 1;
    ctx.fillStyle = ' #e60000';
    ctx.fillText("Jouer",580 , 370);
    ctx.fillText("Editeur",550 , 570);
    ctx.restore();
}



function MenuJouer() {
    quitter = false;
    nbMechant =1;
    let niveau2 = { x: 170, y: 100 ,w:100,h:100,id:102};
    let niveau3 = { x: 320, y: 100 ,w:100,h:100,id:103};
    ctx.save();
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boutons=[];
    niveau1 = { x: 20, y: 100 ,w:100,h:100,id:101};
    boutons.push(niveau1);
    boutons.push(niveau2);
    boutons.push(niveau3);
    ctx.fillStyle = '#00001a';
    ctx.globalAlpha = 0.6;
    ctx.fillRect(20,100,100,100);
    ctx.fillRect(170,100,100,100);
    ctx.fillRect(320,100,100,100);
    ctx.globalAlpha = 1;
    ctx.font = "900 60px Charcoal";
    ctx.fillStyle = ' #e60000';
    ctx.fillText("Selection des niveaux",(canvas.width/2)-ctx.measureText('Selection des niveaux').width/2 , 60);
    ctx.fillText("1", 55, 170);
    ctx.fillText("2", 205, 170);
    ctx.fillText("3", 355, 170);
    ctx.restore();


}

function CollisionBouton(bouton){


    if (((mousepos.x < (Math.floor(bouton.x) + Math.floor(bouton.w))
        && mousepos.x > bouton.x)) ) {

        if (((mousepos.y < Math.floor(bouton.y) + Math.floor(bouton.h)
            && mousepos.y > bouton.y)))
        {

            return bouton.id;

        }
    }
    return null;
}
/*
canvas = document.querySelector("#myCanvas");
ctx = canvas.getContext('2d');
width = canvas.width;
height = canvas.height;

mapLoad = map2;
map =[];
for (i in mapLoad)
{
    if (mapLoad[i].id === 101 || mapLoad[i].id === 102 )
    {
        map.push(new Mur(mapLoad[i].id,mapLoad[i].x, mapLoad[i].y, mapLoad[i].height, mapLoad[i].width));
        lesMurs.push(new Mur(mapLoad[i].id,mapLoad[i].x, mapLoad[i].y, mapLoad[i].height, mapLoad[i].width));
    }
    if (mapLoad[i].id === 1)
    {
        hero1 = new Hero(mapLoad[i].id,mapLoad[i].x, mapLoad[i].y,mapLoad[i].angle,mapLoad[i].v,mapLoad[i].nbBullet,mapLoad[i].delayMinBetweenBullets, mapLoad[i].height, mapLoad[i].width);
    }
    if (mapLoad[i].id === 2)
    {
        mechants.push( new Mechant(mapLoad[i].id,mapLoad[i].x, mapLoad[i].y, mapLoad[i].height,mapLoad[i].width));
    }

}
// dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
// 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde





//"[{"id":101,"x":492.8000030517578,"y":704.8000030517578,"roation":0,"width":"800","height":100,"image":{}}]"


canvas.addEventListener('mousemove', function (evt) {
    mousepos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener('click', function (evt) {

    hero1.addBullet(Date.now());

});


anime();*/
