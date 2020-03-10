import {getData, searchUrlFilms, waitAllPromisesInArray, setRelations, addPropsPlanets, addPropsFilms, drawHTML} from './api.js';

const mainUrl = "https://swapi.co/api/planets/";
//logic

/**
  * Загружает и выводит в HTML данные с API
  * 
  * @param {string} mainUrl API-адрес
  */
function loadAndDrawDataFromAPI(mainUrl)  {
    getData(mainUrl)
        .then(res =>  {
            let dataPlanets = res.results;
            const urlsFilms = searchUrlFilms(dataPlanets);
            let toDrawPlanets = addPropsPlanets(dataPlanets);

            waitAllPromisesInArray(urlsFilms)
                .then(films => addPropsFilms(setRelations(films, dataPlanets)))
                .then(dataFilms => {
                    drawHTML(toDrawPlanets);
                    drawHTML(dataFilms);
                });
        })
}

export {loadAndDrawDataFromAPI, mainUrl};