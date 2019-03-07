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
        // Load an image and call it 'logo'.
        this.load.image( 'police', 'assets/0.png' );
		this.load.image('textbox', 'assets/box.png');
    }
    
    
    function create() {
        player = this.physics.add.sprite(100, 400, 'police');
		player.setDisplaySize(100, 200);
		textbox = this.add.image(400, 525, 'textbox');
		textbox.setDisplaySize(850, 150);
		text = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "jake likes to sometimes eat cake yaa and smoke \nsuh \nsuh \nsuh", {fontSize: 25}).setOrigin(.5);
    }
	
	//value is array of words to output
	function textOutput(value){
		let retArray, display = "";
		if(value.length > 24)
			retArray = value.slice(24);
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
		if(cursors.select.isDown)
			textOutput("Since more code is always better, I isolated this particular example in the Bubble-sample.zip file attached".split(" "));
    }
	
	var reading = true;
	var release = true;
	var output = "";
	function input() {
		if(cursors.select.isDown && release){
			if(reading){
				
			}
		}
	}
};
