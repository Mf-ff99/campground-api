//Provide input for a state
//on click send input to api query
//return an block with the full name, description, 
//and website URL of park
//Empty the results before returning each search
//add the park's addy?

//set api

import $ from 'jquery';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'F6Z16N8rA9t1U9dLlEmZ5bWhVdYV8jaz5JYijKTh';


let formatQueryParams = function(params) {
    const queryItems = Object.keys(params)
        .map (key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

let watchForm = function() {
    $('form').submit(event => {
        event.preventDefault();
        let userPark = $('input[name=userInput').val();
        let userSearch = $('input[name=userSearch]').val();
        console.log(userPark, userSearch)
        getParks(userPark, userSearch) ;
    });
};


let getParks = function(userPark, userSearch) {
    const params = {
        limit: userSearch,
        q: userPark,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    let url = searchURL + '?' + queryString;
    console.log(url)

    fetch(url)
        .then(response => response.json())
            // throw new Error(response.statusText
        .then(responseJson => displayResults(responseJson))
        .catch(error => console.log(error));
}

let displayResults = function (responseJson) {
    $('.results').empty();
    for (let i=0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i])
        $('.results').append(`<div class='jsonResponse'>${responseJson.data[i].fullName}<p>${responseJson.data[i].description}</p><p>${responseJson.data[i].directionsUrl}</div>`)
    }
}

$(watchForm);