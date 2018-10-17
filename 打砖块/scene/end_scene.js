class EndScene extends GuaScene {
    constructor(game) {
        super(game)
        this.__initial(game)
    }
    draw() {
        // draw labels
        this.game.context.fillText('游戏结束, 按r返回标题画面', 10, 290)
    }
    update() {

    }
    __initial(game) {
        game.registerAction('r', function(){
            console.log('注册事件')
            var scene = new TitleScene(game)
            game.replaceScene(scene)
        })
    }
}