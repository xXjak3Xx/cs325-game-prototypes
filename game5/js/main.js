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
		text = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "I Am the Video Game Police \n ", {fontSize: 25}).setOrigin(.5);
		menu = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "", {fontSize: 25, color:"RED"}).setOrigin(.5);
    }
	
	var choices = ["Accuse", "Roomate", "RA", "Neighbor"];
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
	
	function start(){
		return "You're called to Gregory Manson Unniversity to investigate a crime scene in the freshman dorm building. A student named Robert Cook was found murdered in his " +
			"dorm room late in the night, and you've been tasked with investigating and solving this horrible crime. The victim appears to have been killed by a single gunshot wound " +
			"to the chest. Additionally you find the victim's phone, but unfortunately it is passcode protected so no information can be gleaned from it. There were no signs " + 
			"of forced entry to Robert's room. Who do you wish to investigate?";
	}
	
	function ra(){
		if(friendCheck){
			choices.push("Friend");
		}
		choices.push("Girlfriend");
		let temp = "You decide that it's worth weathering the storm of overenthusiastic school spirit to see if Robert's resident advisor, Becky, knows anything that could be useful to the " +
			"investigation. You: \"Where were you on the night of Robert's murder?\" Becky: \"I was hosting a Manson Catholic Cheerleader Spirit Club meeting! Gooo Nationalists!\" " +
			"A believable alibi, RA's are always involved in a million clubs. You: \"Is there anybody that you can think of that might have a problem with Robert or want to hurt him?\" " +
			"Becky: \"Of course not! Here at Nixon Hall we're all best friends! We don't even have locks on the doors because we all trust and respect eachother so much!\" Well at " +
			"least that explains why there are no signs of forced entry. Becky: \"Actually now that you mention it there was one teeeny tiny problem involving Robert at the beginning " +
			"of the year. He was dating a girl on this floor and when they broke up I kiinda had to intervene because he wouldn't leave her alone. I'm sure she isn't involved with " +
			"any of this but I can put you in contact with her for sure!\" ";
		
		if(friendCheck){
			temp += "You: \"One more thing. I've heard that Robert had a close friend who lives on a different floor of this building. Do you happen to know who that might be?\" " +
				"Becky: \"Oh you must mean Jimmy, what a little rascal. I'll get you in contact with him too!\"";
		}
		return temp;
	}
	
	function neighbor(){
		neighborCheck = true;
		return "You go to talk to Robert's neighbor across the hall, Jessica, to see if she noticed anything the night of the murder. You: \"Where were you on the night of Robert's " +
			"murder?\" Jessica: \"I was here asleep in bed.\" You: \"Surely you must have noticed something being across the hall while it was happening. Nobody can sleep through " +
			"gunshots.\" Jessica: \"I was wearing noise cancelling ear plugs so I didn't wake up.\" You: \"Do you always ear plugs when you sleep?\" Jessica: \"I had to. " + 
			"Robert always blasts music at the top of his speakers throughout the night, so I can't get any sleep without them. One time in the beginning of the year I went " +
			"into his room while he was blasting his music to try and ask him to turn it down, but he was so piss drunk he couldn't even communicate with me. So I just turned " +
			"it off. The next morning he came over and flipped out on me and installed some kind of special phone lock. That's when I got the ear plugs.\" You: \"You don't " +
			"happen to know the passcode do you?\" Becky: \"No. That was the whole point.\"";
	}
	
	function girlfriend(){
		return "You meet with Robert's ex-girlfriend Elise. You: \"Where were you on the night of Robert's murder?\" Elise: \"I was out at the Gamma Alpha Upsilon party! " + 
			"It was a rager.\" You're not familiar with that fraternity. You: \"I heard that you dated Robert towards the beginning of this year. Can you think of any reason " +
			"why someone would want to hurt Robert?\" Elise: \"Ew no we never dated who told you that? I got really drunk at Delta Iota Kappa this one time and accidently kissed him because " +
			"I thought he was someone else. Then he wouldn't stop bugging me for like a month. Eventually it got so bad that I actually had to talk to Becky. Did you know she " +
			"has freckle implants? What a slattern.\" This was a complete waste of time.";
	}
	
	function friend(){
		if(neighborCheck){
			choices.push("Dealer");
		}
		let temp = "You finally manage to track down someone who actually knows something about Robert's life, his friend Jimmy. You \"Where were you on the night of Robert's murder?\" " +
			"Jimmy: \"What do you mean?\" You: \"What do you mean what do I mean? Where were you when Robert died?\" Jimmy: \"Robert's dead?\" You: \"He's your best friend isn't he? " +
			"How were you not aware of this\" Jimmy: \"I don't know how, what day is it?\" You: \"...Friday.\" Jimmy: \"Well that explains it I've been on bender for the last four or " +
			"five days.\" What admirable studiousness. You: \"So where were you?\" Jimmy: \"I don't know. I don't remember anything from this past week. I mighta done molly.\" You: " +
			"\"You know that I'm a police officer right?\" Jimmy: \"Ohhh so that's why you're wearing the uniform.\" What an idiot. ";
		if(neighborCheck){
			temp += "You: \"Do you by any chance know the passcode for getting into Robert's phone?\" Jimmy: \"Oh yeah it's locked with my tongue print.\" Upon inspecting the " +
				"recent messages you see what appears to be messages from a drug dealer.";	
		}
		return temp;
	}
	
	var friendCheck = false;
	//var phoneCheck = false;
	var neighborCheck = false;
	function roomate(){
		friendCheck = true;
		return "You decide that it's important to learn whatever you can from the victim's roomate, Sean. You: \"Where were you on the night of Robert's murder?\" " +
			"Sean: \"I was sleeping over at my girlfriend's house, like I do most nights. I rarely spend the nights here.\" You: \"What did Robert usually do with his spare time? " +
			"Can you think of any reason that someone may have wanted to hurt him?\" Sean: \"I'm sorry officer but I really don't know too much about him. Several people " +
			"in the dorm found him irritating, but I can't think of anyone who would want to kill him. You should talk to his friend on the other floor. They were " +
			"basically joined at the hip.\" You: \"Do you know the name of this friend of his?\" Sean: \"Sorry but no idea.\"";
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
	
	function finale(ending){
		if(ending == "Roomate"){
			return "You decide that the one who must have committed this heinous crime is Robert's roomate. Sean was taken away to prison that very day. Tears were streaming " +
				"down his face and he swore to his girlfriend that when he got out he'd finally marry her. Sean died in a riot less then a week later. That was his punishement " + 
				"for breaking the cardinal rule of bros before... girlfriends.";
		}
		else if(ending == "Neighbor"){
			return "After much consideration you realize that the most suspicious person of all was Robert's neighbor herself. Did she really think that we would believe " +
				"that someone is cabale of sleeping through gunshots being fired mere feet away from them?";
		}
		else if(ending == "RA"){
			return "Ok lets be honest here. We know that Becky the RA didn't kill Robert. Because she was hosting a club meeting there are literally dozens of people " + 
				"who can confirm her alibi. But this isn't about thinking Becky is guilty, it's just about not liking Becky. Once in prison Becky tries to create a " +
				"bunch of new clubs to help herself and her fellow inmates pass the time more quickly. She fails and they make fun of her.";
		}
		else if(ending == "Girlfriend"){
			return "\"Elise must have done it who else could it have been!\" sound no one ever. Seriously, this unlucky, if a bit wacky girl was only involved at all because " +
				"she was stalked by the victim. But I geuss that's not what the jury thought because she ends up in jail anyway. I seriouly think the jury must have mistook " +
				"Elise for someone else. At least Elise lived a long and happy life as the most respected and admired toilet hooch brewer in her entire pennitenntory.";
		}
		else if(ending == "Friend"){
			return "Jimmy really is the most likely suspect for the murder. He knew Robert's schedule so well that he could easily plan for such a perfect time. He conveniently " +
				"has no memory of the night of the murder due to having allegedly been on a bender throughout the schoolweek. But the smoking gun for Jimmy was gun smoke...residue. " +
				"During the week that he has no memory of residue tests show that Jimmy fired a gun more than once. Jimmy claims that he was probably target shooting, which is " + 
				"one of his favorite hobbies, but what kind of friend doesn't know when their friend has died. At least in prison Jimmy finally met some people just like him.";
		}
	}
    
    function update() {
		cursors = this.input.keyboard.addKeys({select: "ENTER", up: "LEFT", down: "RIGHT"});
		input();
    }
	
	var accused = false;
	var reading = true;
	var release = true;
	var str = true;
	var output = start();
	function input() {
		let temp;
		if(cursors.select.isDown){
			if(release){
				release = false;
				if(reading){
					if(str){
						output = output.split(" ");
						str = false;
					}
					
					menu.setText("");
					output = textOutput(output);
					//release = false;
					if(output == null){
						reading = false;
						str = true;
						//temp = menuChoice(true, true);
					}
				}
				else{
					if(output == null){
						temp = menuChoice(true, true);
						output = " ";
						return;
					}
					
					temp = menuChoice(false, false);
					
					if(accused){
						output = finale(temp);
						reading = true;
					}
					else if(temp == "Roomate"){
					   output = roomate();
						reading = true;
					}
					else if(temp == "RA"){
						output = ra();
						reading = true;
					}
					else if(temp == "Neighbor"){
						output = neighbor();
						reading = true;
					}
					else if(temp == "Girlfriend"){
						output = girlfriend();
						reading = true;
					}
					else if(temp == "Friend"){
						output = friend();
						reading = true;
					}
					else if(temp == "Accuse"){
						accused = true;
						choices.shift();
						reading = true;
					}
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
