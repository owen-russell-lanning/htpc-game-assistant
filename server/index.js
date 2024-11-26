const express = require("express");
const { scanForDevices, pair, pairAndConnect, initBt, removeDevice, getPairedDevices } = require("./lib/bluetoothWrapper");
const { setShowLog } = require("./lib/logHandler");
const { BLUETOOTH_ROUTE_PREFIX, SHORTCUTS_ROUTE_PREFIX, UI_FOLDER } = require("./config/routeConstants");
const cors = require('cors')
const bodyParser = require('body-parser');
const { openSteamLinkShortcut } = require("./lib/shortcuts");

var args = process.argv.slice(2);
const app = express();
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));

const DEBUG = true;

setShowLog(DEBUG);

const PORT = args.length > 0 && args[0] ? args[0] : 8080;

initBt();

app.use(cors())




/** bluetooth routes */
app.get("/" + BLUETOOTH_ROUTE_PREFIX + "/scan", async (req, res) => {
    const foundDevices = await scanForDevices();
    res.send(foundDevices.map(d => d.simplify()));
});

app.get("/" + BLUETOOTH_ROUTE_PREFIX + "/connect", async (req, res) => {
    const { mac } = req.query;
    const result = await pairAndConnect(mac);
    res.send(result);



});

app.get("/" + BLUETOOTH_ROUTE_PREFIX + "/paired", async (req, res) => {
    const foundDevices = getPairedDevices();
    res.send(foundDevices.map(d => d.simplify()));
});

app.delete("/" + BLUETOOTH_ROUTE_PREFIX + "/paired", jsonParser, async (req, res) => {
    if (!req.body.mac) {
        res.sendStatus(400);
        return;
    }

    const mac = req.body.mac;
    removeDevice(mac);
    res.sendStatus(200);
});


/** shortcuts route */

app.post("/" + SHORTCUTS_ROUTE_PREFIX + "/steamlink", async (req,res) =>{
    openSteamLinkShortcut();
    res.sendStatus(200);
});

/**
 *  ui
 */
app.use(express.static(UI_FOLDER))


app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})
