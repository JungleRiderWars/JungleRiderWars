/**
 * Representa la escena del corredor
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var RunnerScene = (function(_super) {
    __extends(RunnerScene, _super);
    /**
     * Inicia una escena de correr
     * @param int difficulty
     */
    function RunnerScene(difficulty) {
        _super.call(this, difficulty);
        this.difficulty = difficulty;

        Game.scene = this;
        // Establece los fondos del juego
        this.background = [
            {speed: 0.05, image: 'background_back'},
            {speed: 0.07, image: 'background_mid'},
            {speed: 0.09, image: 'background_front'},
            {speed: 0.1, image: 'ground'}
        ];

        // Definicion de objetos
        this.item = [Trunk, Volcan, Water];

        // Velocidad
        this.speed = Game.SPEED;
        this.itemsInScene = [];
    }
    /**
     * Precarga de la escena
     */
    RunnerScene.prototype.preload = function() {
        this.runner = new Runner(this);

        this.load.audio('background', ['assets/background.mp3', 'assets/background.ogg']);
        this.load.audio('loop', ['assets/loop.mp3', 'assets/loop.ogg']);
        this.load.image('interface', 'assets/interface/background.png');
        
        // Carga los background
        for (var i in this.background) {
            this.load.image(this.background[i].image, 'assets/scene/' + this.background[i].image + '.png');
        }

        // Pre carga objetos
        for (var i in this.item) {
            this.load.spritesheet(this.item[i].TYPE, 'assets/item/' + this.item[i].TYPE + '.png', this.item[i].WIDTH, this.item[i].HEIGHT);
            for (var j in this.item[i].AUDIO_FILES) {
                this.load.audio(this.item[i].AUDIO_FILES[j], ['assets/item/' + this.item[i].AUDIO_FILES[j] + '.mp3', '/assets/item/' + this.item[i].AUDIO_FILES[j] + '.ogg']);
            }
        }

        // Works without focus
        this.stage.disableVisibilityChange = true;
        this.stage.disablePauseScreen = true;

        this.input.onDown.add(function() {
            Game.socket.emit('receive addObject', 'Volcan');
            /*
             if (this.time.now > Volcan.nextUse) {
             this.addItem(new Volcan(this));
             Volcan.nextUse = this.time.now + Volcan.DELAY * 1000;
             }*/
        }, this);
    };

    /**
     * Crea la escena
     */
    RunnerScene.prototype.create = function() {
        this.time.inited = this.time.now;

        // FullScreen
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.refresh();
        this.input.onDown.add(this.goFull, this);
        
        this.add.sprite(this.scale.width - 630, 50, 'interface');

        // Set limits and gravity
        this.world.setBounds(-500, 0, this.scale.width + 500, this.scale.height - Game.INITIAL_HEIGHT + 30);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 980 * Game.GRAVITY;

        // Add background
        for (var i in this.background) {
            this.background[i].sprite = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, this.background[i].image);
        }

        // Exit collider
        this.exit = this.add.sprite(-150, Game.INITIAL_HEIGHT);
        this.physics.enable(this.exit, Phaser.Physics.ARCADE);
        this.exit.body.setSize(50, this.scale.height, 0, 0);
        this.exit.body.collideWorldBounds = true;
        this.exit.body.immovable = true;

        // Runner limit
        this.limit = this.add.sprite(this.scale.width - Game.SIZE.enemy, Game.INITIAL_HEIGHT);
        this.physics.enable(this.limit, Phaser.Physics.ARCADE);
        this.limit.body.setSize(5, this.scale.height, 0, 0);
        this.limit.body.collideWorldBounds = true;
        this.limit.body.immovable = true;

        // Score
        var scoreText = "Score: " + this.score;
        var scoreStyle = { font: "65px Arial", fill: "#ff0044", align: "center" };
        this.scoreText = this.add.text(0, 0, scoreText, scoreStyle);

        this.runner.create();

        this.backgroundAudio = this.add.audio('background', 0.6, false);
        this.loopAudio = this.add.audio('loop', 0.6, true);


    };
    /**
     * Se ejecuta en cada frame  
     */
    RunnerScene.prototype.update = function() {

        if (!this.backgroundAudio.isPlaying && !this.backgroundIsPlayed) {
            this.backgroundIsPlayed = true;
            this.backgroundAudio.play();
        }

        else if (!this.backgroundAudio.isPlaying && !this.loopPlaying) {
            this.loopPlaying = true;
            this.loopAudio.play();
        }

        // Por cada elemento de la lista
        for (var i in this.itemsInScene) {
            this.itemsInScene[i].update();
        }

        this.physics.arcade.overlap(this.runner.sprite, this.exit, this.runner.gameOver, null, this.runner);
        this.physics.arcade.collide(this.runner.sprite, this.limit);

        // Mueve los fondos
        for (var i in this.background) {
            this.background[i].sprite.tilePosition.x -= this.speed * this.background[i].speed;
        }

        // Actualiza la puntuación
        this.updateScore();

        this.runner.update();

    };

    /**
     * Renderiza
     */
    RunnerScene.prototype.render = function() {

        if (Game.DEBUG) {
            this.game.debug.body(this.runner.sprite);
            this.game.debug.spriteCoords(this.runner.sprite, 32, 32);
            this.game.debug.body(this.exit);
            this.game.debug.body(this.limit);

            if (Game.player.type === 'jugador') {
                this.add.text(this.world.centerX - 800, 80, 'Player', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
            }
            else if (Game.player.type === 'enemigo') {
                this.add.text(this.world.centerX - 800, 80, 'Enemy', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
            }
            else {
                this.add.text(this.world.centerX - 800, 80, 'Observer', {
                    font: "65px Arial",
                    fill: "#ff0044",
                    align: "center"
                });
                this.runner.sprite.reset(Game.player.resetx, Game.player.resety);
            }

            for (var i in this.itemsInScene) {
                this.game.debug.body(this.itemsInScene[i].sprite);
                this.game.debug.spriteCoords(this.itemsInScene[i].sprite, 500, 32 + i * 50);
            }
        }

    };

    /**
     * Pone un obstaculo
     * @param Item item
     */
    RunnerScene.prototype.addItem = function(item) {
        item.index = this.itemsInScene.push(item) - 1;
    };

    /**
     * Se pone en pantalla completa
     */
    RunnerScene.prototype.goFull = function() {
        if (this.scale.isFullScreen) {
         this.scale.stopFullScreen();
         } else {
         this.scale.startFullScreen(false);
         }
    };

    /**
     * Actualiza la puntuacion
     */
    RunnerScene.prototype.updateScore = function() {
        this.scoreText.setText("Score: " + this.runner.score);
    };

    return RunnerScene;
})(LevelScene);
