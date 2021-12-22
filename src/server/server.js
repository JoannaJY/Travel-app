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
const regenerator = require('regenerator-runtime');

app.use(express.static('dist'));

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Get Geonames lng, lat and name for Weatherbit
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
    let geonamesName = res.data.geonames[0].name;

    console.log(geonameslng)
    console.log(geonameslat)

    console.log(geonamesName)

    let results = await getWeather(geonameslng, geonameslat);
    let image = await getLocationImage(geonamesName);
    console.log(results);
    return [results,image];
}
// Get Weatherbit destination weather data and return
const getWeather = async(lng, lat) => {

    let weatherbitUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";    
    let weatherbitLocation = `&lat=${lat}&lon=${lng}`;
    let weatherbitAPI = "&key=edcede910dab453eaac6a57b71c10fee";
    
    let weatherbit_url = weatherbitUrl + weatherbitLocation + weatherbitAPI;
    console.log(weatherbit_url)

    let response = await axios.post(weatherbit_url);
    
        let weatherResults ={
           "temperature": response.data.data[12].temp,
           "wind": response.data.data[12].wind_spd,
           "cloud": response.data.data[12].clouds,

        }
        console.log(weatherResults);

        return weatherResults;

}

// Get Pixabay destination image and return 
const getLocationImage = async(locationName) => {

    let pixabayUrl = "https://pixabay.com/api/?key=24411239-f0d3956c5c614d680d5d68bba";
    let pixabayLocation = `&q=${locationName}&image_type=photo`;
    
    let pixabay_url = pixabayUrl + pixabayLocation;
    console.log(pixabay_url)

    let imageResponse = await axios.post(pixabay_url);
    
        let locationImage = imageResponse.data.hits[0].previewURL;
        

        return locationImage;

}
app.post('/getLocation', function(req,res) {
    let location = req.body.body.location;
    getData(location)
    .then(updateUIWeather = async(data) => {
        return res.send(data);
    }); 
})

























