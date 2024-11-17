const { BLUETOOTH_SCAN_LENGTH_SECONDS, BLUETOOTH_PAIR_WAIT_LENGTH_SECONDS, BLUETOOTH_CONNECT_WAIT_LENGTH_SECONDS } = require('../config/constants');
const { execSync, spawn, exec } = require('child_process');
const { sleep, spawnProcessWithTimeout, containsLine, lineEndsWith } = require('./helpers');
const { log } = require('console');


async function initBt() {
    /** turn pairable on */
    execSync("bluetoothctl pairable on");
}

/**
 * scans for bluetooth devices for a short period of time
 * @returns a list of bluetooth devices found and any existing ones available
 */
async function scanForDevices() {

    /** scan for a few seconds */
    await spawnProcessWithTimeout("bluetoothctl", ["scan", "on"], BLUETOOTH_SCAN_LENGTH_SECONDS)

    /** list all devices */
    var devicesStr = execSync("bluetoothctl devices").toString();
    var devices = [];


    /** parts devices into objects */
    var devicesStrSplit = devicesStr.split("\n");
    for (var i = 0; i < devicesStrSplit.length; i++) {
        if (devicesStrSplit[i].trim() == "") {
            continue;
        }

        const bd = BluetoothDevice.fromDeviceStr(devicesStrSplit[i]);
        if (bd != null) {
            devices.push(bd);
        }
    }

    return devices;





}


/**
 * pairs with a bluetooth devices. will scan first to determine if the device is still pairable
 * @param {*} mac mac address to pair with
 * @return true if the device paired correctly
 */
async function pair(mac) {

    /** execute bluetoothctl command to pair */
    const stdout = await spawnProcessWithTimeout("bluetoothctl", ["pair", mac], BLUETOOTH_PAIR_WAIT_LENGTH_SECONDS);

    /** parse stdout to check if pairing was successful */
    const lines = stdout.split("\n");

    var doesSuccessfulLineExist = false;
    for (var i = lines.length - 1; i > -1; i--) {
        if (lines[i].trim() == "Pairing successful") {
            doesSuccessfulLineExist = true;
            break;
        }
    }

    return doesSuccessfulLineExist;


}


/**
 * pairs and connects with a device
 * @param {*} mac mac address to connect to
 * @returns true if the pair and connect was succesfful
 */
async function pairAndConnect(mac) {
    if (!isMac(mac)) {
        log("\"" + mac + "\" is not a mac address");
        return false;
    }

    await scanForDevices();

    const didPair = await pair(mac);

    if (!didPair) {
        log("Unable to pair to \"" + mac + "\"");
        return false;
    }

    /** execute bluetoothctl command to connect */
    const stdout = await spawnProcessWithTimeout("bluetoothctl", ["connect", mac], BLUETOOTH_CONNECT_WAIT_LENGTH_SECONDS);
    if (!containsLine(stdout, "Connection successful")) {
        log("Could not connect to \"" + mac + "\"")
        return false;
    }

    const isTrusted = trustDevice(mac);

    if (!isTrusted) {
        log("Unable to trust \"" + mac + "\"");
        return false;
    }

    return true;


}

/**
 * trusts the mac address
 * @param {*} mac 
 * @returns true if the trust was successful
 */
function trustDevice(mac) {
    const stdout = execSync("bluetoothctl trust " + mac).toString();
    return lineEndsWith(stdout, "trust succeeded");
}

function removeDevice(mac) {
    if(!isMac){
        return;
    }

    /** remove twice due to bluetoothctl behaviour */
    execSync("bluetoothctl remove " + mac);
    execSync("bluetoothctl remove " + mac);

}


function isMac(mac) {
    const regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
    const parts = mac.split(":");
    return parts.length == 6 && regex.test(mac);
}

class BluetoothDevice {

    constructor(name, mac, paired, connected) {
        this.Name = name;
        this.Mac = mac;
        this.Paired = paired;
        this.Connected = connected;
    }

    static fromDeviceStr(str) {
        const parts = str.split(" ");
        if (parts.length <= 2) {
            return null;
        }

        const mac = parts[1];
        const name = parts.slice(2, parts.length).join(" ");
        return new BluetoothDevice(name, mac, false, false);

    }


    /**
     * 
     * @returns a simple version of the object
     */
    simplify(){
        return { name: this.Name, mac: this.Mac,paired: this.Paired, connected: this.Connected };
    }

}

module.exports = {removeDevice, initBt, scanForDevices, pairAndConnect, BluetoothDevice }