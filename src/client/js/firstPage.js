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
        getLocation ('/getLocation', destinationtext);
    }else {
        return "Please enter your accurate destination!"
    }
}

const getLocation = async (url, data) => {
    let base = 'http://localhost:8080'
    console.log(data);
    const response = await axios.post(base + url, {
        // method:'post',
        credential: 'same-origin',
        // headers:{
        //     'content-type': 'application/json',
        // },
        body: JSON.stringify(data),
    })
    .then((response) => {
        updateUI(response);
    },(error) => {
        console.log('error', error);
    });
}

// function updateDropDown (data) {
//     document.getElementById('destination-1').innerHTML = `<p> ${data.agreement} </P>`;
//     document.getElementById('destination-2').innerHTML = `<p> ${data.subjectivity} </p>`;
//     document.getElementById('destination-3').innerHTML = `<p> ${data.confidence} </p>`;
// }


export { generateContent }