var sysTable = document.getElementById('sysTable');
var genSys = document.getElementById('genSys');

function popSysTable(){
    if(sysTable.style.display === "none"){
        sysTable.style.display = "block";
    } else {
        sysTable.style.display = "none";
    }
}
console.log('hello world')

genSys.addEventListener('click', popSysTable);