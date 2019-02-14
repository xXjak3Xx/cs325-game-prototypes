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
        this.load.image('tiles', 'assets/tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/map.json');
		
		//https://opengameart.org/content/game-character sprite sheet location
		this.load.spritesheet('soldier', 'assets/BlobCharacter/Spritesheet/character_walk.png', {frameWidth: 56, frameHeight: 59});
		this.load.spritesheet('ranged', 'assets/BlobCharacter/Spritesheet/robo_walk.png', {frameWidth: 56, frameHeight: 59});
		this.load.spritesheet('theif', 'assets/BlobCharacter/Spritesheet/ninja_walk.png', {frameWidth: 56, frameHeight: 59});
		this.load.spritesheet('evil_soldier', 'assets/BlobCharacter/Spritesheet/evil_walk.png', {frameWidth: 56, frameHeight: 59});
		this.load.spritesheet('evil_ranged', 'assets/BlobCharacter/Spritesheet/evil_robo.png', {frameWidth: 56, frameHeight: 59});
		this.load.spritesheet('evil_theif', 'assets/BlobCharacter/Spritesheet/evil_ninja.png', {frameWidth: 56, frameHeight: 59});
    }
    
    
    function create() {
        map = this.make.tilemap({key: 'map', tileWidth: 40, tileHeight: 40});
		tileset = map.addTilesetImage('tileset', 'tiles');
		level = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		level.setCollisionByProperty({collision: true});
		
		player1 = this.physics.add.sprite(500, 470, 'soldier');
		this.physics.add.collider(player1, level);				
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		player1.setCollideWorldBounds(true);
		player1.setData({name: "player 1", hp: 100, attack: 25, gold: 50});
		player1.setDisplaySize(50, 50); 
		
		
		player2 = this.physics.add.sprite(500, 470, 'evil_soldier');
		this.physics.add.collider(player2, level);
				
		player2.setCollideWorldBounds(true);
		player2.setData({name: "player 2", hp: 100, attack: 25, gold: 50});
		player2.setDisplaySize(50, 50);
		
		
		enemyGroup = this.physics.add.group();
		enemyGroup.enableBody = true;
		enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.physics.add.collider(enemyGroup, level);
		this.physics.add.collider(enemyGroup, enemyGroup);
		
		friendGroup = this.physics.add.group();
		friendGroup.enableBody = true;
		friendGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.physics.add.collider(friendGroup, level);
		this.physics.add.collider(friendGroup, friendGroup);
		this.physics.add.collider(friendGroup, enemyGroup);
		
		this.physics.add.collider(player1, enemyGroup);
		this.physics.add.collider(player2, friendGroup);
		
		
		this.anims.create({
    		key: 'left-sold',
    		frames: this.anims.generateFrameNumbers('soldier', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'still-sold',
    		frames: this.anims.generateFrameNumbers('soldier', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		
		
		this.anims.create({
    		key: 'left-robo',
    		frames: this.anims.generateFrameNumbers('ranged', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'still-robo',
    		frames: this.anims.generateFrameNumbers('ranged', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		
		
		
		this.anims.create({
    		key: 'left-snek',
    		frames: this.anims.generateFrameNumbers('theif', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'still-snek',
    		frames: this.anims.generateFrameNumbers('theif', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		
		
		this.anims.create({
    		key: 'evil-left-sold',
    		frames: this.anims.generateFrameNumbers('evil_soldier', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'evil-still-sold',
    		frames: this.anims.generateFrameNumbers('evil_soldier', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		
		
		this.anims.create({
    		key: 'evil-left-robo',
    		frames: this.anims.generateFrameNumbers('evil_ranged', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'evil-still-robo',
    		frames: this.anims.generateFrameNumbers('evil_ranged', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		
		
		this.anims.create({
    		key: 'evil-left-snek',
    		frames: this.anims.generateFrameNumbers('evil_theif', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'evil-still-snek',
    		frames: this.anims.generateFrameNumbers('evil_theif', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
    }

// hp, att, spd	
var goodBlobs = [[50, 20, 40], //soldier
				 [40, 15, 45], //ranged
				 [40, 10, 80]]; //theif
	
// hp, att, spd	
var badBlobs = [[50, 20, 40], //soldier
				 [40, 15, 45], //ranged
				 [40, 10, 80]]; //theif
	
    function update() {
        evil_cursors = this.input.keyboard.createCursorKeys();
		cursors = this.input.keyboard.addKeys({left:"A",right:"D",up:"W",down:"S",sold:"ONE",ranged:"TWO",theif:"THREE",evil_sold:"OPEN_BRACKET",evil_ranged:"CLOSED_BRACKET",evil_theif:"BACK_SLASH"});
		input();
    }
	
	//Type: [0:soldier, 1:ranged, 2:theif]
	function spawnBlob(isGood, type){
		let name;
		if(type == 0 && isGood)
			name = "soldier";
		else if(type == 1 && isGood)
			name = "ranged";
		else if(type == 2 && isGood)
			name = "theif";
		else if(type == 0 && !isGood)
			name = "evil_soldier";
		else if(type == 1 && !isGood)
			name = "evil_ranged";
		else if(type == 2 && !isGood)
			name = "evil_theif";
		
		
		let faction = (isGood ? goodBlobs : badBlobs);
		let groupType = (isGood ? friendGroup : enemyGroup);
		let xCoord = (isGood ? 60 : 740);
		let minion;
		minion = groupType.create(xCoord, 460, name).setDisplaySize(40, 40);
		
		
		let multiplier = (isGood ? 1 : -1);
		minion.setVelocityX(faction[type][2] * multiplier);
		
		if(type == 0 && isGood)
			minion.anims.play('left-sold', true);
		else if(type == 1 && isGood)
			minion.anims.play('left-robo', true);
		else if(type == 2 && isGood)
			minion.anims.play('left-snek', true);
		else if(type == 0 && !isGood)
			minion.anims.play('evil-left-sold', true);
		else if(type == 1 && !isGood)
			minion.anims.play('evil-left-robo', true);
		else
			minion.anims.play('evil-left-snek', true);
		
		if(isGood)
		{
			minion.flipX = true;
		}
		
		/*if(type == 0)
			name = "soldier";
		else if(type == 1)
			name = "ranged";
		else
			name = "theif";*/
		
		minion.setData({name: name, hp: faction[type][0], attack: faction[type][1]});
		console.log(groupType.getChildren());
	}
	
var reset = true;
var reset2 = true;
	function input() {
		if(cursors.left.isDown){
			player1.setVelocityX(-40);
			player1.anims.play('left-sold', true);
			player1.flipX = false;
		}
		else if(cursors.right.isDown){
			player1.setVelocityX(40);
			player1.anims.play('left-sold', true);
			player1.flipX = true;
		}
		else{
			player1.setVelocityX(0);
			player1.anims.play('still-sold', true);
		}
		
		if(evil_cursors.left.isDown){
			player2.setVelocityX(-40);
			player2.anims.play('evil-left-sold', true);
			player2.flipX = false;
		}
		else if(evil_cursors.right.isDown){
			player2.setVelocityX(40);
			player2.anims.play('evil-left-sold', true);
			player2.flipX = true;
		}
		else{
			player2.setVelocityX(0);
			player2.anims.play('evil-still-sold', true);
		}
		
		
		
		if(cursors.sold.isDown && reset){
			spawnBlob(true, 0);
			reset = false;
		}
		else if(cursors.ranged.isDown && reset){
			spawnBlob(true, 1);
			reset = false;
		}
		else if(cursors.theif.isDown && reset){
			spawnBlob(true, 2);
			reset = false;
		}
		else{
			if(cursors.sold.isUp && cursors.ranged.isUp && cursors.theif.isUp)
				reset = true;
		}
		
		if(cursors.evil_sold.isDown && reset2){
			spawnBlob(false, 0);
			reset2 = false;
		}
		else if(cursors.evil_ranged.isDown && reset2){
			spawnBlob(false, 1);
			reset2 = false;
		}
		else if(cursors.evil_theif.isDown && reset2){
			spawnBlob(false, 2);
			reset2 = false;
		}
		else{
			if(cursors.evil_sold.isUp && cursors.evil_ranged.isUp && cursors.evil_theif.isUp)
				reset2 = true;
		}
		
	}
};
