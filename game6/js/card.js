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

class Card {
	
	constructor(name, numbers, damage, healing){
		this.name = name;
		this.numbers = numbers;
		this.damage = damage;
		this.healing = healing;
		this.description = null;
		this.effect = null;
		this.flavorText = null;
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

class Flick extends Card {
	constructor(){
		super('Flick', [2,3,4,5,6,7,8,9,10,11,12], 4, 0);
		this.setDescription('Flick the opponent for 4 damage.');
	}
}

class LightBeer extends Card{
	constructor(){
		super('Light Beer', [2, 4, 6, 8, 10, 12], 0, 5);
		this.setDescription('Drink a light beer to heal 5 health.');
	}
}

class Slap extends Card{
	constructor(){
		super('Slap', [3, 5, 7, 9, 11], 10, 0);
		this.setDescription('Slap the opponent for 10 damage.');
	}
}

class TwoTries extends Card{
	constructor(){
		super('Two Tries', [2,3,4,5,6,7,8,9,10,11,12], 0, 0);
		this.setDescription('Roll two dice and deal damage equal to the higher of the two dice.');
	}
	
	attack(me, opponent){
		let bigger;
		let die1 = rollDice(1);
		let die2 = rollDice(1);
		
		if(die1 > die2)
			bigger = die1;
		else
			bigger = die2;
		this.damage = bigger;
		
		opponent.takeDamage(this.damage);
		me.heal(this.healing);
	}
}