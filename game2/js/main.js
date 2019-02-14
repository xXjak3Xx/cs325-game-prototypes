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
		
		gold_gen = 2;
		
		player1 = this.physics.add.sprite(100, 470, 'soldier');
		this.physics.add.collider(player1, level);				
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		player1.setCollideWorldBounds(true);
		player1.setData({name: "player 1", hp: 100, attack: 25, gold: 50, kills: 0, ready: true});
		player1.setDisplaySize(50, 50); 
		
		
		player2 = this.physics.add.sprite(700, 470, 'evil_soldier');
		this.physics.add.collider(player2, level);
				
		player2.setCollideWorldBounds(true);
		player2.setData({name: "player 2", hp: 100, attack: 25, gold: 50, kills: 0});
		player2.setDisplaySize(50, 50);
		
		
		good_gold = this.add.text(100, 100, player1.data.values.gold + "g \nkills: " + player1.data.values.kills + "\nHP: " + player1.data.values.hp);
		evil_gold = this.add.text(700, 100, player2.data.values.gold + "g \nkills: " + player2.data.values.kills + "\nHP: " + player2.data.values.hp);
		game_over = this.add.text(200, 240, '', { fontSize: '32px', fill: '#fff' });
		
		
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
		
		
		timer = this.time.addEvent({
			delay: 1000,
			callback: passive_gold,
			loop:true
		});
		
		
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
	
	function passive_gold(){
		player1.data.values.gold += gold_gen;
		player2.data.values.gold += gold_gen;
		update_text();
	}
	
	function update_text(){
		good_gold.setText(player1.data.values.gold + "g \nkills: " + player1.data.values.kills + "\nHP: " + player1.data.values.hp);
		evil_gold.setText(player2.data.values.gold + "g \nkills: " + player2.data.values.kills + "\nHP: " + player2.data.values.hp);
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
		fight();
    }
	
	
	function fight(){
		let good_kids = friendGroup.getChildren();
		let bad_kids = enemyGroup.getChildren();
		console.log(friendGroup.getFirst());
		
		for(let i = 0; i < good_kids.length; i++){
			if(good_kids[i].data.values.name === "soldier" || good_kids[i].data.values.name === "theif"){
				if(Math.abs(player2.body.x - good_kids[i].body.x) <= 45)
					attack(good_kids[i], player2);
				else if(enemyGroup.getFirst() === null)
					return;
				else if(Math.abs(enemyGroup.getFirst().body.x - good_kids.body.x) <= 45)
					attack(good_kids[i], enemyGroup.getFirst());
			}
			else if(good_kids[i].data.values.name === "ranged"){
				if(Math.abs(player2.body.x - good_kids[i].body.x) <= 90)
					attack(good_kids[i], player2);
				else if(enemyGroup.getFirst() === null)
					return;
				else if(Math.abs(enemyGroup.getFirst().body.x - good_kids.body.x) <= 90)
					attack(good_kids[i], enemyGroup.getFirst());
			}
		}
		
		
		for(let i = 0; i < bad_kids.length; i++){
			if(bad_kids[i].data.values.name === "evil_soldier" || bad_kids[i].data.values.name === "evil_theif"){
				if(Math.abs(player1.body.x - bad_kids[i].body.x) <= 45)
					attack(bad_kids[i], player1);
				else if(friendGroup.getFirst() === null){
					console.log('in there');
					return;
				}
				else if(Math.abs(friendGroup.getFirst().body.x - bad_kids.body.x) <= 45)
					attack(bad_kids[i], friendGroup.getFirst());
			}
			else if(bad_kids[i].data.values.name === "ranged"){
				if(Math.abs(player1.body.x - bad_kids[i].body.x) <= 90)
					attack(bad_kids[i], player1);
				else if(friendGroup.getFirst() === null)
					return;
				else if(Math.abs(friendGroup.getFirst().body.x - bad_kids.body.x) <= 90)
					attack(bad_kids[i], friendGroup.getFirst());
			}
		}
	}
	
	function attack(attacker, attackee){
		console.log('fight');
		attackee.data.values.hp -= attacker.data.values.attack;
		if(attackee.data.values.hp <= 0){
			if(attackee === player1 || attackee === player2){
				update_text();
				game_over.setText("Game over. " + attackee.data.values.name + " loses.");
				attackee.destroy();
				friendGroup.destroy(true);
				enemyGroup.destroy(true);
			}
			else{
				friendGroup.remove(attackee, true, true);
				enemyGroup.remove(attackee, true, true);
			}
		}
		else{
			if(attackee === player1 || attackee === player2)
				update_text();
		}
	}
	
	
	function buyBlob(isGood, type){
		let price;
		if(type == 0)	
			price = 10;
		else if(type == 1)
			price = 15;
		else
			price = 20;
		
		if(isGood){
			if(player1.data.values.gold < price)
				return;
			
			player1.data.values.gold -= price;
		}
		else{
			if(player2.data.values.gold < price)
				return;
			
			player2.data.values.gold -= price;
		}
		update_text();
		spawnBlob(isGood, type);
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
		
		minion.setData({name: name, hp: faction[type][0], attack: faction[type][1], ready: true});
	}
	
var reset = true;
var reset2 = true;
	function input() {
		if(cursors.left.isDown){
			player1.setVelocityX(-80);
			player1.anims.play('left-sold', true);
			player1.flipX = false;
		}
		else if(cursors.right.isDown){
			player1.setVelocityX(80);
			player1.anims.play('left-sold', true);
			player1.flipX = true;
		}
		else{
			player1.setVelocityX(0);
			player1.anims.play('still-sold', true);
		}
		
		if(evil_cursors.left.isDown){
			player2.setVelocityX(-80);
			player2.anims.play('evil-left-sold', true);
			player2.flipX = false;
		}
		else if(evil_cursors.right.isDown){
			player2.setVelocityX(80);
			player2.anims.play('evil-left-sold', true);
			player2.flipX = true;
		}
		else{
			player2.setVelocityX(0);
			player2.anims.play('evil-still-sold', true);
		}
		
		
		
		if(cursors.sold.isDown && reset){
			buyBlob(true, 0);
			reset = false;
		}
		else if(cursors.ranged.isDown && reset){
			buyBlob(true, 1);
			reset = false;
		}
		else if(cursors.theif.isDown && reset){
			buyBlob(true, 2);
			reset = false;
		}
		else{
			if(cursors.sold.isUp && cursors.ranged.isUp && cursors.theif.isUp)
				reset = true;
		}
		
		if(cursors.evil_sold.isDown && reset2){
			buyBlob(false, 0);
			reset2 = false;
		}
		else if(cursors.evil_ranged.isDown && reset2){
			buyBlob(false, 1);
			reset2 = false;
		}
		else if(cursors.evil_theif.isDown && reset2){
			buyBlob(false, 2);
			reset2 = false;
		}
		else{
			if(cursors.evil_sold.isUp && cursors.evil_ranged.isUp && cursors.evil_theif.isUp)
				reset2 = true;
		}
		
	}
};
