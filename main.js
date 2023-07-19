"use strict"


function createColorBox(color)
{
    let colorBox = document.createElement("div");
    colorBox.classList.add("figColor");
    if(color.type === "HEX")
        colorBox.style.backgroundColor = color.code;
    else if(color.type === "RGB")
        colorBox.style.backgroundColor = `rgb(${color.code})`;
    else if(color.type === "RGBA")
        colorBox.style.backgroundColor = `rgba(${color.code})`;

    let colorBoxInfo = document.createElement("div");
    colorBoxInfo.classList.add("figColorInfo");

    let textBox = document.createElement("div");
    textBox.classList.add("text");
    textBox.innerHTML = "<samp>" + color.name.toUpperCase() + "</samp>" + "<samp>" + color.type + "</samp>" + "<samp>" + color.code + "</samp>";

    colorBoxInfo.appendChild(textBox);
    colorBox.appendChild(colorBoxInfo);

    return colorBox;
}

let btnSave = document.querySelector("#btnSave");

btnSave.addEventListener("click", event =>{
    event.preventDefault();

    let name = document.createColor.color.value.trim();
    let type = document.createColor.type.value.trim();
    let code = document.createColor.code.value.trim();
    let colorNameError = document.querySelector("#colorNameError");
    let colorCodeError = document.querySelector("#colorCodeError");

    let isValid = true;
    if (!/^[A-Za-zА-Яа-я]+$/.test(name)) 
    {
        colorNameError.textContent = "Название должно состоять  букв";
        isValid = false;
    }
    const colors = getSavedColors();
        const existingColor = colors.find(color => color.name.toLowerCase() === name.toLowerCase());
        if (existingColor) 
        {
            colorNameError.textContent = "Цвет уже существует";
            isValid = false;
        }
    if (type === "RGB") 
    {
        if (!/^(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*){2}\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*$/.test(code)) {
            colorCodeError.textContent = "Некорректный формат RGB кода";
            isValid = false;
            }
    } 
    else if (type === "RGBA") 
    {
        if (!/^(\s*(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\s*,\s*){3}\s*(?:1(?:\.0+)?|0(?:\.[0-9]+)?)\s*$/.test(code)) 
        {
        colorCodeError.textContent = "Некорректный формат RGBA кода";
        isValid = false;
        }
    } 
    else if (type === "HEX")
    {
        if (!/^#[0-9A-Fa-f]{6}$/.test(code)) 
        {
            colorCodeError.textContent = "Некорректный формат HEX кода";
            isValid = false;
        }
    }

    if (!isValid) 
        return;

    let color = {
        name: name,
        type: type,
        code: code
    };

    colors.push(color);
    saveColors(colors);

    document.createColor.color.value = "";
    document.createColor.code.value = "";

    
    displayColors();
    
});

function saveColors(colors) 
{
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (3 * 60 * 60 * 1000)); 

    document.cookie = `colors=${JSON.stringify(colors)}; expires=${expirationDate.toUTCString()}`;
}

function getSavedColors() 
{
    const cookies = document.cookie.split(";");

    const colorsCookie = cookies.find(cookie => cookie.trim().startsWith("colors="));
    if (colorsCookie) {
        const colorsString = colorsCookie.trim().split("=")[1];
        return JSON.parse(colorsString);
    }

    return [];
}


function displayColors() 
{
    const colorList = document.querySelector("#colorsCollect");
    colorList.innerHTML = "";

    const colors = getSavedColors();

    colors.forEach(color => {
        let ColorBox = createColorBox(color);
        colorList.appendChild(ColorBox);
    });
}

window.addEventListener("load", function () {
    displayColors();
});