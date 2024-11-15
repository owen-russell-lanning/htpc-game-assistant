const express = require("express");
const app = express();


const PORT = 8080;


app.get('/', (req, res) => {
    res.send('HTPC Game Assistant Server')
})

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})