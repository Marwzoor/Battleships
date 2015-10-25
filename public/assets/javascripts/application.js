
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/images/game/sky.png');
    game.load.image('sky1', 'assets/images/game/sky1.png');
    game.load.image('sky2', 'assets/images/game/sky2.png');
    game.load.image('ground', 'assets/images/game/ground.png');
    game.load.image('star', 'assets/images/game/star.png');
    game.load.image('bullet', 'assets/images/game/bullet.png');
    game.load.image('ship', 'assets/images/game/ship.png', 32, 48);
}

var background1, background2;
var bulletTime = 0;
var player;
var playerOriginalPosition;
var bullets;
var cursors;
var fireButton;
var sky;

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sky = game.add.tileSprite(0, 0, 1600, 1200, 'sky1');
    sky.scale.setTo(0.5, 0.5);

    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.125, 0.125);
    playerOriginalPosition = {'x': 400, 'y': 500};
    game.physics.enable(player, Phaser.Physics.ARCADE);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('scale.x', 0.5);
    bullets.setAll('scale.y', 0.5);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
   
    sky.tilePosition.y += 10;

    player.body.velocity.setTo(0, 0);

    if (cursors.left.isDown && player.x > 0) {
        player.body.velocity.x = -200;
    } else if (cursors.right.isDown && player.x < game.width) {
        player.body.velocity.x = 200;
    }

    if(cursors.up.isDown && player.y - playerOriginalPosition.y > -200) {
        player.body.velocity.y = -200;
    } else if(cursors.down.isDown && player.y - playerOriginalPosition.y < 50) {
        player.body.velocity.y = 200;
    }

    if (fireButton.isDown) {
        fireBullet();
    }
}

function fireBullet() {
    if (game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -200;
            bulletTime = game.time.now + 200;
        }
    }
}