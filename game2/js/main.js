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
    }
    
    
    function create() {
        map = this.make.tilemap({key: 'map', tileWidth: 40, tileHeight: 40});
		tileset = map.addTilesetImage('tileset', 'tiles');
		level = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		level.setCollisionByProperty({collision: true});
		
		player = this.physics.add.sprite(500, 470, 'ranged');
		player.body.maxVelocity.set(300);
		
		this.physics.add.collider(player, level);
		
		
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		player.setCollideWorldBounds(true);
		
		
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
		player.setDisplaySize(40, 40);
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
        cursors = this.input.keyboard.addKeys({left:"A",right:"D",up:"W",down:"S",spawn:"OPEN_BRACKET"});
		input();
    }
	
	//Type: [0:soldier, 1:ranged, 2:theif]
	function spawnBlob(isGood, type){
		let faction = (isGood ? goodBlobs : badBlobs);
		let groupType = (isGood ? friendGroup : enemyGroup);
		let xCoord = (isGood ? 60 : 740);
		let minion;
		if(type == 0)
			minion = groupType.create(xCoord, 460, 'soldier').setDisplaySize(40, 40);
		else if(type == 1)
			minion = groupType.create(xCoord, 460, 'ranged').setDisplaySize(40, 40);
		else
			minion = groupType.create(xCoord, 460, 'theif').setDisplaySize(40, 40);
		
		let name;
		let multiplier = (isGood ? 1 : -1);
		minion.setVelocityX(faction[type][2] * multiplier);
		
		if(type == 0)
			minion.anims.play('left-sold', true);
		else if(type == 1)
			minion.anims.play('left-robo', true);
		else
			minion.anims.play('left-snek', true);
		
		if(isGood)
		{
			minion.flipX = true;
		}
		
		if(type == 0)
			name = "soldier";
		else if(type == 1)
			name = "ranged";
		else
			name = "theif";
		
		minion.setData({name: name, hp: faction[type][0], attack: faction[type][1]});
		console.log(groupType.getChildren());
	}
	
var reset = true;	
	function input() {
		if(cursors.left.isDown){
			player.setVelocityX(-40);
			player.anims.play('left-robo', true);
			player.flipX = false;
		}
		else if(cursors.right.isDown){
			player.setVelocityX(40);
			player.anims.play('left-robo', true);
			player.flipX = true;
		}
		else{
			player.setVelocityX(0);
			player.anims.play('still-robo', true);
		}
		
		if(cursors.spawn.isDown && reset){
			spawnBlob(true, 0);
			spawnBlob(false, 0);
			reset = false;
		}
		else{
			if(cursors.spawn.isUp)
				reset = true;
		}
		
	}
};
