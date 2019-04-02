//Jake Crawford

class Player(){
	
	constructor(name, cards, hp){
		this.name = name;
		this.cards = cards;
		this.hp = hp;
		this.preTurnEffects = [];
		this.postRollEffects = [];
	}
	
	setOpponent(opponent){
		this.opponent = opponent;
	}
	
	takeDamage(damage){
		this.hp -= damage;
		if(this.hp <= 0)
			this.die();
	}
	
	die(){
		//TODO
	}
}