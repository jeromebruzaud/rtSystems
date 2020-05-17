var sysTable = document.getElementById('sysTable');
var genSys = document.getElementById('genSys');

function popSysTable(){
    if(sysTable.style.display == "none"){
        //getTable();
        sysTable.style.display = "block";
    } 

}

function getObjectData(){
        let roll = Math.floor(Math.random()*10)+1;
        if(roll == 10){
            return //new System_WarpTurbulence();
        } else if(roll == 9){
            return //new System_WarpStasis();
        } else if(roll == 8){
            return //new System_StellarAnomaly();
        } else if(roll == 7){
            return //new System_StarFarers();
        } else if(roll == 6){
            return //new System_RuinedEmpire();
        } else if(roll == 5){
            return //new System_PirateDen();
        } else if(roll == 4){
            return //new System_IllOmened();
        } else if(roll == 3){
            return //new System_Haven();
        } else if(roll == 2){
            return //new System_GravityTides();
        } else if(roll == 1){
            return //new System_Bountiful();
        }
    }

    const table = getObjectData();
    //populate table with getObjectData


genSys.addEventListener('click', popSysTable);