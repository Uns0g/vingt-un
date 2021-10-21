const cardEl = [
    { icon: './img/a-letter.png' },
    { icon: './img/two.png' },
    { icon: './img/three.png' },
    { icon: './img/four.png' },
    { icon: './img/five.png' },
    { icon: './img/king.png' }
];

// CARD RELATED
const cards = [1, 2, 3, 4, 5, 10];
let playerCards = [];
let aiCards = [];
let tableCards = [];

// NUMERICAL VARIABLES
let pWinsCounter = 0;
let aiWinsCounter = 0;

// ABOVE THE LIMIT
let isAboveLimit = false;

// DOCUMENT CONSTANTS

// Bets & Wins
const pWins = document.getElementById('player-wins'); pWins.innerText = pWinsCounter;
const aiWins = document.getElementById('ai-wins'); aiWins.innerText = aiWinsCounter;
// const pBet = document.getElementById('player__bet');
// const aiBet = document.getElementById('ai__bet');

// Cards Containers
const tableCtn = document.querySelector('.table__cards-container');
const playerCtn = document.getElementById('player__cards-container');
const aiCtn = document.getElementById('ai__cards-container');

// Player Actions Buttons
const hitBtn = document.getElementById('button__hit');
const stayBtn = document.getElementById('button__stay');
const surrenderBtn = document.getElementById('button__surrender');

/* Se os dois jogadores excederem o limite de pescas e o valor de suas cartas for menor que 21
o que tiver mais próximo de 21 é o ganhador*/

function start() {
    for (let i = 0; i < 3; i++) { // dealing cards to the players
        let position = Math.floor(Math.random() * cards.length);
        playerCards.push(cards[position]);
        generatePlayerCard(position);
        aiCards.push(cards[Math.floor(Math.random() * cards.length)]);
        aiCtn.innerHTML +=
            `<div class="card card--hidden"> <div class="card__header"></div> <div class="card__body"></div> <div class="card__footer"></div>
        </div>`;
    }
    for (let i = 0; i < 10; i++) { // dealing cards to the table
        tableCards[i] = cards[Math.floor(Math.random() * cards.length)];
        tableCtn.innerHTML =
            `<div class="card card--hidden"> <div class="card__header"></div> <div class="card__body"></div> <div class="card__footer"></div>
        </div>`; // there is no position 0 or 10
    }
    checkCardsValue(getTotal(playerCards), getTotal(aiCards));
}
start();
function getTotal(cardType) { return cardType.reduce((n1, n2) => n1 + n2); }

// COMMANDS
// A var to see the total value of the cards on console
var sctv = function seeCardsTotalValue() {
    console.log('P: ' + getTotal(playerCards) + ' | AI: ' + getTotal(aiCards));
}
// a var to see the total value of the cards of the player 
var gtP = getTotal(playerCards);
var gtAI = getTotal(aiCards);

// BUTTON FUNCTIONS
hitBtn.addEventListener('click', playerTurn);
stayBtn.addEventListener('click', () => { if (getTotal(playerCards) > 17) { isAboveLimit = true; } aiTurn(); });
surrenderBtn.addEventListener('click', () => { aiWon(); });

// TURNS
function playerTurn() {
    if (getTotal(playerCards) < 17) {
        if (tableCards[tableCards.length - 1] == 10) {
            generatePlayerCard((tableCards[tableCards.length - 1]) / 2); // or simply five
        }
        else {
            // there is a 0 position in cardEl but there isn't a 0 value in tableCards
            generatePlayerCard((tableCards[tableCards.length - 1]) - 1);
        }
        playerCards.unshift(tableCards[tableCards.length - 1]);
        tableCards.pop();
        setTimeout(aiTurn, 1000);
    }
    else if (playerCards.length >= 8){
        alert('You cannot pick up any more cards!')
        isAboveLimit = true;
        setTimeout(aiTurn, 1000);
    }
    else {
        alert("You cannot pick up another card, when the total value of your cards is 17 or greater!");
        isAboveLimit = true;
        setTimeout(aiTurn, 1000);
    }
}
function aiTurn() {
    if (getTotal(aiCards) < 17) {
        aiCtn.innerHTML += `<div class="card card--hidden"> <div class="card__header"></div> <div class="card__body"></div> <div class="card__footer"></div>
        </div>`;
        aiCards.unshift(tableCards[tableCards.length - 1]);
        tableCards.pop();
    }
    else if(aiCards.length >= 8){
        checkClosestToTwentyOne(21 - getTotal(playerCards), 21 - getTotal(aiCards));
    }
    else if (getTotal(aiCards) >= 17 && isAboveLimit == false) { alert('The AI stays!'); }
    else if (getTotal(aiCards) >= 17 && isAboveLimit == true) {
        checkClosestToTwentyOne(21 - getTotal(playerCards), 21 - getTotal(aiCards));
    }
    checkCardsValue(getTotal(playerCards), getTotal(aiCards));
}

function generatePlayerCard(arrayPos) {
    playerCtn.innerHTML +=
        `<div class="card">
            <div class="card__header">
                <img src="${cardEl[arrayPos].icon}"/> 
            </div>
            <div class="card__body">
                <img src="${cardEl[arrayPos].icon}"/>   
            </div>
            <div class="card__footer">
                <img src="${cardEl[arrayPos].icon}"/>
            </div>
        </div>`;
}

// Just to skip writing the same pieces of code
function playerWon() {
    alert('Player Won! \nP: ' + getTotal(playerCards) + ' | AI: ' + getTotal(aiCards));
    pWinsCounter++; pWins.innerText = pWinsCounter;
    endGame();
}
function aiWon() {
    alert('AI Won! \nP: ' + getTotal(playerCards) + ' | AI: ' + getTotal(aiCards));
    aiWinsCounter++; aiWins.innerText = aiWinsCounter;
    endGame();
}

function checkCardsValue(totalPlayer, totalAI) {
    if (totalPlayer == 21 || totalAI > 21) { playerWon(); }
    else if (totalPlayer > 21 || totalAI == 21) { aiWon(); }
    else if (totalPlayer == totalAI) { console.log('DRAW'); }
    else { console.log('PASS!'); }
}

function checkClosestToTwentyOne(playerDifference, aiDifference) {
    if (playerDifference >= 0 && playerDifference < aiDifference) { playerWon(); }
    else if (playerDifference > 0 && playerDifference > aiDifference) { aiWon(); }
    else if (playerDifference < 0 || aiDifference < 0) {
        if (playerDifference > aiDifference) { playerWon(); }
        else if (playerDifference < aiDifference) { aiWon(); }
        else { alert('Draw!'); endGame(); }
    }
    else { alert('Draw!'); endGame(); }
}

function endGame() {
    playerCards = [];
    playerCtn.innerHTML = '';
    aiCtn.innerHTML = '';
    aiCards = [];
    start();
}
// Passar ifs para ternário