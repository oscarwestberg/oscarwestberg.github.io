// TO DO:
// Buttons have visible selection
// Draggable
// Make sure this works in FF

var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var canvas = document.getElementById('canvas'),
    fps = 60,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0,
    x = 0,
    y = 0,
    keys = [],
    particles = [],
    fields = [],
    fieldType = 'attract',
    timer = 0,
    ctx = null;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var width = canvas.width,
    height = canvas.height;

window.addEventListener("click", function (e) {
  mouseClick(e);
});

if (typeof (canvas.getContext) !== undefined) {
    ctx = canvas.getContext('2d');
    
    init();
    gameLoop();
}

function makeAttract() {
    fieldType = 'attract';
    document.getElementById("canvas").style.color="#fff";
}

function makeRepel() {
    fieldType = 'repel';
}

function makeEmitter() {
    fieldType = 'emit';
}

function reset() {
    fields = [];
    particles = [];
}

function mouseClick(e)
{
    // First check if click is on button or not
    var posX = e.offsetX;
    var posY = e.offsetY;
    if(posY > 20) {
        addField(posX, posY);
    }
}

function init() {
    // for(var i = 0; i <= 200; i++) {
    //     addParticle();
    // }

    fields[0] = {
        posx : 100,
        posy : 100,
        type : 'emit'
    };

    fields[1] = {
        posx : 600,
        posy : 600,
        type : 'emit'
    };
}

function update(delta) {
    currentTime = (new Date()).getTime();
    timer += (currentTime - lastTime) / 1000;

    if(timer > 0.02 ) {
        for( var j = 0; j < fields.length; j++) {
            if(fields[j].type == 'emit') {
                addParticleMove(fields[j].posx, fields[j].posy);
            }
        }
    timer = 0;
    }
    

    for(var i = 0; i < particles.length; i++) {
        for( var j = 0; j < fields.length; j++) {
            if(fields[j].type == 'attract') {
                var vectorX = fields[j].posx - particles[i].posx;
                var vectorY = fields[j].posy - particles[i].posy;
                var force = 2000 / Math.pow((vectorX*vectorX+1000+vectorY*vectorY),1.5);
                particles[i].velx += vectorX*delta*force;
                particles[i].vely += vectorY*delta*force;
            }
            else if(fields[j].type == 'repel') {
                var vectorX = fields[j].posx - particles[i].posx;
                var vectorY = fields[j].posy - particles[i].posy;
                var force = -1500 / Math.pow((vectorX*vectorX+100+vectorY*vectorY),1.5);
                particles[i].velx += vectorX*delta*force;
                particles[i].vely += vectorY*delta*force;
            }
        }
        
        particles[i].posx += particles[i].velx;
        particles[i].posy += particles[i].vely;

        checkBounds(particles[i], i);
    }
}

function addParticleMove(newPosX, newPosY) {
    particles[particles.length] = {
        posx : newPosX,
        posy : newPosY,
        velx : 1.5,
        vely : Math.sin(currentTime)/17
    };
}

function addParticle() {
    particles[particles.length] = {
        posx : Math.floor((Math.random()*width)+1),
        posy : Math.floor((Math.random()*height)+1),
        velx : 0,
        vely : 0
    };
}

function addField(posX, posY) {
    fields[fields.length] = {
        posx : posX,
        posy : posY,
        type : fieldType
    };
}

function checkBounds(particle, number) {
    if (particle.posx > width) {
        particles.splice(number, 1);
        // particle.posx = width;
        // particle.velx = -particle.velx;
    }
    if (particle.posx < 0) {
        particles.splice(number, 1);
        // particle.posx = 0;
        // particle.velx = -particle.velx;
    }
    if (particle.posy > height) {
        particles.splice(number, 1);
        // particle.posy = height;
        // particle.vely = -particle.vely;
    }
    if (particle.posy < 0) {
        particles.splice(number, 1);
        // particle.posy = 0;
        // particle.vely = -particle.vely;
    }
}

function render() {
	ctx.fillStyle = "white";

    for(var i = 0; i < particles.length; i++) {
        ctx.fillRect(particles[i].posx, particles[i].posy, 1, 1);
    }

    for(var j = 0; j < fields.length; j++) {
        if(fields[j].type == 'repel') {
            ctx.fillStyle = "blue";
        }
        else if(fields[j].type == 'attract') {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "white";
        }

        ctx.beginPath();
        ctx.arc(fields[j].posx, fields[j].posy, 4, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime) / 1000;
    ctx.clearRect(0, 0, width, height);

    update(delta);
    render();

    lastTime = currentTime;
}