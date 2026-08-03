import imageArray from "./image-list.js";

const BACKEND_URL = "https://gartic-phone-ranked-backend.onrender.com"; 

function displayRandomImages() { //choose and display a random gartic phone gif
    const image1 = imageArray[Math.floor(Math.random()*imageArray.length)]; 
    const image2 = imageArray[Math.floor(Math.random()*imageArray.length)];
    document.getElementById('gif-1').src = "assets/gartics/" + image1;
    document.getElementById('gif-2').src = "assets/gartics/" + image2;

    return image1, image2
}

async function vote(num){ //vote and send to the backend to store
    const img1 = document.getElementById('gif-1').src;
    const img2 = document.getElementById('gif-2').src;
    
    const dataToSend = {
        vote: num,
        img1: img1,
        img2: img2
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/receive-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();
        console.log(data);
        displayRandomImages();
        return data;
    } catch (error) {
        console.error('Error: ', error);
    };
};

document.getElementById('stats-link').addEventListener("click", function(event) { //direct to stats page
    event.preventDefault();
    const targetURL = "../../pages/stats.html";
    window.location.href = targetURL;
});

document.getElementById('gartic-files-link').addEventListener("click", function(event) {
    event.preventDefault();
    const targetURL = "../../pages/gartic-files.html";
    window.location.href = targetURL;
})

// event listeners for buttons
document.getElementById('vote-0').addEventListener("click", () => vote(0));
document.getElementById('vote-1').addEventListener("click", () => vote(1));
document.getElementById('vote-2').addEventListener("click", () => vote(2));

displayRandomImages();