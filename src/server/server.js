const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
const axios = require('axios');
const { get } = require('http');
app.use(cors());
const url = require('url');

app.use(express.static('dist'))

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// let weatherbitUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";    
// let weatherbitLocation = "&"
// let weatherbitAPI = "&key=edcede910dab453eaac6a57b71c10fee";


const getPostCode = async(postcode) => {
    // let postCode = document.getElementById('postcode').value
    let geoLocation = {
        postalcode: postcode,
        maxRows: '10',
        username: 'zyy314jh'
    }

    const params = new url.URLSearchParams(geoLocation);
    let geonames_url = `http://api.geonames.org/postalCodeSearchJSON?${params}`

    let res = await axios.get(geonames_url);

    let data = res.data;

    console.log(data);
    
}


app.get('/getlocation', function(req,res) {
    let postCode = req.body;
    getPostCode(postCode);

})



















let PixabayUrl = "https://pixabay.com/api/?key=24411239-f0d3956c5c614d680d5d68bba&q=yellow+flowers&image_type=photo";

let textapi = 'd57a288445f17aaa352de84954451d29';





