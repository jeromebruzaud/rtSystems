//TODO: fix Binary, include system feature conditions

class System{
    constructor(features){
        
        this.features = featureGen(); 
        console.log(features);
    }
}

// Roll Functions

function d3(){
    roll = Math.floor(Math.random()*3)+1
    return roll;    
}

function d5(){
    roll = Math.floor(Math.random()*5)+1
    return roll;    
}

function d7(){
    roll = Math.floor(Math.random()*7)+1
    return roll;    
}

function d9(){
    roll = Math.floor(Math.random()*9)+1
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

// Generates Features (1-1 p.8)
function featureGen(roll){
    if(roll==1){
        return "Bountiful"
    }
    if(roll==2){
        return "Gravity Tides"
    }
    if(roll==3){
        return "Haven"
    }
    if(roll==4){
        return "Ill-Omened"
    }
    if(roll==5){
        return "Pirate Den"
    }
    if(roll==6){
        return "Ruined Empire"
    }
    if(roll==7){
        return "Starfarers"
    }
    if(roll==8){
        return "Stellar Anomaly"
    }
    if(roll==9){
        return "Warp Stasis"
    }
    if(roll==10){
        return "Warp Turbulence"
    }
}

// Generates the Star type (1-2 p.13)

function starGen(roll){
    if(roll==1){
        return "Mighty"
    };
    if(roll>=2 && roll<=4){
        return "Vigorous"
    }
    if(roll==5||roll==6||roll==7){
        return "Luminous"
    }
    if(roll==8){
        return "Dull"
    }
    if(roll==9){
        return "Anomalous"
    }
    if(roll==10){
        binary=[]
        binary[0]=starGen(d9())
        binary[1]=starGen(d9())
        return binary
    }
}

// The actual system object itself

system1 = {
    features: featureGen(d10()),
    star: starGen(d10()),
    innerElements: innerElemPop(systemElem(this.star)),
    primaryElements: primaryElemPop(systemElem(this.star)),
    outerElements: outerElemPop(systemElem(this.star))
}

// Testing area, ignore
console.log(system1);
for(i=25;i>0;i--){
    // console.log(featureGen(d10()),starGen(d10()));
    
}

//Generating and populating inner, primary and outer

//Determines weak/standard/dominant solar zones (p. 13)
function systemElem(star){
    innerCount = 0;
    primCount = 0;
    outCount = 0;
    if(star === 'Mighty'){
        innerCount = d7();
        primCount = d3();
        outCount = d5();
    } else if(star === 'Vigorous'){
        innerCount = d5();
        primCount = d5();
        outCount = d5();
    } else if(star === 'Luminous'){
        innerCount = d3();
        primCount = d5();
        outCount = d5();
    } else if(star === 'Dull'){
        innerCount = d5();
        primCount = d5();
        outCount = d7();
    } else {
        //TODO fix this lawl
        //placeholder till we figure out binary
        innerCount = d5();
        primCount = d5();
        outCount = d7();
    }
    return [innerCount, primCount, outCount]
} 

// Populates the three zones

function innerElemPop(count){
    innerElems = [];
    for(i=0;i<count[0];i++){
        innerElems.push(innerGen(d100()));
    } return innerElems;
}
function primaryElemPop(count){
    primaryElems = [];
    for(i=0;i<count[1];i++){
        primaryElems.push(primaryGen(d100()));
    } return primaryElems;
}
function outerElemPop(count){
    outerElems = [];
    for(i=0;i<count[2];i++){
        outerElems.push(outerGen(d100()));
    } return outerElems;
}

//look-up references for the pop functions (1-3 p. 14)

function innerGen(initial){
    if(initial >= 89){
        return 'Solar Flares';
    } else if(initial >= 77){
        return 'Radiation Bursts';
    } else if(initial >= 57){
        return 'Planet';
    } else if(initial >= 46){
        return 'Gravity Riptide'
    } else if(initial >= 42){
        return 'gas giant';
    } else if(initial >= 30){
        return 'Dust Cloud';
    } else if(initial >= 21){
        return 'Asteroid cluster';
    } else {
        return 'no feature';
    }
}

function primaryGen(initial){
    if(initial >= 94){
        return 'Starship Graveyard';
    } else if(initial >= 65){
        return 'Planet';
    } else if(initial >= 59){
        return 'Gravity Riptide';
    } else if(initial >= 48){
        return 'Dust Cloud'
    } else if(initial >= 42){
        return 'Derelict Station';
    } else if(initial >= 31){
        return 'Asteroid Cluster';
    } else if(initial >= 21){
        return 'Asteroid Belt';
    } else {
        return 'no feature';
    }
}

function outerGen(initial){
    if(initial >= 94){
        return 'Starship Graveyard';
    } else if(initial >= 81){
        return 'Planet';
    } else if(initial >= 74){
        return 'Gravity Riptide';
    } else if(initial >= 56){
        return 'Gas Giant'
    } else if(initial >= 47){
        return 'Dust Cloud';
    } else if(initial >= 41){
        return 'Derelict Station'
    }else if(initial >= 30){
        return 'Asteroid Cluster';
    } else if(initial >= 21){
        return 'Asteroid Belt';
    } else {
        return 'no feature';
    }
}
