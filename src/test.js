const mainUrl = "https://swapi.co/api/planets/";
let dataPlanets;
let dataFilms;

//logic
async function loadAndDrawDataFromAPI(mainUrl)  {
    getData(mainUrl)
        .then(res =>  {
            dataPlanets = res.results;
            const urlsFilms = searchUrlFilms(dataPlanets);

            waitAllPromisesInArray(urlsFilms)
                .then(films => editPropsOfObject(setRelations(films, dataPlanets)))
                .then(res => {
                    dataFilms = res;
                    drawHTML(dataPlanets);
                    drawHTML(dataFilms);
                });
        })
}

//api
function getData(url) {

    return fetch(url)
        .then(result => result.json())
        .catch(res => console.log("Fetch is RIP"));
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

function setRelations(films, planets) {
    films.forEach( (item, i) => {
        films[i].elementId = [];
        planets.forEach( (value) => {
            if(Object.values(value.films).includes(item.url))
                films[i].elementId.push(value.name);
        })
    })

    return films;
}

function editPropsOfObject(arrDataFilms) {    // свойства объектов к одинаковому названию для удобного обращения к ним 
    const films = arrDataFilms;

    arrDataFilms.map((value, index) => {
        films[index].name = value.title;
        delete films[index].title;
    })

    return films;
}

function drawHTML(data, elemId = ['content']) {
    let newDiv;
    let newTextElem;

    data.map( (value) => {
        
        newDiv = document.createElement("div");
        newTextElem = document.createElement('p');

        if (value.hasOwnProperty("elementId")) {
            elemId = value.elementId;
            newTextElem.classList.add("card-column");
        }
        else {
            newDiv.classList.add("card");
            newTextElem.classList.add("card-head");
        }

        newDiv.setAttribute('id', value.name);
        newTextElem.textContent = value.name;
        newDiv.appendChild(newTextElem);
        elemId.map( (oneId) => {
            document.getElementById(oneId).appendChild(newDiv.cloneNode(true));
        })
    })
}

loadAndDrawDataFromAPI(mainUrl);