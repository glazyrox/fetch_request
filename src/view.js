/** 
  * Вывод HTML
  * 
  * @param {array} data данные для вывода в HTML
  */
 function drawHTML(data) {
    let newDiv;
    let newTextElem;

    data.map( (value) => {
        newDiv = document.createElement("div");
        newTextElem = document.createElement('p');
        newDiv.setAttribute('id', value.name);
        newTextElem.textContent = value.name;
        newDiv.appendChild(newTextElem);
        
        if (value.elementId[0] === 'content') {
            newDiv.classList = 'card';
            newTextElem.classList = 'card-head';
        }
        else {
            newTextElem.classList = 'card-column';
        }

        value.elementId.map( (oneId) => {
            document.getElementById(oneId).appendChild(newDiv.cloneNode(true));
        })
    })
}

export {drawHTML};