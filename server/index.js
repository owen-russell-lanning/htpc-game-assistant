const express = require("express");
const { scanForDevices, pair, pairAndConnect, initBt, removeDevice } = require("./lib/bluetoothWrapper");
const { setShowLog } = require("./lib/logHandler");
const { BLUETOOTH_ROUTE_PREFIX } = require("./config/routeConstants");
const app = express();
const DEBUG = true;

setShowLog(DEBUG);

const PORT = 8080;

initBt();

app.get('/', (req, res) => {
    res.send('HTPC Game Assistant Server')
})


/** bluetooth routes */
app.get("/" + BLUETOOTH_ROUTE_PREFIX + "/scan", async (req, res) =>{
    const foundDevices = await scanForDevices();
    res.send(foundDevices.map(d => d.simplify()));
});


app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})

