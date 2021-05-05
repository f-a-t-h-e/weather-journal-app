/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



const generate = document.getElementById('generate');
const feeling = document.getElementById('feelings');
const zip = document.getElementById("zip");


const apiKey = 'd5e41c437ec0f588b7735fe5c9f0f6ed';

generate.addEventListener('click', () => { doIt() });

function doIt() {
    if (zip.value) {
        if (feeling.value) {
            // console.log('yup');
            let feelings = feeling.value;
            sendToApi('http://api.openweathermap.org/data/2.5/weather?zip=' + zip.value + ',us&units=metric&appid=' + apiKey)
                .then(function(data) {
                    let temp = data.main.temp;
                    // console.log(data);
                    // console.log('yesss');
                    postData('/sendapi', { zipcode: zip.value, feelings: feelings, temp: temp });
                    updateUI()
                })
                // console.log('http://api.openweathermap.org/data/2.5/weather?zip=' + zip.value + ',us&units=metric&appid=' + apiKey);
        } else {
            alert('please enter your feelings')
        }
    } else {
        alert('please enter zip code')
    }


}

const sendToApi = async(url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log(data);
        // console.log('hi from api')
        return data
    } catch (error) {
        console.log('error', error);
    }
}


const updateUI = async() => {
    const req = await fetch('/apdateui');
    try {
        const lastData = await req.json();
        // console.log('hereeee');
        // console.log(lastData);
        const entryHolder = document.getElementById('entryHolder');
        entryHolder.innerHTML = 'Date : ' + newDate + '<br>' + 'Your feelings : ' + lastData.feelings + '<br>' + 'Tempreture : ' + lastData.temp;
    } catch (error) {
        console.log('error', error);
    }
}

// the postRequest that will send user inputs
const postData = async(url = '', data = {}) => {
    // console.log(data)
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const data = await res.json();
        // console.log(data);
        return data
    } catch (error) {
        console.log("error", error);
    }
};