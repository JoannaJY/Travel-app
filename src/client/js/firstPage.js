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
    let base = 'http://localhost:8080'
    console.log(data);
    const response = await axios.post(base + url, {
        // method:'post',
        credential: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
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
}


export { generateContent }