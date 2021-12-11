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
// const { response } = require('express');

app.use(express.static('dist'));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


const getData = async(data) => {
    let geoLocation = {
        q: data,
        maxRows: '10',
        username: 'zyy314jh'
    }
    
    const params = new url.URLSearchParams(geoLocation);
    let geonames_url = `http://api.geonames.org/searchJSON?${params}`

    let res = await axios.post(geonames_url);

    let geonameslng = res.data.geonames[0].lng;
    let geonameslat = res.data.geonames[0].lat;

    let results = await getWeather(geonameslng, geonameslat);
    console.log(results);
    return results;
}

const getWeather = async(lng, lat) => {

    let weatherbitUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";    
    let weatherbitLocation = `&lat=${lat}&lon=${lng}`;
    let weatherbitAPI = "&key=edcede910dab453eaac6a57b71c10fee";
    
    let weatherbit_url = weatherbitUrl + weatherbitLocation + weatherbitAPI;
    console.log(weatherbit_url)

    let response = await axios.post(weatherbit_url);
    
        let weatherResults ={
           "temperature": response.data.data[0].temp,
           "wind": response.data.data[0].wind_spd,
           "cloud": response.data.data[0].clouds,

        }
        console.log(weatherResults);

        return weatherResults;

}
app.post('/getLocation', function(req,res) {
    let location = req.body;
    getData(location)
    .then(updateUIWeather = async(data) => {
        return res.send(data);
    }); 
})

















// let PixabayUrl = "https://pixabay.com/api/?key=24411239-f0d3956c5c614d680d5d68bba&q=yellow+flowers&image_type=photo";







