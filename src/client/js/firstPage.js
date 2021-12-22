import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";

document.addEventListener('DOMContentLoaded', function () {
    let button = document.getElementById('search');
    button.addEventListener('click', generateContent);
});


function generateContent(){
    console.log('clicked');
    let destinationtext = document.getElementById('destination').value;
// Check destination entre vaild or not
    function checkContentLength(inputText) {
          if(destinationtext.length <=3 ) {
              alert("Please enter a vaild postcode.")
          }
      }
    checkContentLength(destinationtext)

    let colour = "#ADC2A9";
    document.getElementById('change-colour').style.backgroundColor = colour;


    if ( destinationtext !=''){
        getLocation ('/getLocation', destinationtext, updateUI);
    }else {
        return "Please enter your accurate destination!"
    }
}
// post destination data to server side
const getLocation = async (url, data, callback) => {
    let base = 'http://localhost:8081'
    console.log(data);
    let d = {"location":data}
    const response = await axios.post(base + url, {
        credential: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: d,
    })
    .then((response) => {
        callback(response.data);
        console.log(response.data);
    },(error) => {
        console.log('error', error);
    });
}

function updateUI (data) {
    let destext = document.getElementById('destination').value;
// Update UI weather data and image
    document.getElementById('temperature').innerHTML = `<p> ${destext} Temperature: ${data[0].temperature} </P>`;
    document.getElementById('wind').innerHTML = `<p> ${destext} Wind: ${data[0].wind} </p>`;
    document.getElementById('cloud').innerHTML = `<p> ${destext} Cloud: ${data[0].cloud} </p>`;
    document.getElementById('image').src = data[1];
    document.getElementById('plan').innerHTML = `<h3> Travel Planner </h3>`;
// Dynamic changes to front end 
    let appearLocation = document.createElement('div');
    let appearDate = document.createElement('div');
    appearLocation.className = "appear-location";
    appearDate.className = "appear-date";
    let departing = document.getElementById('my-depart-date').value;
    appearLocation.innerHTML = `<p> My trip to: ${destext}`;
    appearDate.innerHTML = `<p> Departing: ${departing}`; 
    const updateText = document.getElementById('res');
    updateText.appendChild(appearLocation);
    updateText.appendChild(appearDate);
    // Show trip length and how many days away
    let countDown = setInterval(function() {
        let departDate = new Date(document.getElementById('my-depart-date').value).getTime();
        let returnDate = new Date(document.getElementById('my-return-date').value).getTime();
        let now = new Date().getTime();

        let distanceDepart = departDate - now;
        let tripLast = returnDate - departDate;


        let days = Math.floor(distanceDepart / (1000 * 60 * 60 * 24));
        let lastDays = Math.floor(tripLast / (1000 * 60 * 60 * 24));

         document.getElementById("countdown").innerHTML = "My trip is " + days + " days away ";
         document.getElementById("triplast").innerHTML = "My trip lasts " + lastDays + " days " + ", Wish you a pleasant journey!";
      
         if (distanceDepart < 0) {
           clearInterval(countDown);
         document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);

}

     

export { generateContent }