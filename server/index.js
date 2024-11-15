const express = require("express");
const { scanForDevices } = require("./lib/bluetooth-wrapper");
const app = express();


const PORT = 8080;


app.get('/', (req, res) => {
    res.send('HTPC Game Assistant Server')
})

scanForDevices().then(() =>{
    app.listen(PORT, () => {
        console.log('server listening on port ' + PORT);
    })
    
})



