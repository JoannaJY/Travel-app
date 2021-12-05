
document.addEventListener('DOMContentLoaded', function () {
    let destination = document.getElementById('destination');
    destination.addEventListener('keyup', generateContent);
});


function generateContent(){
    console.log('clicked');
    let destinationtext = document.getElementById('destination').value;

    function checkContentLength(inputText) {
          if(destinationtext.length <=4 ) {
              alert("Please enter a vaild postcode.")
          }
      }
    checkContentLength(destinationtext)
    if ( destinationtext !=''){
        getDropdown ('/get-drop-down', destinationtext, updateDropDown);
    }else {
        return "Please enter your postcode!"
    }
}

const getDropdown = async (url, data, callback) => {
    let base = 'http://localhost:8080'
    console.log(data);
    const response = await fetch(base + url, {
        method:'get',
        credential: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const results = await response.json();
        console.log(results);
        callback(results);
       
    } catch(error) {
        console.log('error', error);
    }
}

// function updateDropDown (data) {
//     document.getElementById('destination-1').innerHTML = `<p> ${data.agreement} </P>`;
//     document.getElementById('destination-2').innerHTML = `<p> ${data.subjectivity} </p>`;
//     document.getElementById('destination-3').innerHTML = `<p> ${data.confidence} </p>`;
// }


export { generateContent }