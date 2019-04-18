window.onload = function() {
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400 }
            }
        },
        scene: {
            preload: preload,
            create: create,
			update: update
        }
    };

	var game = new Phaser.Game(config);
    
    function preload() {
        // Load an image and call it 'logo'.
		this.load.image('textbox', 'assets/box.png');
    }
    
    
    function create() {
		player1 = new Player('Player 1', [new TwoTries(), new Flick(), new Slap(), new LightBeer()], 100);
		player2 = new Player('Player 2', [new TwoTries(), new Flick(), new Slap(), new LightBeer()], 100);
		turn = 1;
        
		
		textbox = this.add.image(400, 525, 'textbox');
		textbox.setDisplaySize(850, 150);
		text = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "I Am the Video Game Police \n ", {fontSize: 25}).setOrigin(.5);
		menu = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "", {fontSize: 25, color:"RED"}).setOrigin(.5);
		menuChoice(true, true);
    }
	
	var choices = [new TwoTries().name, new Flick().name, new Slap().name, new LightBeer().name];
	var choice = 0;
	
	function menuChoice(up, down){
		
		
		if(up)
			choice ++;
		if(down)
			choice --;
		
		if(choice >= choices.length)
			choice = 0;
		if(choice < 0)
			choice = choices.length - 1;
		
		let temp;
		let tempText = "";
		let tempMenu = "";
		for(let i = 0; i < choices.length; i++){
			temp = choices[i];
			
			if(choice == i){
				tempMenu += temp;
				for(let j = 0; j < temp.length; j++)
					tempText += " ";
			}
			else{
				tempText += temp;
				for(let j = 0; j < temp.length; j++)
					tempMenu += " ";
			}
			
			if(i % 2 == 0){
				tempText += "    ";
				tempMenu += "    ";
			}
			else{
				tempText += "\n";
				tempMenu += "\n";
			}
		}
		
		text.setText(tempText);
		menu.setText(tempMenu);
		if(!up && !down)
			return choices[choice];
	}
	
	function textOutput(value){
		let retArray, display = "";
		if(value.length > 24)
			retArray = value.slice(24);
		else
			retArray = null;
		
		for(let i = 0; i < value.length && i < 24; i++){
			display += value[i] + " ";
			if((i+1) % 6 == 0)
				display += "\n";
		}
		text.setText(display);
		return retArray;
	}
    
    function update() {
        //console.log(rollDice(2));
		//player1.cards.attack(player1, player2);
		//console.log(player2.hp);
		
		cursors = this.input.keyboard.addKeys({select: "ENTER", up: "LEFT", down: "RIGHT"/*, query: "Q"*/});
		input();
    }
	
	function attack(cardName){
		for(let i = 0; i < 4; i++){
			if(player1.cards[i].name == cardName){
				player1.cards[i].attack(player1, player2);
			}
			else if(player2.cards[i].name == cardName){
				player2.cards[i].attack(player2, player1);
			}
		}
	}
	
	var reading = false;
	var release = true;
	var output;
	function input(){
		if(cursors.select.isDown){
		   if(release){
			   release = false;
			   if(!reading){
				   menu.setText('');
				   let temp = menuChoice(false, false);
				   attack(temp);
			   }
		   }
		}
		else if(cursors.up.isDown){
			if(release){
				release = false;
				if(!reading){
					menuChoice(false, true);
				}
			}
		}
		else if(cursors.down.isDown){
			if(release){
				release = false;
				if(!reading){
					menuChoice(true, false);
				}
			}
		}
		else{
			release = true;
		}
	}
};
