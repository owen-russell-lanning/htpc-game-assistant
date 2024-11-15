const { BLUETOOTH_SCAN_LENGTH_SECONDS } = require('../config/constants');
const { execSync, spawn } = require('child_process');
const { sleep } = require('./helpers');


/**
 * scans for bluetooth devices for a short period of time
 * @returns a list of bluetooth devices found and any existing ones available
 */
async function scanForDevices() {

    /** scan for a few seconds */
    const child = spawn("bluetoothctl", ["scan", "on"]);
    await sleep(BLUETOOTH_SCAN_LENGTH_SECONDS * 1000);
    child.kill('SIGINT');

    /** list all devices */
    var devicesStr = execSync("bluetoothctl devices").toString();
    var devices = [];


    /** parts devices into objects */
    var devicesStrSplit = devicesStr.split("\n");
    for(var i = 0; i<devicesStrSplit.length; i++){
        if(devicesStrSplit[i].trim() == ""){
            continue;
        }

        const bd = BluetoothDevice.fromDeviceStr(devicesStrSplit[i]);
        if(bd != null){
            devices.push(bd);
        }
    }

    return devices;





}

class BluetoothDevice {

    constructor(name, mac) {
        this.Name = name;
        this.Mac = mac;
    }

    static fromDeviceStr(str) {
        const parts = str.split(" ");
        if(parts.length <= 2){
            return null;
        }
        
        const mac = parts[1];
        const name = parts.slice(2, parts.length).join(" ");
        return new BluetoothDevice(parts[1], name);

    }

    toString(){
        return JSON.stringify({name: this.Name, mac: this.Mac});
    }
}

module.exports = { scanForDevices, BluetoothDevice }