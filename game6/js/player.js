//Jake Crawford

class Player {
	
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
		if(this.hp <= 0){
			this.die();
			return -1;
		}
		return 0;
	}
	
	heal(health){
		this.hp += health;
		if(this.hp >= 100)
			this.hp = 100;
	}
	
	die(){
		//TODO
		;
	}
}