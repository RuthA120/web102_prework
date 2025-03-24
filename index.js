/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let index = 0; index < games.length; index++) {
        const gameCard = document.createElement("div"); // create a new div element, which will become the game card
        gameCard.classList.add("game-card"); // add the class game-card to the list
        gameCard.innerHTML = ` 
            <h2>${games[index].name}</h2>
            <p><strong>Description:</strong> ${games[index].description}</p>
            <p><strong>Goal:</strong> ${games[index].goal}</p>
            <img class="game-img" src="${games[index].img}" alt="${games[index].name}">
        `; // set the inner HTML using a template literal to display some info about each game
        gamesContainer.append(gameCard);// append the game to the games-container
    }

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);


// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce ( (total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `<strong>${totalContributions.toLocaleString()}</strong>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmount = GAMES_JSON.reduce ( (total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal

raisedCard.innerHTML = `<strong>$${totalAmount.toLocaleString()}</strong>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<strong>${GAMES_JSON.length}</strong>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let lessThanGoal = GAMES_JSON.filter ((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(lessThanGoal);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let greaterThanGoal = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(greaterThanGoal);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

function setActiveButton(button) {
    document.getElementById("unfunded-btn").classList.remove("active");
    document.getElementById("funded-btn").classList.remove("active");
    document.getElementById("all-btn").classList.remove("active");
    button.classList.add("active");
}

// select each button in the "Our Games" section
document.getElementById("unfunded-btn").addEventListener("click", function() {
    setActiveButton(this);
    filterUnfundedOnly();
});
document.getElementById("funded-btn").addEventListener("click", function() {
    setActiveButton(this);
    filterFundedOnly();
});
document.getElementById("all-btn").addEventListener("click", function() {
    setActiveButton(this);
    showAllGames();
});

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let lessThanGoal = GAMES_JSON.filter ((game) => {
    return game.pledged < game.goal;
});

const numUnfundedGames = lessThanGoal.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $800,268 has been raised for ${GAMES_JSON.length - numUnfundedGames} games. Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game" : "games"} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesText = document.createElement("p");
unfundedGamesText.innerHTML=displayStr;
descriptionContainer.append(unfundedGamesText);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.append(firstGameName);

// do the same for the runner up item
const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.append(secondGameName);




//BONUS FEATURE:
document.querySelector(".search-input").addEventListener("keydown", function(event) {
    if (event.code === "Space" && this.value.trim().length > 0) {
        let searchTerm = this.value.toLowerCase().trim();

        let displayedGames = [];
        
        if (document.getElementById("unfunded-btn").classList.contains("active")) {
            displayedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
        } else if (document.getElementById("funded-btn").classList.contains("active")) {
            displayedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
        } else {
            displayedGames = GAMES_JSON;
        }

        let filteredGames = displayedGames.filter(game => //checking if term is included in any of the games
            game.name.toLowerCase().includes(searchTerm) || 
            game.description.toLowerCase().includes(searchTerm)
        );

        deleteChildElements(gamesContainer);
        addGamesToPage(filteredGames);
    }
});

document.getElementById("raised-text").style.cursor = "pointer";
document.getElementById("raised-text").addEventListener("click", function() {
    for (let i = 0; i < 20; i++) { 
        createFallingMoney();
    }
});

function createFallingMoney() {
    const money = document.createElement("div");
    money.classList.add("falling-money");
    money.innerHTML = "💸"; 
    
    document.body.appendChild(money);

    money.style.left = Math.random() * window.innerWidth + "px";

    setTimeout(() => {
        money.remove();
    }, 3000);
}
