const express = require('express');
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')

const url = 'https://dev.fractal-it.fr:84453/fake_health_test?dynamic=true';



// FUNCTION FOR WATCHING URL
let message;

function urlWatcher() {  
    return new Promise((resolve, reject) => {
          request(url, (error, response) => {
            if (!error) {
                message = `Success: status is ${response.statusMessage}`;   
                resolve(message)             
            } else {
                message = `Error : status is ${error.statusMessage}`;  
                resolve(message)                    
            }
        })      
    }) 
}




// APP MAIN ROUTE
app.get('/', (req, res) => {
    res.render('home');    
})


// WATCHING URL ROUTE
app.post('/watching',(req, res) => {
    setInterval(urlWatcher, 3000);
    async function getThisPromise() {
        message = await urlWatcher()
    };    
    res.render('watch', {url: url, urlStatus: message });
})


// APP LISTENNING PORT
const PORT = 8080;
app.listen(PORT, () => console.log(`listenning on port ${PORT}`))