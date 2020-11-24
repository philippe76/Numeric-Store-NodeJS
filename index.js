const express = require('express');
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')


// FUNCTION TO WATCH URL
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

// REPEAT REGULARLY FUNCTION CALL    
// const dynamicWatcher = setInterval(urlWatcher, 3000)


// APP MAIN ROUTE
app.get('/', (req, res) => {
    // dynamicWatcher()
    // res.status(200).json({message: 'Watching URL'});
    res.render('home');
})

app.post('/watching',(req, res) => {
    res.render('watch');
})


// APP LISTENNING PORT
const PORT = 8080;
app.listen(PORT, () => console.log(`listenning on port ${PORT}`))