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
        game.load.image( 'police', 'assets/0.png' );
    }
    
    var bouncy;
    
    function create() {
        player = this.physics.add.sprite(100, 400, 'police');
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
};
