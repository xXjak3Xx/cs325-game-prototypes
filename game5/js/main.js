window.onload = function() {
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
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
        // https://opengameart.org/content/police-2d-sprite
        this.load.image( 'police', 'assets/0.png' );
		this.load.image('textbox', 'assets/box.png');
		
		//https://opengameart.org/content/sara-2-0
    }
    
    
    function create() {
        player = this.physics.add.sprite(100, 400, 'police');
		player.setDisplaySize(100, 200);
		textbox = this.add.image(400, 525, 'textbox');
		textbox.setDisplaySize(850, 150);
		text = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "I Am the Video Game Police", {fontSize: 25}).setOrigin(.5);
    }
	
	function start(){
		return "You're called to Gregory Manson Unniversity to investigate a crime scene in the freshman dorm building. A student named Robert Cook was found murdered in his " +
			"dorm room late in the night, and you've been tasked with investigating"
	}
	
	//value is array of words to output
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
		cursors = this.input.keyboard.addKeys({select: "ENTER"});
		input();
    }
	
	var reading = true;
	var release = true;
	var str = true;
	var output = start();
	function input() {
		if(cursors.select.isDown){
			if(release){
				if(reading){
					if(str){
						output = output.split(" ");
						str = false;
					}
					
					output = textOutput(output);
					release = false;
					if(output == null){
						reading = false;
						str = true;
					}
				}
			}
		}
		else{
			release = true;
		}
	}
};
