class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 100, 100)
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(this.game, '游戏结束, 按 k 开始游戏')
        this.addElement(label)
        game.registerAction('k', function(){
            var s = Scene.new(game)
            s.setup()
            game.replaceScene(s)
        })
    }
}
