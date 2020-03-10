const mainUrl = "https://swapi.co/api/planets/";
let dataPlanets = [];
let dataFilms = [];

//logic

/**
  * Загружает и выводит в HTML данные с API
  * 
  * @param {string} mainUrl API-адрес
  */
function loadAndDrawDataFromAPI(mainUrl)  {
    getData(mainUrl)
        .then(res =>  {
            dataPlanets = res.results;
            const urlsFilms = searchUrlFilms(dataPlanets);
            dataPlanets = addPropsPlanets(dataPlanets);

            waitAllPromisesInArray(urlsFilms)
                .then(films => addPropsFilms(setRelations(films, dataPlanets)))
                .then(res => {
                    dataFilms = res;
                    drawHTML(dataPlanets);
                    drawHTML(dataFilms);
                });
        })
}

import {getData, searchUrlFilms, waitAllPromisesInArray, setRelations, addPropsPlanets, addPropsFilms, drawHTML} from './api.js';
export {loadAndDrawDataFromAPI, mainUrl};