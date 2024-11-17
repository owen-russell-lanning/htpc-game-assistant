var showLogs = false;

function setShowLog(val) {
    showLogs = val;
}

function log(message){
    if(showLogs){
        console.log(message);
    }
}

module.exports = {setShowLog, log}