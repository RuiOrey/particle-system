var pause = false;
var invert = 0;
var field_number = 1;

function stop(particle) {
    particle.position.x = particle.position.x;
    particle.position.y = particle.position.y;
    particle.position.z = particle.position.z;
    return particle;
}

function checkPointOutDouble(particle){
    var l = particle.position.x * particle.position.x + particle.position.y * particle.position.y + particle.position.z * particle.position.z;
    var r = (params.radius*20) * (params.radius*20);
    if(l > r){
        return true;
    }
    return false;
}

function checkPointOut(particle){
    var l = particle.position.x * particle.position.x + particle.position.y * particle.position.y + particle.position.z * particle.position.z;
    var r = (params.radius) * (params.radius);
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
        pause = !pause;
        return;
    });

    document.addEventListener("keypress", function(e){
        field_number = parseInt(String.fromCharCode(e.keyCode));
    });
}


function handleEffects(particles) {
    var _functions = [];
    if (particles[0] === undefined)
        return;


    if(pause) {
        _functions.push(stop);
    } else {

        switch(field_number) {
            case 1:
                _functions.push(handleBaseField(particles[0]));
                break;
            case 2:
                _functions.push(basespeed);
                _functions.push(field1);
                break;    
        }   
        
    }

    for ( var i = 0 ; i< _functions.length; i ++ ){
        // RUIM
        particles = particles.map(_functions[i]);
    }
}


function handleSound(particles, analyser) {
    var _elapsed = Date.now()* 0.0005;;
    var _sin = Math.sin(_elapsed );
    var _cos = Math.cos(_elapsed + Math.random()*0.01);


    var _changeya = ( analyser.getData()[ i%8 +1] );
    _changeya = _changeya == undefined ? 0: _changeya;
    var _changeza = ( analyser.getData()[ i%4 +1] );
    _changeza = _changeza == undefined ? 0: _changeza;
    var _changex =  ( analyser.getData()[ i%4 +1] );
    _changex = _changex == undefined ? 1 : _changex;

    for ( var i = 0 ; i< particles.length; i ++ ){

        particles[i].position.x = particles[i].position.x + _changex ;
        particles[i].position.y = particles[i].position.y  + _changeya;
        particles[i].position.z = particles[i].position.z  + _changeza;
    }
}
        