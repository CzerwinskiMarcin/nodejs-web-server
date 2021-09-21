const form = document.getElementById('weather_form');
const resultElement = document.getElementById('weather_result');
const resultContainer = document.getElementById('result_container');

form.onsubmit = () => {
    return false;
}
console.log(form);

function getData() {
    showLoader();
    const location = document.getElementById('location').value;

    fetch(`/weather?location=${location}`).then(response => {
        response.json().then(data => {
            removeLoader();
            writeResult(JSON.stringify(data));
        });
    });
}

function showLoader() {
    resultElement.innerHTML = '';
    const loader = document.createElement('p');
    loader.id = 'loader';
    loader.innerText = 'Loading...';

    resultContainer.append(loader);
}

function removeLoader() {
    const loader = document.getElementById('loader');
    resultContainer.removeChild(loader);
}

function writeResult(result) {
    const p = document.createElement('p');
    p.innerText = result;

    resultElement.innerHTML = '';

    resultElement.append(p);
}
