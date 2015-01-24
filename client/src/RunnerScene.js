/**
 * Representa la escena del corredor
 * 
 * @extend Scene
 * @author Pedro <pedro.gamez@talitasia.com>
 */
var RunnerScene = (function (_super) {
    __extends(RunnerScene, _super);
    function RunnerScene(difficulty) {
        _super.call(this, difficulty);
        this.difficulty = difficulty;
    }
    /**
     * Precarga de las escena
     */
    RunnerScene.prototype.preload = function () {
        this.load.image('logo', 'phaser.png');
    };
    RunnerScene.prototype.create = function () {
        var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    RunnerScene.prototype.update = function () {
    };
    RunnerScene.prototype.render = function () {
    };
    return RunnerScene;
})(LevelScene);
