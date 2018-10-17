class TitleScene extends GuaScene {
    constructor(game) {
        super(game)
        this.__initial(game)
    }
    draw() {
        // draw labels
        this.game.context.fillText('按b开始游戏', 10, 20)
    }
    update() {

    }
    __initial(game) {
        game.registerAction('b', function(){
            var scene = Scene(game)
            game.replaceScene(scene)
        })
    }
}