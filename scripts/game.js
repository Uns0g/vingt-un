// AUMENTAR A APOSTA É PERMITIDO APENAS 1 VEZ NA PARTIDA
import Player from './player.js';
import AI from './ai.js';

/** CONSTANTS **/
const POSSIBLE_CARD_VALUES = [1, 2, 3, 4, 5, 10];

/** VARIABLES **/
let cardsInTable = [];
let amount = [1000,1000];
let roundCounter = 0;
let playerVictories = 0;
let playerAgreed = false;

/* Instatiating players */
let player1 = new Player(dealCards(3), amount[0]);
let ai = new AI(dealCards(3), amount[1]);

MENU_BTN_EL.addEventListener('click', function(){
	this.classList.toggle('table__menu--close');
	this.firstElementChild.classList.toggle('hidden');
	this.lastElementChild.classList.toggle('hidden');
	ACTIONS_CTN_EL.classList.toggle('hidden');
});

RAISE_BET_BTN_EL.addEventListener('click', () => FORM_BACKGROUND_EL.classList.remove('hidden'));

FORM__INPUT_EL.addEventListener('input', () => {
	let currentValue = Number(TURN_BET_EL.textContent);
	let increase = Number(FORM__INPUT_EL.value);

	FORM__NEW_BET_VALUE_EL.textContent = String(currentValue+increase);
});
FORM__RETURN_BTN_EL.addEventListener('click', () => FORM_BACKGROUND_EL.classList.add('hidden'));

/** GAME FUNCTIONS **/
const sendToUser = (text, isMessage = false, isWarning = false) => {
	MESSAGE_BOX_EL.focus();

	MESSAGE_BOX_EL.value = text;

	if(isMessage){
		MESSAGE_BOX_EL.style.color = 'var(--cold)';
		MESSAGE_BOX_EL.style.fontWeight = 'normal';
		MESSAGE_BOX_EL.disabled = true;
	}
	else if(isWarning){
		MESSAGE_BOX_EL.style.color = 'var(--warm)';
		MESSAGE_BOX_EL.style.fontWeight = 'bold';
		MESSAGE_BOX_EL.disabled = true;
	} else{
		MESSAGE_BOX_EL.style.color = 'initial';
		MESSAGE_BOX_EL.style.fontWeight = 'normal';
		MESSAGE_BOX_EL.removeAttribute('disabled');
	}
}

window.onload = start();

function start(){
	roundCounter++;
	cardsInTable = dealCards(15);

	console.log(cardsInTable);

	if(roundCounter%2 == 0){
		sendToUser('AI will define the bet for this turn',true,false);
	} 
	else{
		sendToUser('You define the bet for this turn!',true,false);
		setTimeout(() =>{
			sendToUser('Type the bet: ');
			addSendButton();
		},1500);
	}
}

function addSendButton(){
	let buttonExists = document.querySelector('.info__message-send');
	if(buttonExists){ buttonExists.remove();}

	const BUTTON = document.createElement('button');
	BUTTON.className = 'info__message-send';
	BUTTON.innerHTML = `<i class="ri-share-forward-box-line"></i>`;
	document.querySelector('.info__message').appendChild(BUTTON);

	document.querySelector('.'+BUTTON.className).addEventListener('click', () =>{
		let valueToBet = MESSAGE_BOX_EL.value.split('Type the bet:');
		valueToBet = Number(valueToBet[1]);
		console.log(valueToBet);

		if(valueToBet == 0 || isNaN(valueToBet)){
			sendToUser('Type a numerical value!',false,true);

			setTimeout(() =>{
				sendToUser('Type the bet: ');
			},1000);
			addSendButton();
		}
		else{
			document.querySelector('.'+BUTTON.className).remove();
			bet(valueToBet);
		}
	});
}

function bet(betValue){
	player1.bet(betValue);
	PLAYER_AMOUNT_EL.innerText = Number(PLAYER_AMOUNT_EL.innerText) - betValue;

	let decision = ai.checkCurrentSituation();

	setTimeout(() =>{
		if(decision == true){
			sendToUser('The AI accepted your bet',true,false);

			ai.bet(betValue);
			// Change element holding AI amount
			AI_AMOUNT_EL.innerText = Number(AI_AMOUNT_EL.innerText) - betValue;
			// Change element showing the bet of the turn
			TURN_BET_EL.innerText = Number(TURN_BET_EL.innerText) + betValue*2;
		}
		else{
			sendToUser('The AI rejected your bet',false,true);

			player1.amount += betValue;
			// Change element holding player amount
			PLAYER_AMOUNT_EL.innerText = Number(PLAYER_AMOUNT_EL.innerText) + betValue;

			setTimeout(() =>{
				sendToUser('Type the bet: ');
			},800);
			addSendButton();
		}

		console.log(player1.amount, ai.amount);
	},1500)
} 

function dealCards(amount){
	let cardsArray = [];
	for(let i = 0; i < amount; i++){
		let randomPosition = Math.floor(Math.random()*POSSIBLE_CARD_VALUES.length);

		cardsArray.push(POSSIBLE_CARD_VALUES[randomPosition]);
	}

	return cardsArray;
}