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
		this.load.audio('boom', 'assets/boom.wav');
		this.load.spritesheet('bullet', 'assets/bullet.png', {frameWidth: 14, frameHeight: 10});
    }
    
    
    function create() {
        map = this.make.tilemap({key: 'map', tileWidth: 40, tileHeight: 40});
		tileset = map.addTilesetImage('tileset', 'tiles');
		level = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		level.setCollisionByProperty({collision: true});
		
		boom = this.sound.add('boom');
		gold_gen = 1;
		
		player1 = this.physics.add.sprite(100, 470, 'soldier');
		this.physics.add.collider(player1, level);				
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		player1.setCollideWorldBounds(true);
		player1.setData({name: "player 1", hp: 300, attack: 25, gold: 40, kills: 0, ready: true});
		player1.setDisplaySize(50, 50); 
		
		
		player2 = this.physics.add.sprite(700, 470, 'evil_soldier');
		this.physics.add.collider(player2, level);
				
		player2.setCollideWorldBounds(true);
		player2.setData({name: "player 2", hp: 300, attack: 25, gold: 40, kills: 0});
		player2.setDisplaySize(50, 50);
		
		
		good_gold = this.add.text(100, 100, player1.data.values.gold + "g \nkills: " + player1.data.values.kills + "\nHP: " + player1.data.values.hp);
		evil_gold = this.add.text(700, 100, player2.data.values.gold + "g \nkills: " + player2.data.values.kills + "\nHP: " + player2.data.values.hp);
		game_over = this.add.text(150, 240, '', { fontSize: '32px', fill: '#fff' });
		
		bg = this.physics.add.group();
		
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
		
		p1st = true;
		p2st = true;
		p1_sht = this.time.addEvent({
			delay: 2000,
			callback: reset_shot,
			args:[true],
			loop:[true],
			paused:true
		});
		
		p2_sht = this.time.addEvent({
			delay:2000,
			callback: reset_shot,
			args:[false],
			loop:[true],
			paused:true
		});
		
		timer = this.time.addEvent({
			delay: 1000,
			callback: passive_gold,
			loop:true
		});
		
		gst = true;
		bst = true;
		good_spawn_timer = this.time.addEvent({
			delay: 1000,
			callback: reset_spawn_timer,
			args:[true],
			loop:true,
			paused:true
		});
		
		bad_spawn_timer = this.time.addEvent({
			delay: 1000,
			callback: reset_spawn_timer,
			args:[false],
			loop:true,
			paused:true
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
		
	function p1_shot(){
		if(p1st){
		let bad_kids = enemyGroup.getChildren();
		bullet = bg.create(player1.body.x, 460, 'bullet');
		bullet.setVelocityX(400);
		p1_sht.paused = false;
		bullet.setGravity(0, -400);
		bullet.setData({isGood: true});
		bullet.flipX = true;
		p1st = false;
		
	}}
	
	function bupdate(){
		let bad_kids = enemyGroup.getChildren();
		let good_kids = friendGroup.getChildren();
		let bullets = bg.getChildren();
		let inc;
		
		for(let i = 0; i < bullets.length; i++){
			if(bullets[i].data.values.isGood){
				if(Math.abs(bullets[i].body.x - player2.body.x) <= 15){
					bg.remove(bullets[i], true, true);
			attack(player1, player2);
		}
		
		for(let j = 0; j < bad_kids.length; j++){
			if(Math.abs(bullets[i].body.x - bad_kids[j].body.x) <= 15){
				inc = attack(player1, bad_kids[j]);
				bg.remove(bullets[i], true, true);
				break;
			}
		}
		
		if(inc){
			increment(player1);
			player1.data.values.gold += 8;
		}
		
			}
			else{
				if(Math.abs(bullets[i].body.x - player1.body.x) <= 15){
					bg.remove(bullets[i], true, true);
			attack(player2, player1);
		}
		
		for(let j = 0; j < good_kids.length; j++){
			if(Math.abs(bullets[i].body.x - good_kids[j].body.x) <= 15){
				bg.remove(bullets[i], true, true);
				inc = attack(player2, good_kids[j]);
				break;
			}
		}
		
		if(inc){
			increment(player2);
				player2.data.values.gold += 8;
		}
			}
		}
	}
	
	function p2_shot(){
		if(p2st){
		let good_kids = friendGroup.getChildren();
		let inc;
		bullet = bg.create(player2.body.x, 460, 'bullet');
		bullet.setVelocityX(-400);
		p2_sht.paused = false;
		bullet.setGravity(0, -400);
		bullet.setData({isGood: false});
		
		
			
		p2st = false;
	}}
	
	function increment(player){
		player.data.values.kills++;
		if(player.data.values.kills % 5 == 0)
			player.data.values.attack *= 2;
		update_text();
	}
	
	function reset_shot(isGood){
		if(isGood){
			p1_shot.paused = true;
			p1st = true;
		}
		else{
			p2_shot.paused = true;
			p2st = true;
		}
	}
	
	function reset_spawn_timer(isGood){
		if(isGood){
			good_spawn_timer.paused = true;
			gst = true;
		}
		else{
			bad_spawn_timer.paused = true;
			bst = true;
		}
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
var goodBlobs = [[150, 1, 40], //soldier
				 [30, 2, 45], //ranged
				 [75, 3, 120]]; //theif
	
// hp, att, spd	
var badBlobs = [[160, 1, 40], //soldier
				 [30, 2, 45], //ranged
				 [75, 3, 120]]; //theif
	
    function update() {
        evil_cursors = this.input.keyboard.createCursorKeys();
		cursors = this.input.keyboard.addKeys({left:"A",right:"D",up:"W",down:"S",sold:"ONE",ranged:"TWO",theif:"THREE",evil_sold:"OPEN_BRACKET",evil_ranged:"CLOSED_BRACKET",evil_theif:"BACK_SLASH"});
		input();
		fight();
		bupdate();
    }
	
	
	function fight(){
		let good_kids = friendGroup.getChildren();
		let bad_kids = enemyGroup.getChildren();
		//console.log(good_kids);
		
		for(let i = 0; i < good_kids.length; i++){
			if(good_kids[i].data.values.name === "soldier" || good_kids[i].data.values.name === "theif"){
				if(Math.abs(player2.body.x - good_kids[i].body.x) <= 45){
					//console.log(bad_kids[0].data.values.name + " " + i);
					attack(good_kids[i], player2);
				}
				else if(bad_kids[0] == null){
					good_kids[i].setVelocityX(good_kids[i].data.values.speed);
					//break;
				}
				else if(Math.abs(bad_kids[0].body.x - good_kids[i].body.x) <= 45)
					attack(good_kids[i], bad_kids[0]);
				else
					good_kids[i].setVelocityX(good_kids[i].data.values.speed);
			}
			else if(good_kids[i].data.values.name === "ranged"){
				if(Math.abs(player2.body.x - good_kids[i].body.x) <= 90)
					attack(good_kids[i], player2);
				else if(bad_kids[0] == null){
					good_kids[i].setVelocityX(good_kids[i].data.values.speed);
					//break;
				}
				else if(Math.abs(bad_kids[0].body.x - good_kids[i].body.x) <= 90)
					attack(good_kids[i], bad_kids[0]);
				else
					good_kids[i].setVelocityX(good_kids[i].data.values.speed);
			}
			
			/*if(good_kids[i] != null)
				good_kids[i].setVelocityX(good_kids[i].data.values.speed);*/
		}
		
		
		for(let i = 0; i < bad_kids.length; i++){
			if(bad_kids[i].data.values.name === "evil_soldier" || bad_kids[i].data.values.name === "evil_theif"){
				if(Math.abs(player1.body.x - bad_kids[i].body.x) <= 50)
					attack(bad_kids[i], player1);
				else if(good_kids[0] == null){
					bad_kids[i].setVelocityX(bad_kids[i].data.values.speed);
					//break;
				}
				else if(Math.abs(good_kids[0].body.x - bad_kids[i].body.x) <= 45)
					attack(bad_kids[i], good_kids[0]);
				else
					bad_kids[i].setVelocityX(bad_kids[i].data.values.speed);
			}
			else if(bad_kids[i].data.values.name === "evil_ranged"){
				if(Math.abs(player1.body.x - bad_kids[i].body.x) <= 90)
					attack(bad_kids[i], player1);
				else if(good_kids[0] == null)
				{
					bad_kids[i].setVelocityX(bad_kids[i].data.values.speed);
					//break;
				}
				else if(Math.abs(good_kids[0].body.x - bad_kids[i].body.x) <= 90)
					attack(bad_kids[i], good_kids[0]);
				else
					bad_kids[i].setVelocityX(bad_kids[i].data.values.speed);
			}
			
			/*if(bad_kids[i] != null)
				bad_kids[i].setVelocityX(bad_kids[i].data.values.speed);*/
		}
	}
	
	function attack(attacker, attackee){
		//console.log('fight');
		attackee.data.values.hp -= attacker.data.values.attack;
		if(attackee.data.values.hp <= 0){
			if(attackee === player1 || attackee === player2){
				update_text();
				game_over.setText("Game over. " + attackee.data.values.name + " loses.");
				boom.play();
				attackee.destroy();
				friendGroup.destroy(true);
				enemyGroup.destroy(true);
			}
			else{
				friendGroup.remove(attackee, true, true);
				enemyGroup.remove(attackee, true, true);
				console.log('ded');
			}
			return true;
		}
		else{
			if(attackee === player1 || attackee === player2)
				update_text();
			return false;
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
			if(player1.data.values.gold < price || !gst)
				return;
			
			player1.data.values.gold -= price;
			gst = false;
			good_spawn_timer.paused = false;
		}
		else{
			if(player2.data.values.gold < price || !bst)
				return;
			
			player2.data.values.gold -= price;
			bst = false;
			bad_spawn_timer.paused = false;
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
		
		minion.setData({name: name, hp: faction[type][0], attack: faction[type][1], ready: true, speed: faction[type][2] * multiplier});
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
		
		
		if(cursors.up.isDown)
			p1_shot();
		
		if(evil_cursors.up.isDown)
			p2_shot();
		
		
		
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
