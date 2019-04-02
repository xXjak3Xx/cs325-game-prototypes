//Jake Crawford

function rollDice(numberOfDice){
	let retval = 0;
	for(let i = 0; i < numberOfDice; i++){
		retval += Math.floor(Math.random() * 6 + 1);
	}
	return retval;
}

//0 is heads 1 is tails
function flipCoin(){
	return Math.random * 2;
}

class Card{
	
	constructor(name, numbers, damage, healing){
		this.name = name;
		this.numbers = numbers;
		this.damage = damage;
		this.healing = healing;
	}
	
	setDescription(description){
		this.description = description;
	}
	
	setEffect(effect){
		this.effect = effect;
	}
	
	setFlavorText(flavorText){
		this.flavorText = flavorText;
	}
	
	attack(me, opponent){
		opponent.takeDamage(this.damage);
		me.heal(this.healing);
	}
}