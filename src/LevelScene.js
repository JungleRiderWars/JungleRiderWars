/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Representa un nivel 
 * 
 * @extend Scene
 * @property int difficulty
 */
var LevelScene = (function (_super) {
    __extends(LevelScene, _super);
    function LevelScene(difficulty) {
        _super.call(this);
        this.difficulty = difficulty;
    }
    LevelScene.prototype.preload = function () {
    };
    LevelScene.prototype.create = function () {
    };
    LevelScene.prototype.update = function () {
    };
    LevelScene.prototype.render = function () {
    };
    return LevelScene;
})(Scene);
