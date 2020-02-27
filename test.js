const mainUrl = "https://swapi.co/api/planets/";
let arrDataPlanets;
let arrDataFilms;

//logic
async function loadAndDrawDataFromAPI(mainUrl)  {
    const res = await getData(mainUrl);

    arrDataPlanets = res.results;

    const arrUrlFilms = searchUrlFilms(arrDataPlanets);
    waitAllPromisesInArray(arrUrlFilms)
        .then(films => editFilmObject(setRelations(films, arrDataPlanets)))
        .then(res => {
            arrDataFilms = res;
            drawHTML(createObjForHMTL(arrDataPlanets, arrDataFilms));
        })
}

//api
async function getData(url) {

    return (fetch(url)
        .then(result => result.json())
        .catch(err => console.log("Fetch is RIP")));
}

function searchUrlFilms(arrDataPlanets) {
    const arrUrlFilms = [];

    arrDataPlanets.forEach( (planet) => {
        planet.films.forEach( (films) => {
            if (!arrUrlFilms.includes(films)) {
                arrUrlFilms.push(films);
            }
        });
    });
    
    return arrUrlFilms;
}

async function waitAllPromisesInArray(arrUrlFilms) {
    const arrDataFilms = [];

    for (let i = 0; i < arrUrlFilms.length; i++) {
        arrDataFilms.push(getData(arrUrlFilms[i]));
    }
    for(let i = 0; i < arrDataFilms.length; i++) {
        await arrDataFilms[i].then(value => arrDataFilms[i] = value);
    }

    return arrDataFilms;
}

function setRelations(films, planets) {
    films.forEach( (item, i) => {
        films[i].idOfPlanets = [];
        planets.forEach( (value) => {
            if(Object.values(value.films).includes(item.url))
                films[i].idOfPlanets.push(value.name);
        })
    })

    return films;
}

function editFilmObject(arrDataFilms) {    // свойства объектов к одинаковому названию для удобного обращения к ним 
    arrDataFilms.map((value, index) => {
        arrDataFilms[index].name = value.title;
        delete arrDataFilms[index].title;
    })

    return arrDataFilms;
}

function createObjForHMTL(planets, films) { // общий объект из планет и фильмов для удобного вывода в html
    let newObj = {};

    planets.map( (value) => {
        newObj[value.name] = [];
    })
    films.map( (item, index) => {
        item.idOfPlanets.map((oneId) => {
            newObj[oneId].push(films[index].name);
        });
    })
    
    return newObj;
}

//view
function drawHTML(objForHTML) {
    let newDiv;
    let newCaption;
    let newParagraph;

    Object.keys(objForHTML).forEach((nameOfPlanet) => {
        newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.setAttribute('id', nameOfPlanet);
        newCaption = document.createElement("h2");
        newCaption.textContent = nameOfPlanet;
        newCaption.classList.add("card-head");
        document.getElementById("content").appendChild(newDiv);
        document.getElementById(nameOfPlanet).appendChild(newCaption);
        objForHTML[nameOfPlanet].forEach((film) => {                     // старт вывода фильмов к планетам
            newParagraph = document.createElement('p');
            newParagraph.textContent = film;
            newParagraph.classList.add("card-column");
            document.getElementById(nameOfPlanet).appendChild(newParagraph).node;
        });
    });
}

loadAndDrawDataFromAPI(mainUrl);