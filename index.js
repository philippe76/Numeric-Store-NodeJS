const express = require('express');
const request = require('request');

const app = express();
const port = 8080;




const urlWatcher = (req, res) => {  
  request('https://dev.fractal-it.fr:8443/fake_health_test?dynamic=true   ', (error, response) => {
    if (!error && response.statusCode == 200) {
        message = `status is ${response.statusMessage}`;
        details = JSON.stringify(response, null, 2);
    } else {
        message = `Error : status is ${response.statusMessage}`;
        details = JSON.stringify(response, null, 2);
    }
    console.log(message);
    console.log(details);
  })
 
};

const dynamicWatcher = setInterval(urlWatcher, 3000)



app.get('/', (req, res) => {
    dynamicWatcher()
    res.status(200).json({message: 'Watching URL'})
})


app.listen(port, () => console.log(`listenning on port ${port}`))