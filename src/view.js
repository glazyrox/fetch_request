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
        newDiv.classList = value.class;
        value.elementId.map( (oneId) => {
            document.getElementById(oneId).appendChild(newDiv.cloneNode(true));
        })
    })
}

export {drawHTML};