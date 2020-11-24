const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({message: 'OK'})
})

app.listen(port, () => console.log(`listenning on port ${port}`))