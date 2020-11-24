const express = require('express');
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs')


// FUNCTION TO WATCH URL
const watchedUrl = 'https://dev.fractal-it.fr:8443d/fake_health_test?dynamic=true';


// PROMISE TO CATCH URLWATCHER RESULT

/**
 * JE N'ARRIVE PAS A RECUPERER LE RESULTAT DE LA PROMISE POUR L'AFFICHER 
 */


// const urlWatcher = () => {  

//     return new Promise((resolve, reject) =>{
//         let result = '';
//         request(watchedUrl, (error, response) => {
//             if (!error && response.statusCode == 200) {
//                 message = `status is ${response.statusMessage}`;
//                 details = JSON.stringify(response, null, 2);
//                 result = message
//             } else {
//                 message = `Error : status is ${response.statusMessage}`;
//                 details = JSON.stringify(response, null, 2);
//                 result = message
//             }
//             console.log(message);
//             console.log(details);
//           })

//           resolve(result)        
//     }) 
// }

const urlWatcher = (req, res) => {  
  request(watchedUrl, (error, response) => {
    if (!error && response.statusCode == 200) {
        message = `status is ${response.statusMessage}`;
        details = JSON.stringify(response, null, 2);
    } else {
        message = `Error : status is ${response.statusMessage}`;
        details = JSON.stringify(response, null, 2);
        console.log(message);
        console.log(details);
    }
  })
 
};


// REPEAT REGULARLY FUNCTION CALL    
// const dynamicWatcher = setInterval(urlWatcher, 3000)


// APP MAIN ROUTE
app.get('/', (req, res) => {
    res.render('home');
})


// WATCHING URL ROUTE
app.post('/watching',(req, res) => {

//   const getStatus = async function() {
//       let result = await urlWatcher();
//   }  
//   console.log(getStatus()); 

    setInterval(urlWatcher, 3000)
    res.render('watch', {url: watchedUrl, statusUrl: urlWatcher.statusCode });
})


// APP LISTENNING PORT
const PORT = 8080;
app.listen(PORT, () => console.log(`listenning on port ${PORT}`))