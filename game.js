// AUMENTAR A APOSTA É PERMITIDO APENAS 1 VEZ NA PARTIDA
import Player from './player.js';
import AI from './ai.js';

const POSSIBLE_CARD_VALUES = [1, 2, 3, 4, 5, 10];

let cardsInTable = [];

let amount = [1000,1000];

let roundCounter = 0;
let playerVictories = 0;

let playerAgreed = false;

/* Instatiating players */
let player1 = new Player(dealCards(3), amount[0]);
let ai = new AI(dealCards(3), amount[1]);

function start(){
	roundCounter++;
	cardsInTable = dealCards(15);

	/*if(roundCounter%2 == 0){
		ai.bet(ai.decideBetValue());
	}*/
}
start();

function dealCards(amount){
	let cardsArray = [];
	for(let i = 0; i < amount; i++){
		let randomPosition = Math.floor(Math.random()*POSSIBLE_CARD_VALUES.length);

		cardsArray.push(POSSIBLE_CARD_VALUES[randomPosition]);
	}

	return cardsArray;
}