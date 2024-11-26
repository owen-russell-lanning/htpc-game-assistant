const { execSync, spawn, exec } = require('child_process');

/** opens steam link */
function openSteamLinkShortcut(){
    execSync("export DISPLAY=:0 && nohup steamlink");

}

module.exports={openSteamLinkShortcut}