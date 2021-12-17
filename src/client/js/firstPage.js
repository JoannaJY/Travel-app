import axios from "axios";

document.addEventListener('DOMContentLoaded', function () {
    let button = document.getElementById('search');
    button.addEventListener('click', generateContent);
});


function generateContent(){
    console.log('clicked');
    let destinationtext = document.getElementById('destination').value;

    function checkContentLength(inputText) {
          if(destinationtext.length <=3 ) {
              alert("Please enter a vaild postcode.")
          }
      }
    checkContentLength(destinationtext)
    if ( destinationtext !=''){
        getLocation ('/getLocation', destinationtext, updateUI);
    }else {
        return "Please enter your accurate destination!"
    }
}

const getLocation = async (url, data, callback) => {
    let base = 'http://localhost:5000'
    console.log(data);
    let d = {"location":data}
    const response = await axios.post(base + url, {
        // method:'post',
        credential: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: d,
    })
    .then((response) => {
        callback(response.data);
    },(error) => {
        console.log('error', error);
    });
}

function updateUI (data) {

    document.getElementById('temperature').innerHTML = `<p> Temperature: ${data.temperature} </P>`;
    document.getElementById('wind').innerHTML = `<p> Wind: ${data.wind} </p>`;
    document.getElementById('cloud').innerHTML = `<p> Cloud: ${data.cloud} </p>`;


    let countDown = setInterval(function() {
        let departDate = new Date(document.getElementById('my-depart-date').value).getTime();
        let now = new Date().getTime();

        let distance = departDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));

         document.getElementById("countdown").innerHTML = "My trip is " + days + " days away ";
      
         if (distance < 0) {
           clearInterval(countDown);
         document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);

}

     

export { generateContent }