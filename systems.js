class System{
    constructor(features){
        
        this.features = featureGen(); 
        console.log(features)
    }
}
function d5(){
    roll = Math.floor(Math.random()*5)+1
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

function featureGen(){
    initial = d10()
    if(initial==1){
        return "Bountiful"
    }
    if(initial==2){
        return "Gravity Tides"
    }
    if(initial==3){
        return "Haven"
    }
    if(initial==4){
        return "Ill-Omened"
    }
    if(initial==5){
        return "Pirate Den"
    }
    if(initial==6){
        return "Ruined Empire"
    }
    if(initial==7){
        return "Starfarers"
    }
    if(initial==8){
        return "Stellar Anomaly"
    }
    if(initial==9){
        return "Warp Stasis"
    }
    if(initial==10){
        return "Warp Turbulence"
    }
}
planet1 = {
    features: featureGen(),
    
}
console.log(planet1.features)