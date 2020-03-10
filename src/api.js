import {drawHTML} from './view.js';

/**
  * Загружает данные с API в промис
  * 
  * @param {string} url API-адрес
  * @return {promise} полученный промис
  */
 function getData(url) {

    return fetch(url)
        .then(result => result.json())
        .catch(res => console.log("Fetch is RIP"));
}

/**
  * Поиск url-адресов фильмов в свойствах планет
  *
  * @param {array} dataPlanets данные планет
  * @return {urlsFilms} массив API-адресов фильмов
  */
function searchUrlFilms(dataPlanets) {
    const urlFilms = [];

    dataPlanets.map( (value) => {
        value.films.forEach( (films) => {
            if (!urlFilms.includes(films)) {
                urlFilms.push(films);
            }
        });
    });
    
    return urlFilms;
}

/** 
  * Загружает данные фильмов с массива API-адресов
  *
  * @param {array} urlsFilms API-адреса фильмов 
  * @return {promise} промис с ответами
  */
function waitAllPromisesInArray(urlsFilms) {
    const dataFilms = [];
    let count;
    
    count = urlsFilms.length - 1;

    return new Promise( (resolve) => {

        for (let i = 0; i < urlsFilms.length; i++) {
            getData(urlsFilms[i])
                .then((res) => {
                    dataFilms.push(res);
                    count === 0 ? resolve(dataFilms) : count--;
                });
        }
    });
}

/**
  * Устанавливает связи фильмов с планетами
  *
  * @param {array} films данные по фильмам
  * @param {array} planets данные по планетам
  * @return {array} измененные данные фильмов
  */
function setRelations(films, planets) {
    let newFilms = [];

    films.forEach( (item, i) => {
        newFilms.push({});
        newFilms[i].elementId = [];
        newFilms[i].title = item.title;
        planets.forEach( (value) => {
            if (Object.values(value.films).includes(item.url))
                newFilms[i].elementId.push(value.name);
        })
    })

    return newFilms;
}

/** 
  * Добавляет новые свойства в планеты для удобного вывода
  *
  * @param {array} dataPlanets данные планет
  * @return {array} отредактированный массив с данными планет
  */
function addPropsPlanets(dataPlanets) {
    let data = [];

    dataPlanets.map( (value, index) => {
        data.push({});
        data[index].name = value.name;
        data[index].elementId = ['content'];
    })

    return data;
}

/** 
  * Добавляет новые свойства в фильмы для удобного вывода
  *
  * @param {array} dataPlanets данные фильмов
  * @return {array} новые данные фильмов
  */
function addPropsFilms(dataFilms) {
    const data = [];

    dataFilms.map((value, index) => {
        data.push({});
        data[index].name = value.title;
        data[index].elementId = value.elementId;
    })

    return data;
}

export {getData, searchUrlFilms, waitAllPromisesInArray, setRelations, addPropsPlanets, addPropsFilms, drawHTML};