const BACKEND_URL = "https://gartic-phone-ranked-backend.onrender.com"; 

async function requestStatistics(filter, limit) { 
    const dataToSend = {
        filter: filter,
        limit: Number(limit)
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/receive-stat-request`, { //request stats from backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error)
    }
};

async function clearStatistics() { //request to backend to clear stats
    try {
        const response = await fetch(`${BACKEND_URL}/api/clear-stats`, {
            method: 'POST',
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error)
    }
};

function structureStatistics(data) { //structure in the html file
    console.log(data);
    const container = document.getElementById('results-container');
    for (let i = 0; i < data.length; i++) { //each image print image and stat
        const div = document.createElement("div");
        div.classList.add('gartic-container');
        div.innerHTML = `
            <img src="${data[i]["image"]}">
            <p>${data[i]['extra'][0]}${data[i]["value"]}${data[i]['extra'][1]}</p>
        `;
        container.appendChild(div);
    };
};

document.getElementById('index-link').addEventListener("click", function(event) { //go back to index
    event.preventDefault();
    const targetURL = "../../index.html";
    window.location.href = targetURL;
});

document.getElementById('display-stats').addEventListener("click", async function(event) { //display statistics
    document.getElementById('results-container').innerHTML = ''; //clear display

    const filterElement = document.getElementById('filter');
    const filter = filterElement.selectedOptions[0]['value'];
    const limit = document.getElementById('limit').value;
    
    const stats = await requestStatistics(filter, limit); 
    structureStatistics(stats); //structure on html page
})

console.log(window.location.origin);