function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Fill feedback if there's any
const url = window.location.href;
const parameterStartIndex = url.indexOf('?');
if (parameterStartIndex !== -1) {
    const queryString = url.slice(parameterStartIndex + 1);
    const parameters = queryString.split('&');
    if (parameters.length > 0) {
        for (let i = 0; i < parameters.length; i++) {
            const param = parameters[i];
            const parameterParts = param.split('=');
            if (parameterParts.length === 2) {
                var parameterName = decodeURIComponent(parameterParts[0]);
                var parameterValue = decodeURIComponent(parameterParts[1]);
                if (parameterName === "feedback") {
                    var pTag = document.getElementById("feedback");
                    pTag.textContent = parameterValue;
                    pTag.style.color = "red";
                }
            }
        }
    }
}

const correctPlanets = [];

const planets = shuffle(["mercury", "venus", "mars", "earth", "jupiter", "saturn", "uranus", "neptune"]);
console.log("Planets: ", planets);

// Set the planet image to new planet
let curPlanet = planets[correctPlanets.length];
const image = document.getElementById("planetImage");
var newSource = "/images/" + curPlanet + ".png";
image.src = newSource;

function answerSubmitted(event) {
    event.preventDefault();
    curPlanet = planets[correctPlanets.length];

    // Get the selected option
    const select = document.getElementById("quizSelect");
    const selectedOption = select.options[select.selectedIndex].value;

    if (curPlanet != selectedOption) {
        document.location = "/quiz?feedback=Sorry%20you%20got%20it%20wrong...%20try%20again!"
    } else {
        correctPlanets.push(curPlanet);
    }

    if (correctPlanets.length === planets.length) {
        // :eyes:
        document.location = "/hereisyourflag"
    }

    // Set the planet image to new planet
    curPlanet = planets[correctPlanets.length];
    const image = document.getElementById("planetImage");
    var newSource = "/images/" + curPlanet + ".png";
    image.src = newSource;

    var pTag = document.getElementById("feedback");
    pTag.textContent = `Correct: ${correctPlanets.length}/${planets.length}`;
    pTag.style.color = "green";
    return false;
}

document.getElementById("planetQuiz").addEventListener("submit", answerSubmitted);