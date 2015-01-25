/**
 * Representa al jugador
 * 
 * @extend Player
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var Runner = (function(_super) {
    __extends(Runner, _super);
    /**
     * Inicia al corredor
     * @param Scene scene
     */
    function Runner(scene) {
        _super.call(this);
        this.scene = scene;
        scene.load.spritesheet('runner', 'assets/runner.png', 300, 300);
        scene.load.audio('jump', ['assets/jump.mp3', 'asset/jump.ogg']);
        scene.load.audio('jumpFall', ['assets/jumpFall.mp3', 'asset/jumpFall.ogg']);
        scene.load.audio('walk1', ['assets/walk1.mp3', 'assets/walk1.ogg']);
        scene.load.audio('walk2', ['assets/walk2.mp3', 'assets/walk2.ogg']);
        scene.load.audio('walkWater1', ['assets/walkWater1.mp3', 'assets/walkWater1.ogg']);
        scene.load.audio('walkWater2', ['assets/walkWater2.mp3', 'assets/walkWater2.ogg']);
        this.velocity = 0;
        this.walkingTime = 1;
        this.inWater = 0;
    }

    /**
     * Crea el corredor
     */
    Runner.prototype.create = function() {
        this.sprite = this.scene.add.sprite(this.scene.world.width / 2 - 300, this.scene.world.height - Game.INITIAL_HEIGHT, 'runner');
        this.scene.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.setSize(65, 220, 120, 50);
        this.sprite.body.collideWorldBounds = true;

        this.addAnimations();

        // Keyboard
        this.scene.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.controls = this.scene.input.keyboard.createCursorKeys();
        this.controls.space = this.scene.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.controls.ctrl = this.scene.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

        // Audio
        this.audioJump = this.scene.add.audio('jump', 1, false);
        this.audioJumpFall = this.scene.add.audio('jumpFall', 1, false);
        this.audioWalk1 = this.scene.add.audio('walk1', 0.2, false);
        this.audioWalk2 = this.scene.add.audio('walk2', 0.2, false);
        this.audioWaterWalk1 = this.scene.add.audio('walkWater1', 1, false);
        this.audioWaterWalk2 = this.scene.add.audio('walkWater2', 1, false);

    };
    /**
     * Añade las animaciones a la escena
     */
    Runner.prototype.addAnimations = function() {
        this.sprite.animations.add('idle', [0], 10, true);
        this.sprite.animations.add('walk', [1, 2, 3, 4], 4, true);  // (key, framesarray, fps,repeat)
        this.sprite.animations.add('running', [1, 2, 3, 4], 8, true);
        this.sprite.animations.add('sprint', [1, 2, 3, 4], 12, true);
        this.sprite.animations.add('rolling', [5, 6, 7, 8], 10, true);
        this.sprite.animations.add('jump', [9], 10, true);
    };
    /**
     * Hace las actualizaciones del personaje
     * @param number velocity
     */
    Runner.prototype.update = function() {
        if (typeof Game.player !== "undefined" && typeof Game.player.resetx !== "undefined"
                && Game.player.type !== 'jugador' && Game.player.resetx !== null) {
            this.sprite.reset(Game.player.resetx, Game.player.resety);
            Game.player.resetx = null;
        }

        if (Game.player.type === 'jugador' && (this.controls.left.isDown
                || this.controls.right.isDown || this.controls.space.isDown || this.controls.ctrl.isDown)) {
            Game.socket.emit('mySight', this.controls.left.isDown, this.controls.right.isDown, this.controls.space.isDown, this.controls.ctrl.isDown, this.sprite.x, this.sprite.y);
        }
        this.scene.speed = Game.SPEED + this.velocity * 5;

        if (this.controls.ctrl.isDown) {
            this.velocity = 2;
        }
        else if ((this.controls.left.isDown && this.controls.right.isDown) ||
                (!this.controls.left.isDown && !this.controls.right.isDown)) {
            this.velocity = 0;
        }
        else if (this.controls.left.isDown) {
            this.velocity = -2;
        }
        else {
            this.velocity = 2;
        }

        if (this.onFloor() && this.jumping) {
            this.audioJumpFall.play();
            this.jumping = false;
        }

        if (this.controls.ctrl.isDown) {
            this.sprite.animations.play('rolling');
        }
        else if (!this.onFloor()) {
            this.sprite.loadTexture('runner', 9);
        }

        else if (this.controls.space.isDown) {
            if (!this.audioJump.isPlaying) {
                this.audioJump.play();
            }

            this.sprite.loadTexture('runner', 9);
            this.sprite.body.velocity.y = -1000;
            this.jumping = true;
        }

        else if (this.sprite.body.touching.down && this.velocity === 0)
            this.sprite.loadTexture('runner', 0);

        else if (this.velocity < 0 && !this.sprite.body.touching.left)
            this.sprite.animations.play('walk');

        else if (this.velocity > 0 && !this.sprite.body.touching.right)
            this.sprite.animations.play('sprint');

        else
            this.sprite.animations.play('sprint');

        if (this.onFloor() && this.scene.time.now > this.walkingTime) {
            if (this.walk !== 1) {
                if (this.inWater)
                    this.audioWaterWalk1.play();
                else
                    this.audioWalk1.play();
                this.walk = 1;
            }
            else {
                if (this.inWater)
                    this.audioWaterWalk2.play();
                else
                    this.audioWalk2.play();
                this.walk = 2;
            }

            this.walkingTime = this.scene.time.now + (-this.velocity + 3) * 100;
        }

        this.sprite.body.velocity.x = this.velocity * 100;
    };

    /**
     * Fin del juego (ha muerto)
     * @todo
     */
    Runner.prototype.gameOver = function() {
        console.log('Game Over');
    };

    /**
     * Comprueba si está en el suelo
     * @return bool
     */
    Runner.prototype.onFloor = function() {
        return this.sprite.body.touching.down || this.sprite.body.onFloor();
    };

    /**
     * Recibe datos desde el servidor
     * @param bool jump
     * @param bool rolling
     * @param int x
     * @param int y
     * @param int velocity
     */
    Runner.prototype.onReceived = function(left, right, space, ctrl, x, y) {
        this.controls = {
            left: {
                isDown: left
            },
            right: {
                isDown: right
            },
            space: {
                isDown: space
            },
            ctrl: {
                isDown: ctrl
            }
        };
        this.controls.right.isDown = true;
        this.sprite.reset(x, y);
    };

    return Runner;
})(Player);