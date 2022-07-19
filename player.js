export default class Player{
	constructor(cardsValues,amount){
		this.cards = cardsValues;
		this.currentBet = 0;
		this.amount = amount;
		this.rejectBetLimit = 3;
	}

	bet(value){ 
		this.currentBet = value;
		this.amount -= this.currentBet;
	}

	askForACard(availableCards){
		let lastCard = available[availableCards.lenght-1];
		this.cards.push(lastCard);

		availableCards.pop(); // removes the last card from the available cards
	}
}
