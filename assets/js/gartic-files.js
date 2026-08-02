import imageArray from "./image-list.js";

const BACKEND_URL = "https://gartic-phone-ranked-backend.onrender.com"; 

async function requestGarticFiles() { //get all gartic phones that have appeared ever
    try {
        const response = await fetch(`${BACKEND_URL}/receive-gartic-files`, {
            method: 'POST',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

function structureFiles(files) { //structure gartic files
    const fileArray = Array.from(files);
    const parentContainer = document.getElementById('gartic-files-container'); 
    for (const image of fileArray) {
        const garticContainer = document.createElement('div');
        garticContainer.classList.add('gartic-files-object');
        garticContainer.innerHTML = `
        <img src="${image}">
        <p>${image}</p>
        `;
        parentContainer.appendChild(garticContainer);
    };
};

document.getElementById('index-link').addEventListener("click", function(event) { //go back to index
    event.preventDefault();
    const targetURL = "./";
    window.location.href = targetURL;
});

const files = await requestGarticFiles();
structureFiles(files);
