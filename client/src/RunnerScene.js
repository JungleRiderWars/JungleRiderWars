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

        // Establece los fondos del juego
        this.background = [
            {speed: 0.1, image: 'background_back'},
            {speed: 0.3, image: 'background_mid'},
            {speed: 0.5, image: 'background_front'},
            {speed: 0.7, image: 'ground' }
        ];

        // Definicion de objetos
        this.item = ['trunk'];

        // Velocidad
        this.speed = Game.SPEED;
        this.itemsInScene = [];
    }
    /**
     * Precarga de la escena
     */
    RunnerScene.prototype.preload = function() {
        this.runner = new Runner(this);

        // Carga los background
        for (var i in this.background) {
            this.load.image(this.background[i].image, 'assets/scene/' + this.background[i].image + '.png');
        }

        // Pre carga objetos
        for (var i in this.item) {
            this.load.spritesheet(this.item[i], 'assets/item/' + this.item[i] + '.png', 50, 100);
        }

        // Works without focus
        this.stage.disableVisibilityChange = true;
        this.stage.disablePauseScreen = true;

        this.input.onUp.add(function() {
            if (this.time.now > Trunk.nextUse) {
                this.addItem(new Trunk(this));
                Trunk.nextUse = this.time.now + Trunk.DELAY * 1000;
            }
        }, this);
    };

    /**
     * Crea la escena
     */
    RunnerScene.prototype.create = function() {
        // FullScreen
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.refresh();
        this.input.onDown.add(this.goFull, this); 

        // Set limits and gravity
        this.world.setBounds(-50, 0, this.scale.width + 50, this.scale.height - 180);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 980 * Game.GRAVITY;

        // Add background
        for (var i in this.background) {
            this.background[i].sprite = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, this.background[i].image);
        }

        // Exit collider
        this.exit = this.add.sprite(-50, Game.INITIAL_HEIGHT);
        this.physics.enable(this.exit, Phaser.Physics.ARCADE);
        this.exit.body.setSize(50, this.scale.height, 0, 0);
        this.exit.body.collideWorldBounds = true;
        this.exit.body.immovable = true;

        // Runner limit
        this.limit = this.add.sprite( this.scale.width - Game.SIZE.enemy, Game.INITIAL_HEIGHT);
        this.physics.enable(this.limit, Phaser.Physics.ARCADE);
        this.limit.body.setSize(2, this.scale.height, 0, 0);
        this.limit.body.collideWorldBounds = true;
        this.limit.body.immovable = true;

        this.runner.create();
    };
    /**
     * Se ejecuta en cada frame
     */
    RunnerScene.prototype.update = function() {

        this.runner.update();

        // Por cada elemento de la lista
        for (var i in this.itemsInScene) {
            this.itemsInScene[i].update();
        }

        this.physics.arcade.collide(this.runner.sprite, this.exit, this.runner.gameOver, null, this.runner);
        this.physics.arcade.collide(this.runner.sprite, this.limit, function(){}, null, this.runner);

        // Mueve los fondos
        for (var i in this.background) {
            this.background[i].sprite.tilePosition.x -= this.speed * this.background[i].speed;
        }

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
        this.itemsInScene.push(item);
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

    return RunnerScene;
})(LevelScene);
