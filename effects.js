var pause = 0;
var invert = 0;
var field_number = 0;

function stop(particle) {
    particle.position.x = particle.position.x;
    particle.position.y = particle.position.y;
    particle.position.z = particle.position.z;
    return particle;
}

function checkPointOutDouble(particle){
    var l = particle.position.x * particle.position.x + particle.position.y * particle.position.y + particle.position.z * particle.position.z;
    var r = (params.radius*5) * (params.radius*5);
    if(l > r){
        return true;
    }
    return false;
}

function checkPointOut(particle){
    var l = particle.position.x * particle.position.x + particle.position.y * particle.position.y + particle.position.z * particle.position.z;
    var r = (params.radius/2) * (params.radius/2);
    if(l < r){
        return true;
    }
    return false;
}

function basespeed(particle) {
    particle.position.x = particle.position.x + particle.position.x *0.015;
    particle.position.y = particle.position.y + particle.position.y *0.015;
    particle.position.z = particle.position.z + particle.position.z *0.015;

    return particle;
}

function move(particle) {
    particle.position.x = particle.position.x + particle.position.x *0.015;
    particle.position.y = particle.position.y + particle.position.y *0.015;
    particle.position.z = particle.position.z + particle.position.z *0.015;

    return particle;
}

function moveback(particle) {
    particle.position.x = particle.position.x - particle.position.x *0.015;
    particle.position.y = particle.position.y - particle.position.y *0.015;
    particle.position.z = particle.position.z - particle.position.z *0.015;

    return particle;
}

function handleBaseField(particle) {
   
    if(invert == 0 && checkPointOutDouble(particle)) {
        invert = 1;        
    }

    if (invert == 1 && checkPointOut(particle)) {
        invert = 0;
    }

    if(invert == 0) {
        return move;
    } else {
        return moveback;
    }
}


// { -y, x ,z}
function field1(particle) {
    var x = particle.position.x;
    var y = particle.position.y;

    particle.position.x = particle.position.x + (-y) * 0.015;
    particle.position.y =  particle.position.y + x * 0.015;

    return particle;
}




function setHandlers(document) {
    document.addEventListener("click", function(){
        if(pause == 1) {
            pause = 0;
            return;
        }
        pause = 1;
        return;
    });

    document.addEventListener("keypress", function(e){
        field_number = parseInt(String.fromCharCode(e.keyCode));
    });
}


function handleEffects(particles) {
    var _functions = [];


    if(pause == 1) {
        _functions.push(stop);
    } else {

        switch(field_number) {
            case 1:
                _functions.push(handleBaseField(particle[0]));
                break;
            case 2:
                _functions.push(basespeed);
                _functions.push(field1);
                break;    
        }   
        
    }

    for ( var i = 0 ; i< _functions.length; i ++ ){
        // RUI
        particles = particles.map(_functions[i]);
    }
}

        