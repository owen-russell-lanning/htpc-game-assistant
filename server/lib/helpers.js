const { execSync, spawn, exec } = require('child_process');


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * spawns a process and stops it if the timeout is reached
 * @param {*} command 
 * @param {*} args 
 * @param {*} timeout timeout in seconds
 * @returns stdout
 */
async function spawnProcessWithTimeout(command, args, timeout) {
  const child = spawn(command, args);

  var output = "";

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    output += data.toString();
  });

  await sleep(timeout * 1000);

  return output;
}


/**
 * runs a predicate on each line until the predicate returns true or all lines are checked
 * @param {*} string 
 * @param {*} predicate 
 * @returns true if a line matches the predicate
 */
function doesLineValidatePredicate(string, predicate){
  const lines = string.split("\n");
  for(var i = 0; i<lines.length; i++){
    if(predicate(lines[i].trim())){
      return true;
    }
  }

  return false;
}

/**
 * 
 * @param {*} string 
 * @returns true if the string contains a line with the given term
 */
function containsLine(string, term){
  return doesLineValidatePredicate(string, line => line == term )
}


/**
 * 
 * @param {*} string 
 * @param {*} term 
 * @returns true if the a line in the string ends with the given term
 */
function lineEndsWith(string, term){
  return doesLineValidatePredicate(string, line => line.endsWith(term));
}

module.exports = {lineEndsWith, containsLine, sleep, spawnProcessWithTimeout }