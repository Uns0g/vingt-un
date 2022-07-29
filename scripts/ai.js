import P from './player.js';

const ALGARISMS = ['0','1','2','3','4','5','6','7','8','9'];

export default class Ai extends P{
	surrend(){
		let totalCardsValue = this.cards.reduce((current, next) => current+next);
		
		let shouldSurrend = false;
		switch(this.amount){
			case (this.amount > 1800 || totalCardsValue > 17):
				shouldSurrend = randomlyDecide('answer if AI should surreend',-4);
				break;
			case (this.amount > 1300 || this.amount < 600):
				shouldSurrend = randomlyDecide('answer if AI should surrend', -3);
				break;
			default:
				shouldSurrend = randomlyDecide('answer if AI should surrend', -2);
				break;
		}

		return shouldSurrend;
	}
	
	tryBet(player){
		let shouldAiBet = checkCurrentSituation();
	
		if(shouldAiBet == true){
			let betValue = decideBetValue();
			
			if(betValue > player.amount){ betValue -= (betValue-player.amount);}
		
			this.bet(betValue);
		}
	}

	// Function to check the current situation of AI amount to bet 
	checkCurrentSituation(){
		let answer = false;

		if(this.amount > 1300){
			answer = this.randomlyDecide('answer if AI should bet',1);
		}
		else if(this.amount < 600){
			answer = this.randomlyDecide('answer if AI should bet',2);
		} 
		else{
			answer = this.randomlyDecide('answer if AI should bet',0);
		}

		return answer;
	}

	randomlyDecide(something, boost){
		let randomNumber = Math.floor(Math.random()*10) + boost;

		let decision;
		randomNumber > 5 ? decision = true : decision = false;
		
		console.log('The decision to '+something+' is: '+decision.toString());

		return decision;
	}

	decideBetValue(){
		let betValue;

		for(let turn = 1; turn <= 3; turn++){
			let randomIndex = Math.floor(Math.random() * 9);
			
			this.randomlyDecide('increase the value of the character on the position ' + String(turn),-turn) == true ? betValue += ALGARISMS[randomIndex+1] : betValue += ALGARISMS[randomIndex];
		}

		betValue = parseInt(betValue);

		if(betValue > this.amount){ betValue -= this.amount;}

		return betValue;
	}
}
