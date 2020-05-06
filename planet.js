//Uses an object constructor instead of a class, dunno if that's smart or not?

//need to connect between this and systems

//need a way to read which section planet polulates in (inner, primary or outer)

//needs testing

//as you can see in planet1, a BUNCH of these results rely on the results of the entries behind them

//Constructor (Tables 6-12, P. 19-23)
function Rockyplanet(body, gravity, orbitalFeatures, atmo, atmocomp, climate, hab) {
    this.body = body, 
    this.gravity = gravity,
    this.orbitalFeatures = orbitalFeatures,
    this.atmo = atmo,
    this.atmocomp = atmocomp,
    this.climate = climate,
    this.hab = hab
}

//Planet Actual
planet1 = new Rockyplanet(
    //body
    getRockyBody(d10()),
    //gravity
    getRockyGravity(d10(), getRockyGravitymod(this.body)),
    //orbitalFeatures
    getRockyOrbitalFeatures(getRockyOrbitalFeaturesMod(this.gravity)),
    //atmo
    getRockyAtmo(d10(), getRockyAtmoMod(this.gravity)),
    //atmocomp
    getRockyAtmoComp(d10(), this.atmo),
    //climate
    getRockyClimate(d10()),
    //hab
    getRockyHab(d10(), getRockyHabMod(this.climate), this.atmo, this.atmocomp)
    )
    console.log(planet1);

//Roll Functions
function d2(){
    roll = Math.floor(Math.random()*2)+1
    return roll;    
}

function d3(){
    roll = Math.floor(Math.random()*3)+1
    return roll;    
}

function d4(){
    roll = Math.floor(Math.random()*4)+1
    return roll;    
}

function d10(){
    roll = Math.floor(Math.random()*10)+1
    return roll;    
}

function d100(){
    roll = Math.floor(Math.random()*100)+1
    return roll;    
}

//Get Body (Table 1-6 P. 19)
function getRockyBody(roll) {
    if(roll >= 9){
        return 'Vast';
    } else if(roll >= 8){
        return 'Large and Dense';
    }else if(roll >= 5){
        return 'Large';
    }else if(roll >= 4){
        return 'Small and Dense';
    }else if(roll >= 2){
        return 'Small';
    }else {
        return 'Low Mass';
    }
}

//Get Gravity (Table 1-7 P. 20)
function getRockyGravitymod(body){
    var gravmod = 0;
    if(body === 'Vast'){
        gravmod = 4;
    } else if(body === 'Large and Dense'){
        gravmod = 5;
    } else if(body === 'Small') {
        gravmod = -5;
    } else if(body === 'Low Mass') {
        gravmod = -7;
    } else {
        gravmod = 0;
    }
    return gravmod;
}

function getRockyGravity(roll, mod){
    var rollmod = roll + mod;
    if(rollmod >= 9){
        return 'High Gravity';
    } else if(rollmod >= 3){
        return 'Normal Gravity';
    } else {
        return 'Low Gravity'
    }
}

//Get Orbital Features (Table 1-8 P. 20)
//TODO fix this function
function getRockyOrbitalFeaturesMod(gravity){
    var mod = 0;
    if(gravity === 'High Gravity'){
        mod = d4()
        return mod;
    } else if(gravity === 'Normal Gravity'){
        mod = d3()
        return mod;
    } else if(gravity === 'Low Gravity'){
        mod = d2()
        return mod;
    }
}

function getRockyOrbitalFeatures(times){
    var orbitalfeat =[];
    for(i=0;i<times;i++){
        roll = d100()
        if(roll >= 91){
            orbitalfeat.push('Moon');
        } else if(roll >= 61 && roll <= 90){
            orbitalfeat.push('Lesser Moon');
        } else if(roll >= 46 && roll <= 60){
            orbitalfeat.push('Large Asteroid');
        } else {
            orbitalfeat.push('No Feature')
        }
    
}
    return orbitalfeat;
}


//Get Atmo (Table 1-9 P. 24)
function getRockyAtmoMod(gravity) {
    if(gravity === 'High Gravity'){
        return 1;
    } else if(gravity === 'Low Gravity'){
        return -2;
    } else {
        return 0;
    }
}

function getRockyAtmo(roll, mod){
    var rollmod = roll + mod;
    if(rollmod >= 10){
        return 'Heavy';
    } else if(rollmod >= 5){
        return 'Normal';
    } else if(rollmod >= 2){
        return 'Thin';
    } else {
        return 'None'
    }
}

//Get Atmo Composition (Table 1-10 P. 24)
function getRockyAtmoComp(roll, atmo){
    if(atmo === 'None'){
        return 'N/A'
    } else {
        if(roll >=8){
            return 'Pure';
        } else if(roll >=6){
            return 'Tainted';
        } else if(roll >=3){
            return 'Toxic';
        } else if(roll >=2){
            return 'Corrosive';
        } else {
            return 'Deadly'
        }
    }
}

//Get Climate (Table 1-11 P. 22)
function getRockyClimate(roll){
    //roll needs a -6 in inner cauldron and +6 in outer reaches
    //also if atmo === 'N/A' they are ice worlds in outer, burning worlds inner, primary either
    if(roll > 10){
        return 'Ice World'
    } else if(roll >=8){
        return 'Cold World';
    } else if(roll >=4){
        return 'Temperate World';
    } else if(roll >=1){
        return 'Hot World'
    } else {
        return 'Burning World'
    }
}

//Get Habitability (Table 1-12 P. 23)
function getRockyHabMod(climate){
    if(climate ===  'Burning World' || climate === 'Ice World'){
        return -7;
    } else if(climate === 'Hot World' || climate === 'Cold World'){
        return -2;
    } else {
        return 0;
    }

}

function getRockyHab(roll, mod, atmo, comp){
    if(atmo === 'N/A' || comp !== 'Pure' || comp !== 'Tainted'){
        return 'N/A'
    } else {
        var rollmod = roll + mod;
        if(rollmod >=8){
            return 'Verdant';
        } else if(rollmod >= 6){
            return 'Limited Ecosystem';
        } else if(rollmod >= 4){
            return 'Liquid Water';
        } else if(rollmod >=2){
            return 'Trapped Water'
        } else{
            return 'N/A'
        }
    }
}
